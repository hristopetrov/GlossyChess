
var elixir = require('laravel-elixir');

/*
 |--------------------------------------------------------------------------
 | Elixir Asset Management
 |--------------------------------------------------------------------------
 |
 | Elixir provides a clean, fluent API for defining some basic Gulp tasks
 | for your Laravel application. By default, we are compiling the Sass
 | file for our application, as well as publishing vendor resources.
 |
 */

elixir(function(mix) {
    mix.sass('app.scss');

var gulp = require('gulp'),
    sass = require('gulp-sass'),
    minifyCSS = require('gulp-cssnano'),
    renameFiles = require('gulp-rename'),
    autoprefixer = require('gulp-autoprefixer');

//Main Sass task
gulp.task('sass', function() {
    gulp.src('scss/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer({
            browsers: ['last 2 versions', 'Safari >= 8'],
            cascade: false
        }))
        .pipe(renameFiles({
            suffix: '.min'
        }))
        .pipe(minifyCSS())
        .pipe(gulp.dest('./css'));
});

gulp.task('default', ['sass'], function() {
    gulp.watch('scss/**/*.scss', ['sass']);

});
}