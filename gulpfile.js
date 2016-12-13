var gulp = require('gulp');

// Copy HTML files from src/ to build/ directory
gulp.task('html', function() {
  return gulp.src('src/*.html')
    .pipe(gulp.dest('build'));
});

gulp.task('default', function() {
  console.log('Hello, world!');
});
