import Config

config :site_ex, Lobbies.Repo,
  database: "site_ex_repo",
  username: "postgres",
  password: "jeremiah1",
  hostname: "localhost"


config :site_ex, ecto_repos: [Lobbies.Repo]
