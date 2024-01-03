import express from 'express';
import { createServer } from 'http';
import cors from 'cors';
import { WebSocketServer } from 'ws';
import motorcycleRoutes from './routes/motorcycle.js';
import initDB from './db/init.js';
import maintenanceActivityRoutes from './routes/maintenanceActivity.js';

const app = express();

initDB();

app.use(
  cors({
    origin: ['*'],
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const connectedClients = [];

motorcycleRoutes(app, connectedClients);
maintenanceActivityRoutes(app, connectedClients);

const server = createServer(app);
const wss = new WebSocketServer({ server });

wss.on('connection', function connection(ws) {
  console.log('A new client connected!');
  connectedClients.push(ws);

  ws.on('close', function close() {
    console.log('A client disconnected!');
    const index = connectedClients.indexOf(ws);
    if (index !== -1) {
      connectedClients.splice(index, 1);
    }
  });
});

server.listen(8080, () => {
  console.log('Server started on port 8080');
});
