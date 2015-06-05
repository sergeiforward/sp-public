
var gulp = require('gulp')
//var gulpFilter = require('gulp-filter')
var watch = require('gulp-watch')
var less = require('gulp-less')
var concat = require('gulp-concat')
var replace = require('gulp-replace')


var mainStarter = 'bootstrap.less'
var bootstrapLessDir = 'src/libs/bootstrap/less/'
var bootswatchDir = 'src/libs/bootswatch/'
var bootswatchThemeDir = 'paper/'

var libsDir = 'src/libs/'
var appDir = 'src/app/'


var src = {
  less: ['src/less/' + mainStarter],
  allLess: ['src/less/*.less', 'src/less/*/*.less'],
  allJs: [appDir + 'js/*.js'],
  bootstrapLessDir: ['src/libs/bootstrap/less/'],
  bootstrapTempLessDir: ['public/temp/bootstrap/less/'],
  bootstrapTempLessStarter: 'public/temp/bootstrap/less/' + mainStarter,
  bootswatchAddon: bootswatchDir + bootswatchThemeDir + 'bootswatch.less',
  vendorJs: [
  	libsDir + 'jquery/dist/jquery.js',
  	libsDir + 'modernizr/modernizr.js',
  	libsDir + 'bootstrap/dist/js/bootstrap.js',
    libsDir + 'angular/angular.js'
  ],
  appJs : [
    appDir + 'js/app.js'
  ]
}

var publishdir = 'public/';
var tempDir = publishdir + 'temp/'

var dist = {
  css: publishdir + 'static/',
  bootstrapTempLessDir: tempDir + 'bootstrap/less',
  js: publishdir + 'static/'
}

gulp.task('prepareTheme', ['createTempBootstrapDir'], function(){

	gulp.src([bootswatchDir + bootswatchThemeDir + 'variables.less', bootswatchDir + bootswatchThemeDir + 'bootswatch.less'])
	.pipe(gulp.dest(dist.bootstrapTempLessDir))
  
})

gulp.task('createTempBootstrapDir', function(){

	gulp.src([bootstrapLessDir + '**/**', '!' + bootstrapLessDir + 'variables.less'])
	.pipe(gulp.dest(dist.bootstrapTempLessDir))


});

gulp.task('buildCSS', ['prepareTheme', 'createTempBootstrapDir'], function(){

  gulp.src([src.bootstrapTempLessStarter, src.bootswatchAddon, 'src/libs/fontawesome/css/font-awesome.min.css'])
  .pipe(concat('vendor.less'))
  .pipe(less())
  .pipe(concat('vendor.css'))
  .pipe(gulp.dest(dist.css))


});

gulp.task('buildVendorJS', function(){
	gulp.src(src.vendorJs)
    .pipe(concat('vendor.js'))
    .pipe(gulp.dest(dist.js))
})

gulp.task('buildAppJS', function(){
  gulp.src(src.appJs)
    .pipe(concat('app.js'))
    .pipe(gulp.dest(dist.js))
})


gulp.task('watch', function() {

  gulp.watch(src.allLess, ['buildCSS']);
  gulp.watch(src.allJs, ['buildAppJS']);
 
})



