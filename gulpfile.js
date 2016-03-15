var gulp = require('gulp');
var browserSync = require('browser-sync').create();

var config = {
    accessKeyId : "{INPUT YOUR ACCESS KEY}",
    secretAccessKey : "{INPUT YOUR SECRET ACCESS KEY}",
    bucket : "{INPUT YOUR BUCKET NAME}"
}

var s3 = require('gulp-s3-upload')({
    accessKeyId: config.accessKeyId,
    secretAccessKey: config.secretAccessKey
});

gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: "src",
            index: "index.html"
        }
    });
});

gulp.task('bs-reload', function () {
    browserSync.reload();
});

gulp.task('default', ['browser-sync'], function () {
    gulp.watch("src/*.html", ['bs-reload']);
    gulp.watch("src/css/*.css", ['bs-reload']);
    gulp.watch("src/js/*.js", ['bs-reload']);
});

gulp.task("upload", function() {
    gulp.src("./src/**")
        .pipe(s3({
            Bucket: config.bucket,
            ACL:'public-read'
        }))
    ;
});