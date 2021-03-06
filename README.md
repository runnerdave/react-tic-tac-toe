# Tic Tac Toe

This is the implementation of the React tutorial on TicTacToe, available here:
https://facebook.github.io/react/tutorial/tutorial.html


This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).

Below you will find some information on how to perform common tasks.<br>
You can find the most recent version of this guide [here](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md).

## Table of Contents

- [Available Scripts](#available-scripts)
  - [npm start](#npm-start)
  - [npm run build](#npm-run-build)
  
## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

## TODOs:

below are extra tasks to do in order to master this tutorial:

* Display the move locations in the format "(1, 3)" instead of "6". (done)
* Bold the currently-selected item in the move list. (done)
* Rewrite Board to use two loops to make the squares instead of hardcoding them. (done)
* Add a toggle button that lets you sort the moves in either ascending or descending order. (done)
* When someone wins, highlight the three squares that caused the win. (done)

## Dockerization:

### Build the image

````
$docker build -t tic-tac-toe:0.3.0 .
````

### running the container

#### simple:
````
$docker run -p 3000:3000 -d --name react-tutorial tic-tac-toe:0.3.0
````
remove the container:
````
$docker container stop react-tutorial
$docker rm react-tutorial
````

#### interactive background (-d detached mode):
````
$docker container run -it -p 3000:3000 --rm --name react-tutorial -d tic-tac-toe:0.3.0
````
display the rolling logs for the app:
````
$docker container logs -f react-tutorial
````
stop the container:
````
$docker container stop react-tutorial
````