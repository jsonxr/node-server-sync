var spawn = require('child_process').spawn;

var node = null;
var script = null;

function serveSync(options) {
  script = options.script;
  serveSync.start();
}

serveSync.start = function() {
  if (node) {
    node.kill();
  }
  node = spawn('node', [script], {stdio: 'inherit'})
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
