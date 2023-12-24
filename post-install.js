var cp = require('child_process');
var path = require("path");

var myDIR  = process.cwd();
var gunDIR = path.dirname(require.resolve("gun"));
var jobs = [];


jobs.push((next) => {
    cp.exec('npx browserify ./sea.js -o ./sea.js', { cwd: gunDIR }, (err, output) => {
        next(err)
    })
})

function executeSequentially(jobList) {
    var result = Promise.resolve();
    jobList.forEach(function (job) {
        result = result.then(() => {
            return new Promise((resolve, rejects) => {
                job((err)=>{
                    if(err) return rejects(err);
                    resolve()
                });
            });
        });
    });
    return result;
}
executeSequentially(jobs)