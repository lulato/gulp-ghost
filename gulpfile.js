var gulp = require('gulp');

var sass = require('gulp-sass');
var neat = require('node-neat').includePaths;

var browserSync = require('browser-sync'); // Reloads the browser when I save.
var reload = browserSync.reload;


// let

// this compiles sass bourbon and neat files
gulp.task('styles', function () {
    // var bower = require('main-bower-files');
    
    return gulp.src('styles/**/*.scss')
        .pipe(sass({
            includePaths: ['styles'].concat(neat)
        }))
        .pipe(gulp.dest('content/themes/thenicesw/assets/css'))
        .pipe(reload({stream:true}));
});


gulp.task('scripts', function() {
  return gulp.src('scripts/index.js')
  .pipe(gulp.dest('content/themes/thenicesw/assets/js'));
});

// watches 
gulp.task("watch", function(){
    // gulp.watch('./App/**/*.js', ['scripts']);
    gulp.watch('styles/**/*.scss', ['styles']);
});

// let's build with browserSync

gulp.task('browser-sync', function() {
    browserSync({
        proxy: "localhost:2368"
    });
});

// this loads the ghost server
gulp.task('ghost', ['styles', 'scripts','browser-sync','watch'], function() {  
    var ghost = require('ghost');
    process.env.NODE_ENV = 'development';
    ghost({ config: __dirname + '/ghost-config.js' }).then(function (ghostServer) {
        ghostServer.start();
    });
});



gulp.task('default', ['ghost']);

