const gulp = require('gulp'),
  ExifTransformer = require('exif-be-gone'),
  fs = require('fs'),
  path = require('path'),
  glob = require('glob');

gulp.task('copy-assets', () => {
  return new Promise((resolve, reject) => {
    glob('./docs/assets/images/**/*.png', (err, files) => {
      if (err) reject(err);
      files.forEach(file => {
        if (file === './docs/assets/images/icon.png') return;
        const reader = fs.createReadStream(file);
        const writer = fs.createWriteStream(
          path.join('./src/assets/images', file.replace('./docs/assets/images/', '')),
        );
        reader.pipe(new ExifTransformer()).pipe(writer);
      });
      resolve();
    });
  });
});
