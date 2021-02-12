defmodule SiteEx do
  use Application
  require Logger

  def start(_type, _args) do
    children = [
      {Plug.Cowboy, scheme: :http, plug: SiteEx.Router, options: [port: 8000]}
    ]

    Logger.info "App Started!"

    opts = [strategy: :one_for_one, name: MyApp.Supervisor]
    Supervisor.start_link(children, opts)
  end
end
