const { spawn } = require('child_process');

let slsOfflineProcess;

before(function (done) {
    // increase mocha timeout for this hook to allow sls offline to start
    this.timeout(30000);

    console.log("[Tests Bootstrap] Start");

    startSlsOffline(function (err) {
        if (err) {
            return done(err);
        }

        console.log("[Tests Bootstrap] Done");
        done();
    })
});

after(function () {
    console.log("[Tests Teardown] Start");

    stopSlsOffline();

    console.log("Server ended");
});


// Helper functions

function startSlsOffline(done) {
    const home = process.env.HOME;
    let command = "";

    if (/^c:\\/i.test(home))
        command = "c:/cygwin64/bin/bash.exe -c 'serverless'";
    else
        command = "serverless";
    console.log(command);
    slsOfflineProcess = spawn(command, ["offline", "start", "--useSeparateProcesses"]);

    console.log(`Serverless: Offline started with PID : ${slsOfflineProcess.pid}`);

    slsOfflineProcess.stdout.on('data', (data) => {
        if (data.includes("Offline listening on")) {
            console.log(data.toString().trim());
            done();
        }
    });

    slsOfflineProcess.stderr.on('data', (errData) => {
        console.log(`Error starting Serverless Offline:\n${errData}`);
        done(errData);
    });
}


function stopSlsOffline() {
    slsOfflineProcess.kill();
    console.log("Serverless Offline stopped");
}