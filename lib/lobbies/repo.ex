defmodule Lobbies.Repo do
  use Ecto.Repo,
    otp_app: :site_ex,
    adapter: Ecto.Adapters.Postgres
end
