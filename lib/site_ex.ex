defmodule SiteEx do

  #Application module is used to tell the Erlang VM that the app is
  #an application to monitor
  use Application
  require Logger

  def start(_type, _args) do
    children = [

      #Timer for user/Lobby
      Periodic,

      Lobbies.Repo,

      Plug.Cowboy.child_spec(

        #:scheme is set to :http for local development
        scheme: :http,

        #:plug is set to our Router plug that we will create
        plug: SiteEx.Router,

        #:options has :dispatch which is set to private and :port is set to 8000
        options: [
          dispatch: dispatch(),
          port: 8000
        ]
      ),
      Registry.child_spec(
        keys: :duplicate,
        name: Registry.SiteEx
      )
    ]

    Logger.info "App Started!"

    opts = [strategy: :one_for_one, name: SiteEx.Application]
    Supervisor.start_link(children, opts)
  end

  #This is pattern matching for incoming requests to the HTTP server
  #If a request ends in "/ws/[...]", then it will route to SiteEx.SocketHandler
  #module which is where we will handle web socket connections.
  defp dispatch do
    [
      {:_,
        [
          #[...] matches everything else after "/ws/"
          {"/ws/[...]", SiteEx.SocketHandler, []},

          #If the request doesn't match "/ws/[...]" it will reroute to this router
          {:_, Plug.Cowboy.Handler, {SiteEx.Router, []}}
        ]
      }
    ]
  end
end
