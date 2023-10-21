import pkg from 'gulp';
const { task, dest, src } = pkg;
import { generate } from 'critical';
import concat from 'gulp-concat'
import rename from 'gulp-rename';
import minifyCSS from 'gulp-minify-css';
import runSequence from 'gulp4-run-sequence'
import gulp from "gulp";

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
          }, (err) => {
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
task('generate-non-critical-css', () => {
  return gulp
    .src(['src/css/file1.css', 'src/css/file2.css']) // Add the paths to your CSS files
    .pipe(concat('non-critical.css')) // Concatenate CSS files into a single file
    .pipe(minifyCSS()) // Minify the CSS
    .pipe(rename({ suffix: '.min' })) // Add .min suffix to the minified file
    .pipe(dest('dist/assets')); // Output directory for the minified CSS
});


// Default task: Generate critical CSS, minify non-critical CSS
task('default', async () => {
  await runSequence(['generate-critical-css', 'generate-non-critical-css']);
});