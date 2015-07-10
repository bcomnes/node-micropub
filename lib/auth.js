var formBody = require('body/form')
var parseAuthHeader = require('auth-header').parse

function getAuthToken (req, cb) {
  var headers = req.headers
  var authHeader

  if (headers.Authorization) {
    authHeader = parseAuthHeader(headers.Authorization)
    // Prevent calling the cb syncronosly with process.nextTick
    return process.nextTick(cb(null, authHeader))

  } else if (isUrlEncoded(headers)) {
    formBody(req, function (err, body) {
      // Parsing Error
      if (err) return cb(err)
      // Return the token if the form is valid
      if (isValidForm) return cb(null, body.access_token)
      // Otherwise we didn't get a token
      else return cb(new Error('Missing Auth Header or access_token field'))
    })
  }
}

function isUrlEncoded (headers) {
  return headers['Content-Type'] === 'application/x-www-form-urlencoded'
}

function isValidForm (body) {
  // Stuff
}

function get
