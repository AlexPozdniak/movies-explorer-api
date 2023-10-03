// List of allowed CORS (Cross-Origin Resource Sharing) origins
const allowedCors = [
  'https://axexpozdniak.nomoredomainsrocks.ru',
  'http://axexpozdniak.nomoredomainsrocks.ru',
  'https://api.alexpozdniak.nomoredomainsrocks.ru/users/me',
  'https://api.alexpozdniak.nomoredomainsrocks.ru/cards',
  'https://api.alexpozdniak.nomoredomainsrocks.ru/signup',
  'http://localhost:3000',
  'http://localhost:3001',
  'http://localhost:4000',
  'https://158.160.121.97',
  'http://158.160.121.97',
];

module.exports = (req, res, next) => {
  const { origin } = req.headers; // Get the "Origin" header from the request
  const { method } = req; // Get the HTTP method of the request
  const requestHeaders = req.headers['access-control-request-headers']; // Get the request headers

  const allowed = 'GET,HEAD,PUT,PATCH,POST,DELETE'; // Define the allowed HTTP methods

  if (allowedCors.includes(origin)) {
    // If the origin is in the list of allowed origins, set the appropriate CORS headers
    res.header('Access-Control-Allow-Origin', origin); // Allow the specified origin to access this resource
    res.header('Access-Control-Allow-Credentials', true); // Allow credentials (e.g., cookies) to be sent with the request
  }

  if (method === 'OPTIONS') {
    // If the request method is OPTIONS (preflight request), set CORS headers and end the response
    res.header('Access-Control-Allow-Methods', allowed); // Specify the allowed HTTP methods
    res.header('Access-Control-Allow-Headers', requestHeaders); // Specify the allowed request headers
    return res.end(); // End the response without further processing
  }

  return next(); // Continue processing the request for non-OPTIONS requests
};
