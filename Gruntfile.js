'use strict';

module.exports = function (grunt) {

  // this needs to go at the top - it will print out how long 
  // things took. Helps with debugging
  // @author bill, echo & co.
  require('time-grunt')(grunt);

  // this allows you to remove all the 'loadNPMtasks' calls, and speeds up task running
  // @author bill, echo & co.
  require('jit-grunt')(grunt, {
    "svg-sprites": 'grunt-dr-svg-sprites' // this grunt plugin isn't registered by JIT, so gotta declare here.
  });  



  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    // this task makes sure you are running the right version of node
    // @author bill, echo & co.
    node_version: {
      options: {
        alwaysInstall: false,
        errorLevel: 'fatal',
        globals: [],
        maxBuffer: 200*1024,
        nvm: true,
        override: ''
      }
    },

    'gh-pages': {
      options: {
        base: ''
      },
      src: ['**']
    }

  });


  // documentation on how to run different tasks is in the readme
  grunt.registerTask('deploy', ['node_version', 'gh-pages']);
  grunt.registerTask('default', ['node_version']);



};
