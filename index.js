const WebSocket = require('ws');
const geoip = require('geoip-lite');

const server = new WebSocket.Server({ port: 1337 });

// Array to store connected clients
const clients = [];

server.on('listening', () => {
  console.log(`WebSocket server is listening on port ${server.options.port}`);
});

server.on('connection', (socket) => {
  // Get client's IP address and country
  const ip = socket._socket.remoteAddress;
  const country = geoip.lookup(ip)?.country;

  // Generate random name for client
  let name = `user${Math.floor(Math.random() * 1000)}`;

  console.log(`${name} connected from ${ip} (${country})`);

  // Send welcome message to client with current name
  socket.send(`Welcome, ${name}!`);

  // Store client in memory
  clients.push({ socket, name, ip, country });

  socket.on('message', (message) => {
    console.log(`${name}: ${message}`);
    broadcast(socket, `${name}: ${message}`);
  });

  socket.on('close', () => {
    console.log(`${name} disconnected`);
    broadcast(socket, `${name} has disconnected`);

    // Remove client from array
    const index = clients.findIndex((client) => client.socket === socket);
    if (index !== -1) {
      clients.splice(index, 1);
    }
  });

  // Helper function to broadcast a message to all connected clients
  function broadcast(sender, message) {
    clients.forEach((client) => {
      if (client.socket !== sender && client.socket.readyState === WebSocket.OPEN) {
        client.socket.send(message);
      }
    });
  }
});