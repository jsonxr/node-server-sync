var spawn = require('child_process').spawn;

var node = null;
var _args = [];

function serveSync(options) {
  _args.push(options.script);
  if (options.args) {
    _args = _args.concat(options.args);
  }

  serveSync.start();
}

serveSync.start = function() {
  if (node) {
    node.kill();
  }
  console.log('node ' + _args.join(' '));
  node = spawn('node', _args, { stdio: 'inherit' })
  node.on('close', function (code) {
    if (code === 8) {
      console.error('Error detected, waiting for changes...');
    }
  });
}

serveSync.reload = function() {
  console.log('Restarting node server...');
  serveSync.start();
}

module.exports = serveSync;
