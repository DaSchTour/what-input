var banner        = ['/**',
  ' * <%= pkg.name %> - <%= pkg.description %>',
  ' * @version v<%= pkg.version %>',
  ' * @link <%= pkg.homepage %>',
  ' * @license <%= pkg.license %>',
  ' */',
  ''].join('\n');
var browserSync   = require('browser-sync').create();
var concat        = require('gulp-concat');
var del           = require('del');
var gulp          = require('gulp');
var header        = require('gulp-header');
var notify        = require('gulp-notify');
var pkg           = require('./package.json');
var plumber       = require('gulp-plumber');
var rename        = require('gulp-rename');
var runSequence   = require('run-sequence');
var uglify        = require('gulp-uglify');
var typescript    = require('gulp-typescript');
var tsconfig      = require('./tsconfig.json');
var systemjsBuilder = require('gulp-systemjs-builder');

/*
  --------------------
  Clean task
  --------------------
*/

gulp.task('clean', function () {
  return del(['**/.DS_Store']);
});


/*
  --------------------
  Scripts tasks
  --------------------
*/

gulp.task('scripts:main', function() {
  return gulp.src(['./src/what-input.ts'])
    .pipe(typescript(tsconfig.compilerOptions))
    .pipe(gulp.dest('./src/'));
});

gulp.task('dist', ['scripts:main'], function() {
  var builder = systemjsBuilder();
  builder.buildStatic('src/what-input.js', 'what-input.js', {
    minify: false,
    mangle: false
  }).pipe(header(banner, { pkg : pkg } ))
    .pipe(gulp.dest('./dist'))
    .pipe(uglify())
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(header(banner, { pkg : pkg } ))
    .pipe(gulp.dest('./dist'))
    .pipe(notify('Build complete'));
});

gulp.task('scripts:ie8', function() {
  return gulp.src(['./src/polyfills/ie8/*.js'])
    .pipe(plumber({
      errorHandler: notify.onError("Error: <%= error.message %>")
    }))
    .pipe(concat('lte-IE8.js'))
    .pipe(uglify())
    .pipe(gulp.dest('./dist/'))
    .pipe(notify('IE8 scripts task complete'));
});

gulp.task('scripts', ['scripts:main', 'scripts:ie8']);


/*
  --------------------
  Default task
  --------------------
*/

gulp.task('default', function() {
  runSequence(
    'clean',
    [
      'scripts'
    ],
    function() {
      browserSync.init({
        server: {
          baseDir: './'
        }
      });

      gulp.watch([
        './src/what-input.js',
        './polyfills/*.js'
      ], ['scripts']).on('change', browserSync.reload);

      gulp.watch([
        './*.html',
      ]).on('change', browserSync.reload);
    }
  );
});
