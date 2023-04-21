# mTLS Debugging

Simple mTLS example with NodeJS and curl.

In this example, there are no external authorities.

It follows the "Trust on First Use" principle.

## Getting Started

Run the server:

```bash
node main.js
```

Make a request with `curl`:

```bash
curl --cert client-cert.pem --key client-key.pem -k https://localhost:3000
```
