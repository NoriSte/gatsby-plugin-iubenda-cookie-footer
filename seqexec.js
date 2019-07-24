#!/usr/bin/env node
/*global require process */

// see https://gist.github.com/goatslacker/1050077

const exec = require('child_process').exec;

/**
  Returns a function to be executed
  @param cmd {string} the command to run
  @param callback {Function} the Function to execute after the command finishes running
  */
var run = function (cmd, callback) {
  return function () {
    console.log("Now running: " + cmd);

    setTimeout(function () {
      exec(cmd, function (err, stdout) {
        if (err) {
          throw err;
        }

        console.log(stdout);

        if (callback) {
          callback();
        }
      });
    }, 1);
  };
},

/**
  Executes a set of instructions -- recursively builds using the run() function
  @param instructions {Array} the commands to execute
  @return Function
  */
build = function () {
  var cmd = null,
      instructions = Array.prototype.slice.call(arguments, 0);

  if (instructions.length === 0) {
    return cmd;
  } else {
    cmd = instructions.shift();
    return run(cmd, build.apply(this, instructions));
  }
};


(function () {

  // example
  var go = build(
    'npm run build',
    'npm run test:base-configuration-test',
    'npm run test:gtm-test',
    'npm run test:custom-gtm-test',
  );

  go();

}());
