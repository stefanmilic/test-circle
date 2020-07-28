const crypto = require('crypto');
const fetch = require('node-fetch');

// The endpoint to Detectify's API, no trailing slash
const DetectifyEndpoint = 'https://api.detectify.com/rest';

// Generate the headers to use for API calls. If `secretKey` is not null, its value will be used to create
// the signature headers. `body` should be omitted unless the call requires a JSON payload.
function makeHeaders({ apiKey, secretKey, method, path, timestamp, body }) {
  let headers = { 'X-Detectify-Key': apiKey };

  // Add signature headers if secret key is used
  if (secretKey !== null) {
    const signature = signatureHeaders(apiKey, secretKey, method, path, timestamp, body);
    headers = { ...headers, ...signature };
  }

  return headers;
}

// Generates the signature headers used together with the secret key.
function signatureHeaders(apiKey, secretKey, method, path, timestamp, body) {
  method = method.toUpperCase();

  if (body === null) {
    body = '';
  }

  const data = `${method};${path};${apiKey};${timestamp};${body}`;
  const secret = Buffer.from(secretKey, 'base64');

  const hmac = crypto.createHmac('sha256', secret);
  hmac.update(data);
  const signature = hmac.digest('base64');

  return {
    'X-Detectify-Signature': signature,
    'X-Detectify-Timestamp': timestamp
  };
}

// Keys
const apiKey = process.env.DETECTIFY_API_KEY;
const secretKey = process.env.DETECTIFY_SECRET_KEY;

const getTestFindings = async (path) => {
  const url = `${DetectifyEndpoint}${path}`;
  const timestamp = Math.floor(new Date() / 1000);

  // Create headers for the API call
  const headers = makeHeaders({
    apiKey,
    secretKey,
    method: 'GET',
    path,
    timestamp,
    body: null
  });

  // Perform the call
  const res = await fetch(url, {
    method: 'GET',
    headers
  });
  return res.json();
};

module.exports = {
  makeHeaders,
  signatureHeaders,
  getTestFindings
};
