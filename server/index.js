const express 	= require('express');
const app         = express();
const router = express.Router();
const user = require('./routes/user.js')(router);
const expense = require('./routes/expense.js')(router);
const blog = require('./routes/blogs.js')(router);
const bodyParser  = require('body-parser');
const morgan      = require('morgan');
const mongoose    = require('mongoose');

const jwt    = require('jsonwebtoken'); 
const config = require('./config'); 

const port = process.env.PORT || config.serverport;
mongoose.connect(config.database, function (err) {
    if (err) {
        console.log("error connecting database.Chek if MongoDB is running.");
    } else {
        console.log("Connected to the database");
    }
});
//use body parser  so we can get info from  POST and/or  URL parameter
app.use(bodyParser.urlencoded({ extended: true }));
app.use(require('body-parser').json({ type: '*/*' }));
app.use(express.static('../public'
)); // Provide static directory for frontend
//user morgan to log request to the console

app.use(morgan('dev'));
//enable cors fro the client side
// Enable CORS from client-side
app.use(function (req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization, Access-Control-Allow-Credentials");
    res.setHeader("Access-Control-Allow-Credentials", "true");
    next();
});
app.get('/', function(req, res) {
	res.send('Expense Watch API is running at http://localhost:' + port + '/api');
});
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + '../public/index.html'));
  });


// express router
app.use('/api', user);
app.use('/expense',expense);
app.use('/blogs',blog);
// kick off the server 
app.listen(port);
console.log('Expense Watch app is listening at http://localhost:' + port);
