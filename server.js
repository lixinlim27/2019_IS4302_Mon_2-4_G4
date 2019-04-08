var Express = require('express');
var proxy = require('express-http-proxy');
let App = Express();
//static files
App.use(Express.static('html'));


//reverse proxy
App.use('/doctor1', proxy('localhost:3001/'));
App.use('/doctor2', proxy('localhost:3002/'));
App.use('/admin1', proxy('localhost:3003/'));
App.use('/admin2', proxy('localhost:3004/'));
App.use('/patient1', proxy('localhost:3005/'));
App.use('/patient2', proxy('localhost:3006/'));
App.use('/insuranceCompany1', proxy('localhost:3007/'));
App.use('/insuranceCompany2', proxy('localhost:3008/'));


let port = process.env.PORT || 8001;
App.listen(port, () => console.log(`Server listening on port ${port}!`))
