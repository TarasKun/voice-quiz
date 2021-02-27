# About

The quiz is written using React, noCodeApi, and Google Spreadsheet API.

## How to start

Clone the repository, and set the dependencies with the command

npm i
____

Create an .env file in the root folder of the repository. There should be the following variables inside:

REACT_APP_API_KEY
REACT_APP_DISCOVERY_DOCS
REACT_APP_SPREADSHEET_ID
REACT_APP_SCOPE
REACT_APP_CLIENT_ID
REACT_APP_CURRENT_QUESTIONS_TABLE
REACT_APP_CURRENT_ANSWERS_TABLE

### Environments

The first five variables can be obtained in the Google console. More information:

https://console.developers.google.com/

The last two variables - tabs in your table, from the first table we receive questions, in the last we write down results.

You also need to register and add access to your table on the site to work correctly.

https://app.nocodeapi.com/

### Deploy

https://voice-quiz.herokuapp.com/