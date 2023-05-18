# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

# Experience

My experience creating this solution was a bitter-sweet one, because of the fact that I created something slightly different from the requirement.
I created a `Scrollable list` with `Sorting, Searching, CRUD(Create, Read Update and Delete) Operation` functionalities as opposed creating a Virtualized List.
As a result of time-constraint, I wasn't able to bring out the best of the Virtualized List but ended up creating a very basic implementation which I'm not satisfied with.

Since I really don't want to wasted efforts, I decided to keep the initial application `Scrollable list`. I created a toggle switch to enable the users then control both views. `Virtualized List` and `Scrollable list` which takes a little time sometimes.
Note that this wasn't what was fully required and doesn't completely meet the standard.

## What would you have done better?

-Due to the data been loaded at once `25,206 lists`, it take some time to be loaded and might affect the page performance. I'd definitely do better by ensuring the rendering process is correctly optimized and the application fully meets the stated requirement.

-Enhance the style of the list and list items, add `Sort and Search` functionalities and make sure it's 100% Bug-free.

## Challenges faced

Encountered some challenges with `React-testing-library` setup, and also the `Redux store configuration`. My biggest challenge was mistakenly working on a different implementation initially which reduced the time I had left to work on the actual implementation.
