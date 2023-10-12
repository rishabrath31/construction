const http = require('http');
const app = require('./app');
const config = require('./config/config');

const server = http.createServer(app);

// Start the server
server.listen(config.port, () => {
  console.log(`Server is running on port ${config.port}`);
});
