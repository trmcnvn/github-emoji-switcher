module.exports = {
	build: {
		// clear build folder
		src: ['build']
	},
	js: {
		// remove all non-minified js
		src: ['build/js/*.js', '!build/js/*.min.js']
	}
};
