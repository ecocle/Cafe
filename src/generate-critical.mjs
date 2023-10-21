import { generate } from 'critical';
import fs from 'fs';
import pkg from 'gulp';
const { task, src, dest, series } = pkg;
import rename from 'gulp-rename';
import minifyCSS from 'gulp-minify-css';

// Task to generate critical CSS
task('generate-critical-css', async () => {
  console.log('Generating critical CSS...');
  const cssFilePath = src('dist/assets/index-*.css'); // Adjust the glob pattern

  try {
    await new Promise((resolve, reject) => {
      cssFilePath
        .on('end', () => {
          const criticalCSS = fs.readdirSync('dist/assets').find(file => file.endsWith('.css'));

          generate({
            base: 'dist/',
            src: 'index.html',
            css: [`assets/${criticalCSS}`],
            target: {
              css: 'assets/critical.css', // This will output the critical CSS to a file
              html: 'index-critical.html', // This will output the HTML with the critical CSS inlined
            },
            inline: true,
            extract: true,
            dimensions: [
              {
                height: 900,
                width: 1200,
              },
            ],
          }, (err, output) => {
            if (err) {
              console.error(err);
              reject(err);
            } else {
              console.log('Critical CSS Generation Completed.');
              resolve();
            }
          });
        })
        .on('error', (err) => {
          console.error(err);
          reject(err);
        });
    });
  } catch (error) {
    console.error(error);
  }
});

// Task to minify non-critical CSS (Adjust the path accordingly)
task('minify-non-critical-css', () => {
  return src('assets/non-critical.css')
    .pipe(minifyCSS()) // Minify non-critical CSS
    .pipe(rename({ suffix: '.min' })) // Add .min suffix to the minified file
    .pipe(dest('dist/assets')); // Copy minified CSS to the desired output directory
});

// Default task: Generate critical CSS, minify non-critical CSS
task('default', series('generate-critical-css', 'minify-non-critical-css'));
