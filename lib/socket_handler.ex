defmodule SiteEx.SocketHandler do
  @behaviour :cowboy_websocket

  def init(request, _state) do
    state = %{registry_key: request.path, rand_id: :rand.uniform(1000)}
    IO.puts "New Websocket Process #{state[:rand_id]}"

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

    Registry.SiteEx
    |> Registry.dispatch(state.registry_key, fn(entries) ->
      for {pid, _} <- entries do
        if pid != self() do
          Process.send(pid, message, [])
        end
      end
    end)

    {:reply, {:text, message}, state}
  end

  def websocket_info(info, state) do
    IO.puts state[:rand_id]
    {:reply, {:text, info}, state}
  end
end
