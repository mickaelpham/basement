var autoprefixer = require('autoprefixer');
var browserSync  = require('browser-sync').create();
var changed      = require('gulp-changed');
var cssnano      = require('cssnano');
var gulp         = require('gulp');
var precss       = require('precss');
var postcss      = require('gulp-postcss');

// Copy HTML files from src/ to build/ directory
gulp.task('html', function() {
  return gulp.src('src/*.html')
    .pipe(changed('build', { extension: '.html' }))
    .pipe(gulp.dest('build'))
    .pipe(browserSync.stream());;
});

// Process CSS and copy to build/ directory
gulp.task('css', function() {
  var processors = [
    precss(),
    autoprefixer({ browsers: ['last 2 versions', '> 5%'] }),
    cssnano()
  ];
  return gulp.src('src/**/*.css')
    .pipe(postcss(processors))
    .pipe(gulp.dest('build'))
    .pipe(browserSync.stream());
});

// Watch for file changes and process them accordingly
gulp.task('watch', ['html', 'css'], function() {
  gulp.watch('src/*.html', ['html']);
  gulp.watch('src/**/*.css', ['css']);
});

// Serve the build/ directory with Browsersync and watch them
gulp.task('serve', ['watch'], function() {
  browserSync.init({
    server: {
      baseDir: 'build'
    },
    notify: false
  });

  // gulp.watch('build/*.html').on('change', browserSync.reload)
});

gulp.task('default', function() {
  console.log('Hello, world!');
});
