const { watch } = require('gulp');
const browsersync = require('browser-sync').create();

exports.browsersyncTask = cb => {
	// display start server message
	console.log('\nStarting Server ...\n');

	// start the live server
	browsersync.init({
		server: {
			baseDir: './src'
		}
	}) 

	// signal async completion
	cb();
};
// watch the files for changes
exports.browsersyncReloadTask = cb => {
	// watch the files and reload the server
	watch(['./src/index.html', './src/js/*.js', './src/css/*.css'], cb => {
		// reload the live server on change
		console.log('Reloading the Server ...\n');
		browsersync.reload();

		// signal async completion
		cb();  
	});	

	// signal async completion
	cb();
};
