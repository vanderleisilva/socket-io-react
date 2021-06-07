# Socket-io-react

> A small proof of concept to demonstrate the viability of an colaborative application, in which users could sync data betweend different apps.

### steps to run

Inside backend-express directory:

```
npm install
node index.js
```

Inside frontend directory:

```
yarn
yarn start;
```

### Key points

Websocket communication speeds up (once the two connection is stabilshed) the communication between server and client. You can simulate that by throttling the internet connection (in chrome for instance).

socket.io provides [buffered events](https://socket.io/docs/v4/client-offline-behavior/) for offline support. You can simulate that by disabling the internet connection (in chrome for instance), and then after some interactions enable again and see that the server is going to receive all buffered events.