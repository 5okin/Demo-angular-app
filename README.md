# Angular app.

A angular app build with bootstrap and parse server using MongoDB as a backend.
[Video (gif) demo](https://i.imgur.com/K61qZLz.gif)

<p align="center">
<img src="https://i.imgur.com/K61qZLz.gif"/>
</p>


## Features
The app can do the following:

- Create a parse server Dashboard for managing.
- Fetch data from parse server.
- Parse the data so that it can be displayed correctly.
- Query the data using a search bar.
- Responsive screen design.


## Screenshots



Big Screen             |  Tablet Screen            |  Phone Screen
:-------------------------:|:-------------------------:|:-------------------------:
![](https://i.imgur.com/zKkGgeF.png) | ![](https://i.imgur.com/JbqInP5.png) | ![](https://i.imgur.com/AJfrHcA.png)

## Setup and Running

Clone or download the repo and go to the top directory and create a .env file.

```bash
NODE_ENV=development

DATABASE_URI=mongodb+srv://...?...

APP_ID_=...
APP_ID=...
MASTER_KEY=...
PUBLIC_SERVER_URL=http://localhost:5000/parse

SERVER_URL=http://localhost:5000/parse
SERVER_PORT=5000

PHOTO_WIDTH=250
PHOTO_HEIGHT=250

APP_NAME=...
APP_USER=...
APP_PASS=...
```

Run the ```env_to_json.sh``` bash script (remember to use ```chmod +x env_to_json.sh```). This creates a environment.ts file in the app directory with the same variables. Alternatively you can create your own and move it to dir ```./app/src/environments/environment.development.ts```.

```json
export const environment =
{
  "NODE_ENV": "development",
  "DATABASE_URI": "mongodb+srv://...?...",
  "APP_ID": "...",
  "MASTER_KEY": "...",
  "SERVER_URL": "http://localhost:5000/parse"
}
```

Go to the server directory and run:

```bash
npm install
npm start
```

The server should start up at [http://localhost:5000/dashboard]

![](https://raw.githubusercontent.com/parse-community/parse-dashboard/alpha/.github/dash-shot.png)


Open another terminal and go to the app directory and run

```bash
npm install
npm install -g @angular/cli
ng serve
```

Open [http://localhost:4200](http://localhost:4200) with your browser to see the result.
