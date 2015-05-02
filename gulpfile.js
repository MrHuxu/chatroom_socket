var gulp = require('gulp'),
    nodemon = require('gulp-nodemon');

gulp.task('develop', function () {
  nodemon({
    script: 'app.js'
  }).on('restart', function () {
    console.log('server restarted!');
  });
});
