module.exports = {
	options: {
		nospawn: true,
	},
	resources: {
		files: ['app/**/*'],
		tasks: ['copy:debug']
	},
	js: {
		files: ['app/scripts/**/*.js'],
		tasks: ['uglify:debug']
	}
};
