defmodule SiteEx.SocketHandler do
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

    {:reply, {:text, message}, state}
  end

  def websocket_info(info, state) do
    # {action, data} = info
    # IO.puts "Websocket Info Invoked for #{state[:rand_id]} Received: \"#{action}\" \"#{data}\" "
    # {:reply, {:text, data}, state}

    case info do
      {:chat, {message, nickname}} -> {:reply, {:text, "#{nickname}: #{message}"}, state}
      _ -> {:ok, state}
    end
  end
end
