var gulp = require('gulp');

var sass = require('gulp-sass');
var neat = require('node-neat').includePaths;


gulp.task('styles', function () {
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



gulp.task('ghost', ['styles', 'scripts'], function() {  
    var ghost = require('ghost');
    process.env.NODE_ENV = 'development';
    ghost({ config: __dirname + '/ghost-config.js' }).then(function (ghostServer) {
        ghostServer.start();
    });
});



gulp.task('default', function() {
  console.log('this is the gulp file');
});

