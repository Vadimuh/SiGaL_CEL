defmodule Lobbies.Users do
  use Ecto.Schema
  import Ecto.Changeset

  schema "users" do
    # field :id, :integer, unique: true
    field :secret, :integer, unique: true
    field :nickname, :string, unique: true
    field :lats, :naive_datetime, unique: true
    timestamps()
  end

  def changeset(user, params) do
    user
    |> cast(params, [:lats])
  end

end
