# SiGaL+CEL

## Purpose

Building off the ideas that originated from a [hackathon project](https://github.com/Vadim-Pelyushenko/SiGaL) (Cruzhacks 2021):

SiGaL+CEL is a website and programming language combo which coordinates to enable anyone to easily play board games with their friends, and design their own board games if they can't find a good already existing implementation.

The site crowdsources implementations of board games and has the ultimate goal of providing a very low friction experience for users who just want to play a board game with their friend.

The site is not yet completed, the best visualization we have of the site right now is this [mockup](https://projects.invisionapp.com/prototype/BoardGameSite-ckk06d9bd0029d401jodt2sns/play/097fd736) we have originating from the hackathon.

## Why a new language?

There is the immediate concern that arbitrary code execution can be dangerous, which brings us to the whole point of creating a new language. By creating a language + interpreter that supports very limited side effects, we  can completely handle this issue. The side effects are limited to
- drawing stuff in a canvas
- interpreting user input
- loading images at startup
- making HTTP requests/responses + Websocket messages between the frontend and backend.

Originally, it was intended that the first three kinds of side effects would be doable directly in the language, with the fourth done only by the interpreter. For this CEL spinoff, there is only an abstract representation of the game, it's state, and how user actions change the state of the game. Moreover it will specifically be geared towards card games(as the name Card Execution Language would suggest). The backend will simulate the game, interpret user actions, and will inform the frontend of the state of the game, plus what actions are allowed. Rendering and interpreting user input is instead handled by the frontend, which will provide a user interface for designing the layout of the game, generating a JSON representation that the frontend will make use of.

## Features

Here we will have (Implemented) in a bullet point if the feature in that bullet point is implemented.

- user can enter the site by supplying a nickname. Or have one randomly assigned to them.
- users can create lobbies, which entails
	- a lobby name,
	- a lobby description,
	- game code/configuration,
		- Either by uploading such files
		- or supplying a pastebin link.
	- and game rules, that other users would be able to read (not part of what would be executed)
- users will have some sort of on-site environment they can use to design their board games.
- users can join lobbies.
- users can chat with other users in the same lobby.
- users can do game actions, in the context of CEL, this can be...
	- Dragging and dropping cards into card zones.
	- Right clicking cards to display a dropdown list of actions they can do with a card.
- users can provide links that other users can use to join a lobby.
	- A nickname would be automatically assigned.
- users can change their nickname at any time.

## Setup Dev Environment
To be able to deploy the site locally, you'll first need to install Elixir
- one such tutorial for doing so: https://youtu.be/antnsMgA4Ro

To deploy the site locally, you'll want to use a command line to
- navigate to the Elixir project directory,
- compile the project with `mix do deps.get, compile`
- deploy with `mix run --no-halt`
- you can access the site by entering localhost:8000 as a URL into the address bar of your browser.

## How to contribute
> TODO: This section still needs additional information.

First, see: "Setup Dev Environment"

The source code for the project is found in the `lib` subdirectory of the project's directory.

We are using these technologies: 
- React Frontend
- Elixir Backend
	- with the PlugCowboy library
- Websockets
- Good ol' HTTP

Currently we need to have work done on all of the parts of the project. This includes
- The CEL specification
- The interpreter
- A model of the frontend
	- what state is managed by the Javascript,
	- how it communicates with the backend,
	- Adding this as a section to this README
- A model of the backend
	- what state is managed by the backend,
	- how it communicates with the frontend
	- Adding this as a section to this README
- The HTTP API
	- Only after a model of both the frontend and backend is made
- The Websocket API
	- Only after a model of both the frontend and backend is made
- The on-site development environment for designing board games
- The front-end rendering of the board game state
- The back-end's management of the state of users + lobbies + games.
- The back-end's interfacing with the interpreter.
- The site's home page
- The site's view of the list of lobbies
- The site's lobby creation feature
- The site's in-lobby display feature
- Chatboxes in lobbies
- Displaying other users in a lobby
- Displaying the game rules in a lobby

### Contributing to the Front End:
In the `lib` directory, we have the `web` subdirectory. This is where you'll find the HTML/CSS/JS source code. Since this site is a single-page application, you'll only find a single index.html file, along with a single styles.css file, but multiple JS source files.

### Contributing to the Back End.
Our elixir source code is directly inside of the `lib` directory. 
