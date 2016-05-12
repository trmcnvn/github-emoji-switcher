module.exports = function (grunt) {
	grunt.registerTask('default', [
		'copy:debug',
		'uglify:build']);
};
