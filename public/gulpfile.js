'use stric';

var gulp = require('gulp'),
    fs = require('fs'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    minifyCss = require('gulp-minify-css');

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
    css: Dir.src + '/less/*.css',
};

// minifyJS
gulp.task('minifyjs', function() {
    return gulp.src([
        Dir.bower + '/jquery/dist/jquery.min.js',
        Dir.bower + '/bootstrap/dist/js/bootsrap.min.js',
        Dir.bower + '/es5-shim/es5-shim.min.js',
        Paths.js
        ])
        .pipe(uglify({mangle: false}))
        .pipe(concat('result.min.js'))
        .pipe(gulp.dest( Dir.dist ));
});

//polyfill
gulp.task('minifyPolyfillJs', function() {
    return gulp.src([
        Dir.bower + '/jquery/dist/jquery.min.js',
        Paths.polyfill
    ])
        .pipe(uglify({mangle: false}))
        .pipe(concat('polyfills.min.js'))
        .pipe(gulp.dest( Dir.dist ));
});

// minifyCss
gulp.task('minifycss', function() {
    return gulp.src([
            Dir.bower + '/bootstrap/dist/css/bootstrap.min.css',
            Dir.bower + '/components-font-awesome/css/font-awesome.min.css',
            Paths.css
        ])
        .pipe(minifyCss({compatibility: 'ie8'}))
        .pipe(concat('result.min.css'))
        .pipe(gulp.dest(Dir.dist))
});

// 파일 변경 감지...
//gulp.task('watch', function () {
//    gulp.watch( [Dir.css, Dir.js, Dir.bower] , ['minifycss', 'minifyjs', 'minifyPolyfillJs']);
//});

// Develop build
gulp.task('default', ['minifycss','minifyjs','minifyPolyfillJs']);
//gulp.task('default', ['watch']);

