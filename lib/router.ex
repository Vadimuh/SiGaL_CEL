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

  EEx.function_from_file(:defp, :application_html, "lib/web/application.html.eex", [])



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

  #registration for users
  post "/register" do
    nickname = conn.body_params["nickname"]
    IO.puts "User wants to register Nickname: #{nickname}"

    # UUID in the future
    user_id = :rand.uniform(1000000)
    map = %{"user_id" => user_id}
    entry = %Lobbies.Users{id: user_id, nickname: nickname}

    Lobbies.Repo.insert!(entry)

    conn
    |> put_resp_content_type("application/json")
    |> send_resp(201, Poison.encode!(map))

  end

  #creating the lobby
  post "/create_lobby" do
    user_id = conn.body_params["user_id"]
    lobbyname = conn.body_params["lobbyname"]
    lobbydesc = conn.body_params["lobbydesc"]
    gamecode = conn.body_params["gamecode"]
    gamerules = conn.body_params["gamerules"]

    user = Lobbies.Repo.get Lobbies.Users, user_id
    nickname = user.nickname

    lobby_id = :rand.uniform(1000000)
    map = %{"lobby_id" => lobby_id}
    entry = %Lobbies.Room{id: lobby_id, host_nickname: nickname, host_id: user_id,
                          lobbyname: lobbyname, lobbydesc: lobbydesc,
                          gamecode: gamecode, gamerules: gamerules,
                          user_ids: [user_id], chatHistory: []}

    Lobbies.Repo.insert!(entry)


    conn
    |> put_resp_content_type("application/json")
    |> send_resp(201, Poison.encode!(map))

  end

  #Returns the data from Lobbies.Room
  #Called in p_lobbies.js
  get "/lobby_list" do

    # map = Lobbies.Repo.all Lobbies.Room
    # map = Lobbies.Repo.all (from r in Lobbies.Room, select: :lobbyname)

    # [] creates a list
    # map = Lobbies.Repo.all(from r in Lobbies.Room,
    #   select: [r.lobbyname, r.lobbydesc])


    map = Lobbies.Repo.all(from r in Lobbies.Room,
      select: %{"host_nickname" => r.host_nickname,
                "lobbyname" => r.lobbyname,
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


  match _ do
    send_resp(conn, 404, "404 Error, Not Found!")
  end
end
