defmodule SiteExTest do
  use ExUnit.Case
  doctest SiteEx

  test "greets the world" do
    assert SiteEx.hello() == :world
  end
end
