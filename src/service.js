var Service = require('node-windows').Service;

// Create a new service object
var svc = new Service({
  name:'mgr_backend',
  description: 'Backend do My Games Resume',
  script: 'C:\\DEV\\game-resume-backend\\build\\app.js'
});

// Listen for the "install" event, which indicates the
// process is available as a service.
svc.on('install',function(){
  svc.start();
});

svc.install();