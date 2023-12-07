// import { WebSocketServer } from 'ws';
// import express from 'express'

// const app = express()
// // const wss = new WebSocketServer({ port: 8080 });

// const wss = new WebSocketServer({ noServer: true });


// // Handle upgrade requests to establish WebSocket connections
// app.on('upgrade', (request, socket, head) => {
//     wss.handleUpgrade(request, socket, head, (ws) => {
//         wss.emit('connection', ws, request);
//     });
// });

// console.log(app)

// // WebSocket route handlers
// // app.ws('/chat', (ws, req) => {
// //     // Handle WebSocket connection for '/chat' route
// //     ws.on('message', (message) => {
// //         console.log('Received message:', message);
// //     });

// //     ws.on('close', () => {
// //         console.log('WebSocket connection closed');
// //     });
// // });

// // app.ws('/notifications', (ws, req) => {
// //     // Handle WebSocket connection for '/notifications' route
// //     ws.on('message', (message) => {
// //         console.log('Received notification:', message);
// //     });

// //     ws.on('close', () => {
// //         console.log('WebSocket connection closed');
// //     });
// // });

// // wss.on('connection', (ws, req) => {
// //     const headers = req.headers;
// //     console.log(headers)
// //     ws.on('message', (message) => {
// //         ws.send('Hello, client!', message);
// //     });
// //     // ws.send('Hello, client!'); // Send a message to the connected client
// // });

// app.listen(8080, "192.168.25.204", () => {
//     console.log(`Server connected to http://localhost:${8080} http://${"192.168.25.204"}:${8080}`)
// })




import { WebSocketServer } from 'ws';
import express from 'express'

const app = express();
const server = app.listen(8080, () => {
    console.log('Server is running on port 8080');
});

// Create a WebSocket server
const wss = new WebSocketServer({ noServer: true });

// Handle upgrade requests to establish WebSocket connections
server.on('upgrade', (request, socket, head) => {
    const route = request?.url; // Get the route from the request URL

    if (route === '/chat') {
        wss.handleUpgrade(request, socket, head, (ws) => {
            wss.emit('connection', ws, request);
        });
    } else if (route === '/notifications') {
        wss.handleUpgrade(request, socket, head, (ws) => {
            wss.emit('connection', ws, request);
        });
    } else {
        // Handle other routes or return an error
        socket.destroy();
    }
});

// WebSocket connection handler for '/chat' route
wss.on('connection', (ws, req) => {
    const headers = req.headers;
    console.log("id", ws)
    // Handle WebSocket connection for '/chat' route
    ws.on('message', (message) => {
        // console.log('Received message:', message);
        if (Buffer.isBuffer(message)) {
            // Convert buffer to string
            const messageString = message.toString();
            const parseData = JSON.parse(messageString)
            console.log('Received message:', parseData);
        }
    });

    ws.on('close', () => {
        console.log('WebSocket connection closed');
    });
});

// WebSocket connection handler for '/notifications' route
wss.on('connection', (ws, req) => {
    // Handle WebSocket connection for '/notifications' route
    ws.on('message', (message) => {
        console.log('Received notification:', message);
    });

    ws.on('close', () => {
        console.log('WebSocket connection closed');
    });
});

wss.on('disconnect', (ws, req) => {
    console.log("ws", ws)
});


/* 
const express = require('express');
const WebSocket = require('ws');

const app = express();
const server = app.listen(3000, () => {
  console.log('Server is running on port 3000');
});

const wss = new WebSocket.Server({ noServer: true });

// Handle upgrade requests to establish WebSocket connections
server.on('upgrade', (request, socket, head) => {
  wss.handleUpgrade(request, socket, head, (ws) => {
    wss.emit('connection', ws, request);
  });
});

// WebSocket route handlers
app.ws('/chat', (ws, req) => {
  // Handle WebSocket connection for '/chat' route
  ws.on('message', (message) => {
    console.log('Received message:', message);
  });

  ws.on('close', () => {
    console.log('WebSocket connection closed');
  });
});

app.ws('/notifications', (ws, req) => {
  // Handle WebSocket connection for '/notifications' route
  ws.on('message', (message) => {
    console.log('Received notification:', message);
  });

  ws.on('close', () => {
    console.log('WebSocket connection closed');
  });
});
*/

// https://stackoverflow.com/questions/74934838/how-to-manage-users-status-online-offline-in-node-js-using-socket-io
