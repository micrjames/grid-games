// require packages
const { src, dest, series, parallel, watch } = require('gulp');
const sass = require('gulp-sass')(require('sass'));

// require config scripts
const { browsersyncTask, browsersyncReloadTask } = require('./sips/browser-sip'); 
const { initTask, buildTask, cleanInit, cleanTask } = require('./sips/crud-sip');
const { helpTask } = require('./sips/help-sip');

// run the default tasks
exports.default = parallel( cb => {
		// display run message
		console.log('\nRunning Gulp ...\n');

		// signal async completion
		cb(); 
	}, 
	// start the live server
	browsersyncTask, 
	browsersyncReloadTask
);
// set up the files for a project 
exports.init = series(cb => {
	//display init message
	console.log('\nInitializing Project ...\n');

	// signal async completion
	cb();
}, initTask);
exports.sass = cb => {
	console.log('Compiling Sass files ...\n');

	// compile the sass files
	src('./src/scss/*.scss')
		.pipe(sass().on('error', sass.logError))
			.pipe(dest('./src/css'));

	// signal async completion
	cb();
};
exports.start = browsersyncTask;
exports.clean = cleanTask;
exports.cleanInit = cleanInit;
exports.build = buildTask;
exports.help = helpTask;
