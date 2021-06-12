defmodule SiteEx.SocketHandler do
  import Ecto.Query, only: [from: 2]
  @behaviour :cowboy_websocket

  def init(request, _state) do
    path_params = String.split(request.path, "/")
    [lobby_id, user_id] = Enum.take(path_params, -2)
    user = Lobbies.Repo.get Lobbies.Users, user_id

    state = %{registry_key: lobby_id, user_id: user_id,
              nickname: user.nickname, rand_id: :rand.uniform(1000)}

    IO.puts "New Websocket Process #{state[:rand_id]}"
    IO.puts "User #{state[:user_id]} joins lobby #{request.path}"


    {:cowboy_websocket, request, state}
  end


  def propagate_memo(memo, state) do
    Registry.SiteEx
    |> Registry.dispatch(state.registry_key, fn(entries) ->
      for {pid, _} <- entries do
        if pid != self() do
          Process.send(pid, memo, [])
        end
      end
    end)
  end


  def websocket_init(state) do
    Registry.SiteEx
    |> Registry.register(state.registry_key, {})

    from(r in Lobbies.Room, where: r.id == ^state.registry_key,
          update: [push: [nicknames: ^state.nickname]])
    # |> Repo.update_all(push: [nicknames: state.nickname])

    query_nicknames = from r in Lobbies.Room, select: r.nicknames
    nicknames = Lobbies.Repo.get!(query_nicknames, state.registry_key)
    IO.puts nicknames

    memo = {:userjoin, state[:nickname]}
    propagate_memo(memo, state)

    {:ok, state}
  end


  def websocket_handle({:text, json}, state) do
    payload = Jason.decode!(json)
    action = payload["action"]
    data = payload["data"]

    case action do
      "chat" ->
        memo = {:chat, {data, state[:nickname]}}
        propagate_memo(memo, state)

        response = %{action: "chat_update",
                data: %{nickname: state.nickname, message: data} }

        {:reply, {:text, Poison.encode!(response)}, state}

      _ -> {:ok, state}
    end
  end

  def terminate(_reason, _req, state) do
    IO.puts "User #{state.nickname} has left"
    from(r in Lobbies.Room, where: r.id == ^state.registry_key,
    update: [pull: [nicknames: ^state.nickname]])
    memo = {:userleft, state[:nickname]}
    propagate_memo(memo, state)

    # {:ok, state}
    :ok
  end

  def websocket_info(info, state) do

    case info do
      {:userjoin, nickname} ->
        notify = %{action: "user_join", data: nickname}
        {:reply, {:text, Poison.encode!(notify)}, state}

      {:userleft, nickname} ->
        notify = %{action: "user_left", data: nickname}
        {:reply, {:text, Poison.encode!(notify)}, state}

      {:chat, {message, nickname}} ->
        notify = %{action: "chat_update",
                    data: %{nickname: nickname, message: message} }

        {:reply, {:text, Poison.encode!(notify)}, state}
      _ -> {:ok, state}
    end
  end
end
