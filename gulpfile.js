var gulp          = require('gulp'),
    babel         = require('gulp-babel'),
    plumber       = require('gulp-plumber'),
    rename        = require('gulp-rename'),
    uglify        = require('gulp-uglify'),
    saveLicense   = require('uglify-save-license');

function javascript() {
  return gulp.src(['src/js/**/*.js', '!src/js/**/*.min.js'])
      .pipe(plumber())
      .pipe(babel({
        presets: ['@babel/preset-env'],
        plugins: [['@babel/plugin-transform-destructuring', { 'useBuiltIns': true }]]
      }))
      .pipe(uglify({
        compress: false,
        output: {
            comments: saveLicense
        }
      }))
      .pipe(rename({ suffix: '.min' }))
      .pipe(plumber.stop())
      .pipe(gulp.dest('src/js'));
}

exports.javascript = javascript;