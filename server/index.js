import express from 'express';
import { ParseServer } from 'parse-server';
import ParseDashboard from 'parse-dashboard'; // Use default import
import path from 'path';
const __dirname = path.resolve();
import http from 'http';
import dotenv from 'dotenv'
import cors from 'cors';

const envFilePath = path.resolve(__dirname, '../.env');

dotenv.config({ path: envFilePath});

export const config = {
  databaseURI: process.env.DATABASE_URI || process.env.MONGODB_URI || 'mongodb://localhost:27017/dev',
  cloud: process.env.CLOUD_CODE_MAIN || __dirname + '/cloud/main.js',
  appId: process.env.APP_ID || 'myAppId',
  masterKey: process.env.MASTER_KEY || 'master', //Add your master key here. Keep it secret!
  serverURL: process.env.SERVER_URL || 'http://localhost:1337/parse', // Don't forget to change to https if needed
  liveQuery: {
    classNames: ['Posts', 'Comments'], // List of classes to support for query subscriptions
  },
};

console.log(config);

export const app = express();

app.use(cors());

// Serve static assets from the /public folder
app.use('/public', express.static(path.join(__dirname, '/public')));

// Serve the Parse API on the /parse URL prefix
if (!process.env.TESTING) {
  const mountPath = process.env.PARSE_MOUNT || '/parse';
  const server = new ParseServer(config);
  await server.start();
  app.use(cors());
  app.use(mountPath, server.app);
}

// Parse Server plays nicely with the rest of your web routes
app.get('/', function (req, res) {
  res.status(200).send('I dream of being a website.  Please star the parse-server repo on GitHub!');
});

// There will be a test page available on the /test path of your server url
// Remove this before launching your app
app.get('/test', function (req, res) {
  res.sendFile(path.join(__dirname, '/public/test.html'));
});

if (!process.env.TESTING) {
  const port = process.env.SERVER_PORT || 1337;
  const httpServer = http.createServer(app);
  httpServer.listen(port, function () {
    console.log('parse-server-example running on port ' + port + '.');
  });
  // This will enable the Live Query real-time server
  await ParseServer.createLiveQueryServer(httpServer);

  // Initialize Parse Dashboard
  const dashboard = new ParseDashboard({
    apps: [
      {
        serverURL: config.serverURL,
        appId: config.appId,
        masterKey: config.masterKey,
        appName: 'MyApp'
      }
    ],
    users: [
      {
        user: process.env.APP_USER || 'admin',
        pass: process.env.APP_PASS || 'admin'
      }
    ]
  });

  // Mount Parse Dashboard as middleware
  app.use('/dashboard', dashboard);
}
