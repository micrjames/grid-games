// require packages
const { src, dest } = require('gulp');
const del = require('del');

// create scaffolding for a new project
exports.initTask = cb => {
	// create the directory structure for a new project
	//display init message
	console.log('\nInitializing files ...\n');

	// create the index html file
	src('template/index.html')
			.pipe(dest('./src'));

	// create the basic JavaScript files
	src('template/js/*.js')
			.pipe(dest('./src/js'));

	// create the basic SCSS files
	src('template/scss/*.scss')
		.pipe(dest('./src/scss'));

    // move over the 'utils' SCSS code files
    src('template/scss/utils/*.scss')
   		.pipe(dest('./src/scss/utils'));
   
	// signal async completion	
	cb();
};

// move all production files to /dist
exports.buildTask = cb => {
	// display build message
	console.log("\nBuilding Distribution Ready Project ...\n");

	// move the index.html file
	src('./src/index.html')
		.pipe(dest('./dist/'));

	// move the JavaScript files
	src('./src/js/*.js')
		.pipe(dest('./dist/js'));

	// move the css files
	src('./src/css/*.css')	
		.pipe(dest('./dist/css'));

	// signal async completion
	cb();
};

// clean the initialization
exports.cleanInit = cb => {
    // then, remove the unneeded template source files
    console.log('\nRemoving template source files ...\n');
	del(['template/**/**', 'template']); 

    // signal async completion
    cb();
};

// clean the scaffold
exports.cleanTask = cb => {
	// display cleaning message
	console.log('\nCleaning files ...\n');

	// remove the created files
	del(['src/**/**', 'src']); 

	// signal async completion
	cb();
};
