'use strict';

var gulp = require('gulp'),
    fs = require('fs'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    minifyCss = require('gulp-minify-css'),
    less = require('gulp-less'),
    merge = require('merge-stream'),
    livereload = require('gulp-livereload');

// 저장된 위치 배포될 위치
var Dir =  {
    src: './assets',
    dist: './dist',
    bower: './bower_components'
};

// 작업경로 설정
var Paths = {
    js: Dir.src + '/js/*.js',
    polyfill: Dir.src + '/polyfills/*.js',
    less: Dir.src + '/less/*.less',
};

//polyfill
gulp.task('combine-polyfills', function() {
    return gulp.src([
        Dir.bower + '/jquery/dist/jquery.min.js',
        Paths.polyfill
    ])
        .pipe(uglify({mangle: false}))
        .pipe(concat('polyfills.min.js'))
        .pipe(gulp.dest( Dir.dist ));
});


// minifyJS
gulp.task('combine-js', function() {
    return gulp.src([
        Dir.bower + '/jquery/dist/jquery.min.js',
        Dir.bower + '/bootstrap/dist/js/bootstrap.min.js',
        Dir.bower + '/es5-shim/es5-shim.min.js',
        Paths.js
    ])
        .pipe(uglify({mangle: false}))
        .pipe(concat('result.min.js'))
        .pipe(gulp.dest( Dir.dist ));
});

// css
gulp.task('combine-css', function () {
    var lessStream = gulp.src(Paths.less)
        .pipe(less())
        .pipe(concat('less-compiled.css'));

    var cssFiles = [
        Dir.bower + '/bootstrap/dist/css/bootstrap.min.css',
        Dir.bower + '/components-font-awesome/css/font-awesome.min.css',
    ];
    var cssStream = gulp.src(cssFiles)
        .pipe(concat('css-combined.css'));
    return merge(lessStream, cssStream)
        .pipe(minifyCss({compatibility: 'ie8'}))
        .pipe(concat('result.min.css'))
        .pipe(gulp.dest(Dir.dist));
});

gulp.task('watch', function () {
    livereload.listen();
    gulp.watch(Paths.js, ['combine-js']);
    gulp.watch(Paths.less, ['combine-css']);
    gulp.watch(Dir.dist + '/**').on('change', livereload.changed);
});


gulp.task('default', ['combine-css', 'combine-js', 'combine-polyfills', 'watch']);

