const https = require('https');
const fs = require('fs');
const crypto = require('crypto');

const options = {
  key: fs.readFileSync('server-key.pem'),
  cert: fs.readFileSync('server-cert.pem'),
  requestCert: true,
  rejectUnauthorized: false,
};

const trustedClients = new Set();

const server = https.createServer(options, (req, res) => {
  const clientCert = req.socket.getPeerCertificate();

  if (!clientCert || !clientCert.raw) {
    res.writeHead(403);
    res.end('Client certificate required.\n');
    return;
  }

  const fingerprint = crypto
    .createHash('sha256')
    .update(clientCert.raw)
    .digest('hex');

  console.log(`Certificate hash of client: ${fingerprint}`);

  if (trustedClients.has(fingerprint)) {
    res.writeHead(200);
    res.end('Welcome back, trusted client!\n');
  } else {
    trustedClients.add(fingerprint);
    res.writeHead(200);
    res.end('Hello, new client! You are now trusted.\n');
  }
});

server.listen(3000, () => {
  console.log('Server listening on https://localhost:3000');
});
