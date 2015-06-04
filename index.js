var minimist = require('minimist')
var argv = minimist(process.argv.slice(2), {
  alias: { p: 'port', u: 'uid', g: 'gid' },
  default: { port: require('is-root')() ? 80 : 8000 }
})
var fd = alloc(argv.port)
if (argv.gid) process.setgid(argv.gid)
if (argv.uid) process.setuid(argv.uid)
var http = require('http')
// var ecstatic = require('ecstatic')(__dirname + '/static')
var body = require('body/any')
