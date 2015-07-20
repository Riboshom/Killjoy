var gulp = require("gulp");
var babel = require("gulp-babel");

gulp.task("default", function () {
  return gulp.src("ext/classes/*.js")
    .pipe(babel())
    .pipe(gulp.dest("ext/src/class"));
});
