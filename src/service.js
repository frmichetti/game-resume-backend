var fs = require('fs');

var path = require('path');

var envs = []

var allFileContents = fs.readFileSync('../.env', 'utf-8');
allFileContents.split(/\r?\n/).forEach(line => {
  envs.push({ name: line.split('=')[0], value: line.split("=")[1] })
});

var Service = require('node-windows').Service;

// Create a new service object
var svc = new Service({
  name: 'mgr_backend',
  description: 'Backend do My Games Resume',
  script: 'C:\\DEV\\game-resume-backend\\build\\app.js',
  env: envs
});

// Listen for the "install" event, which indicates the
// process is available as a service.
svc.on('install', function () {
  svc.start();
});

// Listen for the "uninstall" event so we know when it's done.
svc.on('uninstall',function(){
  console.log('Uninstall complete.');
  console.log('The service exists: ',svc.exists);
});

svc.install();