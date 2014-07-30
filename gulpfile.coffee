gulp = require 'gulp'
uglify = require 'gulp-uglify'
rename = require 'gulp-rename'

gulp.task 'compress', ->
  gulp.src 'dist/position-sticky.js'
    .pipe uglify()
    .pipe rename('position-sticky.min.js')
    .pipe gulp.dest 'dist'
