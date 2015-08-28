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
  return gulp.src('scripts/index.js')
  .pipe(gulp.dest('content/themes/dev/assets/js'));
});

// watches 
gulp.task("watch", function(){
    // gulp.watch('./App/**/*.js', ['scripts']);
    gulp.watch('styles/**/*.scss', ['styles']);
});

// this loads the ghost server
gulp.task('ghost', ['styles', 'scripts','watch'], function() {  
    var ghost = require('ghost');
    process.env.NODE_ENV = 'development';
    ghost({ config: __dirname + '/ghost-config.js' }).then(function (ghostServer) {
        ghostServer.start();
    });
});



gulp.task('default', ['ghost']);

