defmodule Lobbies.Room do
  use Ecto.Schema

  schema "room" do
    field :lobbyname, :string
    field :lobbydesc, :string
    field :gamerules, :string
    field :gamecode, :string
    field :user_ids, {:array, :integer}
    field :chatHistory, {:array, :map}
    timestamps()
  end
end
