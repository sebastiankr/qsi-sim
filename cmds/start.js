'use strict';

var program = require('commander');
var DDPClient = require("ddp");
var uuid = require('node-uuid');
var ObjectID = require('mongodb').ObjectID;
var ASQ = require("asynquence");

require('autocmdr/lib/logger')(program);

module.exports = function (program) {
    program
        .command('start <clientName>')
        .description('starts the simulation')
        .action(function (clientName) {
            run(clientName);
        });
};

function run(clientName) {
    var pid = new ObjectID().toHexString();
    ASQ(21)
        .then(function (done, msg) {
            program.log.info('Create new QSI process for ' + clientName + ' with UUID: ' + pid);
            send('registerModelInstance', done, '7', pid);

        }).then(function (done, msg) {
            send('addObjectInstance', done, pid, { defId: "119", name: clientName });
        }).then(function (done, msg) {
            setTimeout(function () {
                send('addObjectInstance', done, pid, { defId: "120" });
            }, getRandomInt(2000, 10000));
        }).then(function (done, msg) {
            setTimeout(function () {
                send('addObjectInstance', done, pid, { defId: "122" });
            }, getRandomInt(2000, 10000));
        }).then(function (done, msg) {
            setTimeout(function () {
                send('addObjectInstance', done, pid, { defId: "125" });
            }, getRandomInt(2000, 10000));
        }).then(function (done, msg) {
            setTimeout(function () {
                send('addObjectInstance', done, pid, { defId: "131" });
            }, getRandomInt(2000, 10000));
        }).then(function (done, msg) {
            setTimeout(function () {
                send('addObjectInstance', done, pid, { defId: "129" });
            }, getRandomInt(2000, 10000));
        }).then(function (done, msg) {
            setTimeout(function () {
                send('addObjectInstance', done, pid, { defId: "135" });
            }, getRandomInt(2000, 10000));
        }).then(function (done, msg) {
            setTimeout(function () {
                send('addObjectInstance', done, pid, { defId: "137" });
            }, getRandomInt(2000, 10000));
        }).then(function (done, msg) {
            setTimeout(function () {
                program.log.info('msg: ' + msg);
                send('addObjectInstance', done, pid, { defId: "139" });
            }, getRandomInt(2000, 10000));
        }).then(function (done, msg) {
            setTimeout(function () {
                program.log.info('msg: ' + msg);
                send('addObjectInstance', done, pid, { defId: "141" });
            }, getRandomInt(2000, 10000));
        }).then(function (done, msg) {
            setTimeout(function () {
                program.log.info('msg: ' + msg);
                send('addObjectInstance', done, pid, { defId: "143" });
            }, getRandomInt(2000, 10000));
        }).then(function (done, msg) {
            setTimeout(function () {
                program.log.info('msg: ' + msg);
                send('addObjectInstance', done, pid, { defId: "145" });
            }, getRandomInt(2000, 10000));
        }).then(function (done, msg) {
            setTimeout(function () {
                program.log.info('msg: ' + msg);
                send('addObjectInstance', done, pid, { defId: "147" });
            }, getRandomInt(2000, 10000));
        }).then(function (done, msg) {
            run(clientName);
        });
}

function send(command, done) {

    var args = arguments;

    var ddpclient = new DDPClient({ host: program.host, port: program.port });
    ddpclient.connect(function (error, wasReconnect) {
        if (error) { console.log("DDP connection error!"); return; }
        delete args['0'];
        delete args['1'];
        var arr = Object.keys(args).map(function (key) { return args[key] });
        ddpclient.call(command, arr, function (err, result) {
            console.log(arr);
            if (err) {
                console.log(command + " command returned error", err);
                ddpclient.close();
                done.fail();
            } else {
                console.log(result);
                ddpclient.close();
                done();
            }
        });
    });
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}