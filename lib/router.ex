defmodule SiteEx.Router do
  use Plug.Router


  #-------Chat Function--------
  #EEx is used to evaluate our application.html.eex
  require EEx

  plug Plug.Static,
    at: "/",
    from: :site_ex

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

  get "/lobby" do
    conn
    |> put_resp_header("content-type", "text/html; charset=utf-8")
    |> send_file(200, "lib/web/lobbies.html")
  end

  #------Chat Connection------
  get "/chat" do
    send_resp(conn, 200, application_html())
  end
  #---------------------------

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
