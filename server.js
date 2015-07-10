var alloc = require('tcp-bind')
var minimist = require('minimist')
var ecstatic = require('ecstatic')(__dirname + '/static')
var argv = minimist(process.argv.slice(2), {
  alias: { p: 'port', u: 'uid', g: 'gid' },
  default: { port: require('is-root')() ? 80 : 8000 }
})
var fd = alloc(argv.port)
if (argv.gid) process.setgid(argv.gid)
if (argv.uid) process.setuid(argv.uid)

var http = require('http')
var body = require('body/any')
var encode = require('he').encode
var router = require('routes')()

var server = http.createServer(function (req, res) {
  console.log(req.headers)
  var m = router.match(req.url)
  if (m) m.fn(req, res, m.params)
  else ecstatic(req, res)
})

server.listen({ fd: fd }, function () {
  console.log('listening on :' + server.address().port)
})
