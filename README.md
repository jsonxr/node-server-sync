# node-server-sync

Lightweight means for restarting a node server for a babel based workflow. Intended to be used in conjunction with gulp-watch.  Similar syntax as browser-sync. nodemon does too much when babel is used in a workflow. This literally just kills and restarts a node server when triggered by gulp.watch.

## Example

The following example gulp files assume your application has both a server and a client folder. The server is the node code, the client is the javascript browser application.

    var babel = require('gulp-babel'),
        sourcemaps = require('gulp-sourcemaps'),
        browserSync = require('browser-sync'),
        serverSync = require('server-sync');
    
    // compile for es6...
    gulp.task('js', function() {
      return gulp
        .src('src/**/*.js')
        .pipe(sourcemaps.init())
        .pipe(babel({
          plugins: [
            'transform-es2015-modules-commonjs',
            'transform-async-to-generator'
          ] 
        }))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('dist'));
    });
    
    // watch files for changes and reload
    gulp.task('serve', ['build'], function() {
      serverSync({
        script: 'dist/server'
      });

      browserSync({
        proxy: "localhost:3000",
        port: 8080
      });

      gulp.watch('**/*', {cwd: 'dist/client'}, browserSync.reload);
      gulp.watch('**/*.js', { cwd: 'dist/server' }, serveSync.reload);
      gulp.watch(PATHS.JS.SRC, ['js']);
    });
