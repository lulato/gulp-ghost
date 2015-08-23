var gulp = require('gulp');

var sass = require('gulp-sass');
var neat = require('node-neat').includePaths;

var browserSync = require('browser-sync'); // Reloads the browser when I save.
var reload = browserSync.reload;


// this compiles sass bourbon and neat files
gulp.task('styles', function () {
    // var bower = require('main-bower-files');
    
    return gulp.src('styles/**/*.scss')
        .pipe(sass({
            includePaths: ['styles'].concat(neat)
        }))
        .pipe(gulp.dest('content/themes/dev/assets/css'));
        // .pipe(reload({stream:true}));
});


gulp.task('scripts', function() {
  console.log('this is the scrpts section');
});



// this loads the ghost server
gulp.task('ghost', ['styles', 'scripts'], function() {  
    var ghost = require('ghost');
    process.env.NODE_ENV = 'development';
    ghost({ config: __dirname + '/ghost-config.js' }).then(function (ghostServer) {
        ghostServer.start();
    });
});



gulp.task('default', ['ghost']);

