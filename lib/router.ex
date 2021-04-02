defmodule SiteEx.Router do
  import Ecto.Query, only: [from: 2]
  use Plug.Router


  #-------Chat Function--------
  #EEx is used to evaluate our application.html.eex
  require EEx

  plug Plug.Static,
    at: "/",
    from: :site_ex

  #This is the relevant piece of code which makes it so that all requests for resources with the
  #path /lib/web are served from the directory in the backend: lib/web
  plug Plug.Static,
    at: "/lib/web",
    from: "lib/web"

  plug :match
  plug Plug.Parsers,
    parsers: [:json],
    pass: ["application/json"],
    json_decoder: Jason
  plug :dispatch

  EEx.function_from_file(:defp, :application_html, "lib/application.html.eex", [])



# https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types/Common_types

  get "/" do
    conn
    |> put_resp_header("content-type", "text/html; charset=utf-8")
    |> send_file(200, "lib/web/index.html")
  end

  #reading json data and responding to json data
  put "/join_lobby" do
    # IO.inspect conn.body_params
    IO.inspect conn.body_params["id"]
    IO.inspect conn.body_params["lobby_name"]
    conn
    |> put_resp_header("content-type", "application/json; charset=utf-8")
    |> send_resp(200, "{\"result\": \"success\"}")
  end

  get "/lobby_list" do

    # map = Lobbies.Repo.all Lobbies.Room
    # map = Lobbies.Repo.all (from r in Lobbies.Room, select: :lobbyname)

    # [] creates a list
    # map = Lobbies.Repo.all(from r in Lobbies.Room,
    #   select: [r.lobbyname, r.lobbydesc])


    map = Lobbies.Repo.all(from r in Lobbies.Room,
      select: %{"lobbyname" => r.lobbyname,
                "lobbydesc" => r.lobbydesc,
                "id" => r.id})

    conn
    |> put_resp_content_type("application/json")
    |> send_resp(200, Poison.encode!(map))
  end

  get "/lobbies" do
    conn
    |> put_resp_header("content-type", "text/html; charset=utf-8")
    |> send_file(200, "lib/web/p_lobbies.html") #NOTE: this is using prototype lobbies
  end

  #------Chat Connection------
  get "/lobby" do
    send_resp(conn, 200, application_html())
  end
  #---------------------------

  # get "/hello/*glob" do
  #   send_resp(conn, 200, "route after /hello: #{inspect glob}")
  # end

  # get "/lib/web/p_lobbylist.js" do
  #   conn
  #   |> put_resp_header("content-type", "text/javascript")
  #   |> send_file(200, "lib/web/p_lobbylist.js")
  # end

  # get "/lib/web/script.js" do
  #   conn
  #   |> put_resp_header("content-type", "text/javascript")
  #   |> send_file(200, "lib/web/script.js")
  # end

  # get "/lib/web/styles.css" do
  #   conn
  #   |> put_resp_header("content-type", "text/css")
  #   |> send_file(200, "lib/web/styles.css")
  # end


  match _ do
    send_resp(conn, 404, "404 Error, Not Found!")
  end
end
