defmodule Periodic do
  import Ecto.Query, only: [from: 2]
  use Task

  @in_seconds 10000
  def idle_timeout, do: @in_seconds

  @in_millis 10000
  def polling_time, do: @in_millis

  def start_link(_arg) do
    Task.start_link(&poll/0)
  end

  def poll() do
    receive do
    after
      Periodic.polling_time ->
        # lobby_id = String.to_integer String.trim IO.gets "Give me a lobby ID: "
        # IO.puts "#{lobby_id*2}"
        IO.puts "Doing routine clean up"

        compare_time = NaiveDateTime.utc_now()
        |> NaiveDateTime.truncate(:second)
        |> NaiveDateTime.add(Periodic.idle_timeout *(-1), :second)

        Lobbies.Repo.delete_all (from u in Lobbies.Users,
                                  where: u.lats <= ^compare_time)

        # lobby_id = String.trim IO.gets "Give me a lobby_id: "
        # memo = {:ping}
        # state = %{registry_key: lobby_id}
        # SiteEx.SocketHandler.propagate_memo(memo, state)
        poll()
    end
  end
end
