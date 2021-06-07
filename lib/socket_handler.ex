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

  def websocket_init(state) do
    Registry.SiteEx
    |> Registry.register(state.registry_key, {})

    from(r in Lobbies.Room, where: r.id == ^state.registry_key,
          update: [push: [nicknames: ^state.nickname]])
    # |> Repo.update_all(push: [nicknames: state.nickname])

    query_nicknames = from r in Lobbies.Room, select: r.nicknames
    nicknames = Lobbies.Repo.get!(query_nicknames, state.registry_key)



    memo = {:userjoin, state[:nickname]}

    Registry.SiteEx
    |> Registry.dispatch(state.registry_key, fn(entries) ->
      for {pid, _} <- entries do
        if pid != self() do
          Process.send(pid, memo, [])
        end
      end
    end)

    {:ok, state}
  end

  def websocket_handle({:text, json}, state) do
    payload = Jason.decode!(json)
    message = payload["data"]["message"]
    memo = {:chat, {message, state[:nickname]}}

    Registry.SiteEx
    |> Registry.dispatch(state.registry_key, fn(entries) ->
      for {pid, _} <- entries do
        if pid != self() do
          Process.send(pid, memo, [])
        end
      end
    end)

    response = %{action: "chat_update",
                data: %{nickname: state.nickname, message: message} }

    {:reply, {:text, Poison.encode!(response)}, state}
  end

  def websocket_terminate(_reason, _req, state) do

    from(r in Lobbies.Room, where: r.id == ^state.registry_key,
    update: [pull: [nicknames: ^state.nickname]])

    {:ok, state}
  end

  def websocket_info(info, state) do
    # {action, data} = info
    # IO.puts "Websocket Info Invoked for #{state[:rand_id]} Received: \"#{action}\" \"#{data}\" "
    # {:reply, {:text, data}, state}

    case info do
      {:chat, {message, nickname}} ->
        response = %{action: "chat_update",
                    data: %{nickname: nickname, message: message} }

        {:reply, {:text, Poison.encode!(response)}, state}
      _ -> {:ok, state}
    end
  end
end
