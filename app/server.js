const express = require('express');

const app = express();
const PORT = process.env.PORT || 3000;

app.disable('x-powered-by');

app.get('/', (req, res) => res.send('DevOps CI/CD Pipeline Running'));
app.get('/health', (req, res) => res.status(200).send('OK'));

// Only start listening when run directly (`node server.js`),
// so tests can import the app without opening a fixed port.
if (require.main === module) {
  const server = app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

  // Graceful shutdown so Kubernetes rollouts do not drop in-flight requests.
  const shutdown = (signal) => {
    console.log(`${signal} received, shutting down`);
    server.close(() => process.exit(0));
  };
  process.on('SIGTERM', () => shutdown('SIGTERM'));
  process.on('SIGINT', () => shutdown('SIGINT'));
}

module.exports = app;
