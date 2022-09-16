exports.helpTask = cb => {
	// explain the commands available
	console.log('\n===================================================================');
	console.log('--------------------------  Usage  --------------------------------');
	console.log('===================================================================\n');
	console.log('\ngulp       -------- start the server and wait for changes to reload\n');
   	console.log('\ngulp start -------- start the server \n');
   	console.log('\ngulp init  -------- create the scaffolding of a new project\n');
   	console.log('\ngulp sass  -------- compile any changed sass files to css\n');
   	console.log('\t   -------- start server, then compile sass files, and wait for browser to reload\n');
   	console.log('\ngulp build -------- move the project for distribution\n');
	console.log('\ngulp cleanInit -------- remove the template files used for the init\n');
   	console.log('\ngulp clean -------- remove the files created during the init\n');
   	console.log('\n==================================================================\n');
	
	// signal async completion
	cb();
};
