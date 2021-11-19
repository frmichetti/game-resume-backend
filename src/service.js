var Service = require('node-windows').Service;

// Create a new service object
var svc = new Service({
  name:'MGR - Backend',
  description: 'Backend do My Games Resume',
  script: 'D:\\DEV\\games-resume-backend\\build\\app.js'
});

// Listen for the "install" event, which indicates the
// process is available as a service.
svc.on('install',function(){
  svc.start();
});

svc.install();