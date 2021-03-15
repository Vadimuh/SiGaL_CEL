defmodule SiteEx.MixProject do
  use Mix.Project

  def project do
    [
      app: :site_ex,
      version: "0.1.0",
      elixir: "~> 1.11",
      start_permanent: Mix.env() == :prod,
      deps: deps()
    ]
  end

  # Run "mix help compile.app" to learn about applications.
  def application do
    [
      extra_applications: [:logger],
      mod: {SiteEx, []}
    ]
  end

  # Run "mix help deps" to learn about dependencies.
  defp deps do
    [
      # {:dep_from_hexpm, "~> 0.3.0"},
      # {:dep_from_git, git: "https://github.com/elixir-lang/my_dep.git", tag: "0.1.0"}


      #For Database usage
      {:ecto_sql, "~> 3.4"},
      {:postgrex, ">= 0.0.0"},

      #:cowboy ~ the HTTP Server
      {:cowboy, "~> 2.4"},

      #:plug and :plug_cowboy ~ the HTTP server connection adapters
      {:plug, "~> 1.7"},
      {:plug_cowboy, "~> 2.0"},

      #:jason ~ the JSON parser
      {:jason, "~> 1.1"}
    ]
  end
end
