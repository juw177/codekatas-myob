// Karma configuration

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',

    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine'],

    // list of files / patterns to load in the browser 
    //NOTE:  the order of files is VERY important as some scripts depends on others to be loaded first)
    files: [
      //js
      'https://ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js',
      '../app/js/*.js',

      //specs
      'unit/*.js'
    ],

    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,

    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['Chrome']

  });
};
