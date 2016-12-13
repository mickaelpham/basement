var autoprefixer = require('autoprefixer');
var cssnano      = require('cssnano');
var gulp         = require('gulp');
var postcss      = require('gulp-postcss');

// Copy HTML files from src/ to build/ directory
gulp.task('html', function() {
  return gulp.src('src/*.html')
    .pipe(gulp.dest('build'));
});

// Process CSS and copy to build/ directory
gulp.task('css', function() {
  var processors = [
    autoprefixer({ browsers: ['last 2 versions', '> 5%'] }),
    cssnano()
  ];
  return gulp.src('src/**/*.css')
    .pipe(postcss(processors))
    .pipe(gulp.dest('build'));
});

// Watch for file changes and process them accordingly
gulp.task('watch', ['html', 'css'], function() {
  gulp.watch('src/*.html', ['html']);
  gulp.watch('src/**/*.css', ['css']);
});

gulp.task('default', function() {
  console.log('Hello, world!');
});
