defmodule SiteEx.Router do
  use Plug.Router

  plug :match
  plug :dispatch

# https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types/Common_types

  get "/" do
    conn
    |> put_resp_header("content-type", "text/html; charset=utf-8")
    |> send_file(200, "lib/web/index.html")
  end

  get "/lib/web/script.js" do
    conn
    |> put_resp_header("content-type", "text/javascript")
    |> send_file(200, "lib/web/script.js")
  end

  get "/lib/web/styles.css" do
    conn
    |> put_resp_header("content-type", "text/css")
    |> send_file(200, "lib/web/styles.css")
  end

  match _, do: send_resp(conn, 404, "404 Error, Not Found!")
end
