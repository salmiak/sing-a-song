var gulp = require('gulp'),
	argv = require('yargs').argv,
	premailer = require('gulp-premailer'),
	rename = require('gulp-rename'),
	c = require('ansi-colors');


var emailsPath = './emails/';

gulp.task('compile', function (done) {
	if (!argv.email) {
		console.log(c.red('Usage: gulp compile --email NAME'));
		return done();
	}

	var emailName = argv.email,
		emailPath = emailsPath + emailName + '/source.html';

	return gulp.src(emailPath)
		.pipe(premailer({}))
		.pipe(rename(function (path) {
			path.basename = "compiled";
		}))
		.pipe(gulp.dest(emailsPath + emailName))

});