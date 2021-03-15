defmodule Lobbies.Users do
  use Ecto.Schema
  # import Ecto.Changeset

  schema "users" do
    # field :id, :integer, unique: true
    field :secret, :integer, unique: true
    field :nickname, :string, unique: true
    timestamps()
  end





end
