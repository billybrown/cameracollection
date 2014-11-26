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

    // this task allows you to publish to github pages
    'gh-pages': {
      options: {
        base: 'dist/'
      },
      src: ['**']
    },

    // this task compiles your sass to css using Libsass, a C++ version of sass
    // LibSass is faster to compile, and frees us from having to use ruby
    // but it lags behind sass in features.
    sass: {
        options: {
            sourceMap: true
        },
        dist: {
            files: {
                'dist/css/main.css': 'src/css/main.scss'
            }
        }
    },

    // this task applies vendor prefixes (ie: -webkit, -moz, -o) to your css
    // based on specific browser support defined here
    // @author bill, echo & co.
    autoprefixer: {
      options: {
        browsers: [
          'last 2 version'
        ]
      },
      custom: {
        options: {
          map: true
        },
        src: 'dist/css/main.css'
      }
    },

    // this task removes unused css
    uncss: {
      dist: {
        files: {
          'dist/css/main.css': ['dist/index.html']
        }
      }
    },

    // this task minifies your css
    csso: {
      dynamic_mappings: {
        expand: true,
        cwd: 'dist/css/',
        src: ['*.css'],
        dest: 'dist/css/'
      }
    },

    // this tasks deletes everythign in the build directory
    clean: {
      build: ['dist']
    },

    // this task optimizes your images
    imagemin: {
      png: {
        files: [{
          expand: true,
          cwd: 'src/img/',
          src: ['**/*.png'],
          dest: 'src/img/'
        }]
      },
      svg: {
        files: [{
          expand: true,
          cwd: 'src/img/',
          src: ['**/*.svg'],
          ext: '.svg',
          dest: 'src/img/'
        }]
      },      
    },

    // this task 'watches' files and triggers other grunt tasks when those
    // files are saved.
    watch: {
      sass: {
        files: ['src/css/**/**/*.scss'],
        tasks: ['css']
      },
      // this task must come last, and it will refresh your browser (as long
      // as you have the chrome extension) whenever certain files get changed
      livereload: {
        options: { livereload: true },
        files: ['dist/css/main.css'],
      }
    },

    // this tasks copies stuff over
    copy: {
      main: {
        files: [
          {expand: true, cwd: 'src/fonts/', src: ['**/*'], dest: 'dist/fonts/'},
          {expand: true, cwd: 'src/files/', src: ['**/*'], dest: 'dist/files/'},
          {expand: true, cwd: 'src/img/', src: ['**/*'], dest: 'dist/img/'}
        ],
      },
    },

    // this task minifies your html
    htmlmin: {
      dist: {
        options: {
          removeComments: true,
          collapseWhitespace: true
        },
        files: {
          'dist/index.html': 'src/index.html'
        }
      }
    },

    // this minifies and concatenates your javascript
    uglify: {
      my_target: {
        files: {
          'dist/js/scripts.min.js': ['src/js/jquery-1.4.4.min.js', 'src/js/jquery.isotope.min.js', 'src/js/scripts.js']
        }
      }
    },


    // this tasks abouts the size of files in your theme directory
    // Helps when your trying to optimize for performance
    size_report: {
        your_target: {
            files: {
                list: ['dist/**/**']
            },
        },
    }

  });


  // documentation on how to run different tasks is in the readme
  grunt.registerTask('default', ['node_version']);
  grunt.registerTask('css', ['node_version', 'sass', 'autoprefixer']);
  grunt.registerTask('build', [
    'node_version', 
    'clean', 
    'htmlmin',
    'imagemin', 
    'sass', 
    'autoprefixer', 
    'uncss',
    'csso', 
    'copy',
    'uglify',
    'size_report'
  ]);
  grunt.registerTask('deploy', ['node_version', 'gh-pages']);


};
