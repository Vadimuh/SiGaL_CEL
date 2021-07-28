defmodule Periodic do
  use Task

  def start_link(_arg) do
    Task.start_link(&poll/0)
  end

  def poll() do
    receive do
    after
      1000 ->
        # lobby_id = String.to_integer String.trim IO.gets "Give me a lobby ID: "
        # IO.puts "#{lobby_id*2}"
        lobby_id = String.trim IO.gets "Give me a lobby_id: "
        memo = {:ping}
        state = %{registry_key: lobby_id}
        SiteEx.SocketHandler.propagate_memo(memo, state)
        poll()
    end
  end
end
