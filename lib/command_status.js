'use strict';

var async = require('grunt').util.async;
var grunt = require('grunt');
var ArgUtil = require('flopmang');


var labels = {
    ' ': 'unmodified',
    'M': 'modified',
    'A': 'added',
    'D': 'deleted',
    'R': 'renamed',
    'C': 'copied',
    'U': 'unmerged',
    '?': 'untracked'
};

function parseStatus(result) {
    var obj = {};
    var lines = result.split('\n');
    for (var l in lines) {
        var line = lines[l];
        var filepath = line.slice(3, line.length);
        if (filepath) {
            obj[filepath] = {
                remote: labels[line[0]] || 'error',
                local: labels[line[1]] || 'error'
            };
        }
    }
    return obj;
}


module.exports = function (task, exec, done) {
    var argUtil = new ArgUtil(task, [
    ]);

    var args = ['status'].concat(argUtil.getArgFlags());

    // Add callback
    args.push(done);

    exec.apply(this, args);
};

module.exports.description = 'Get the status of a repository.';
