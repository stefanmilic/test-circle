const { makeHeaders, signatureHeaders } = require('../services/detectifyService');

// testing keys
const apiKey = '10840b0f938942feafb7186de74b9682';
const secretKey = '0vyTnawJRFn0Q9tWLTM188Olizc72JczHSXoIlsPQIc=';

test('Checking for signature headers', () => {
  const signatureHeadersResult = {
    'X-Detectify-Signature': '6jpu6S4cQwEY4uLk+xELSe1RhajVJP0QEDpGWZ5T+U0=',
    'X-Detectify-Timestamp': 1519829567
  };
  expect(signatureHeaders(apiKey, secretKey, 'GET', '/v2/domains/', 1519829567, null)).toStrictEqual(signatureHeadersResult);
});

test('make header from signature', () => {
  const resultHeader = {
    'X-Detectify-Key': apiKey,
    'X-Detectify-Signature': '6jpu6S4cQwEY4uLk+xELSe1RhajVJP0QEDpGWZ5T+U0=',
    'X-Detectify-Timestamp': 1519829567
  };
  expect(
    makeHeaders({
      apiKey,
      secretKey,
      method: 'GET',
      path: '/v2/domains/',
      timestamp: 1519829567,
      body: null
    })
  ).toStrictEqual(resultHeader);
});
