const express 	= require('express');
const app         = express();
const router = express.Router();
const user = require('./routes/user.js')(router);
const expense = require('./routes/expense.js')(router);
const blog = require('./routes/blogs.js')(router);
const bodyParser  = require('body-parser');
const morgan      = require('morgan');
const mongoose    = require('mongoose');
const cors = require('cors'); 
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
app.use(cors({ origin: 'http://localhost:4200' }));
app.use(bodyParser.urlencoded({ extended: false })); // parse application/x-www-form-urlencoded
app.use(bodyParser.json()); // parse application/json
app.use(express.static('../public')); 
app.get('/', function(req, res) {
	res.send('Expense Watch API is running at http://localhost:' + port + '/api');
});


// express router
app.use('/api', user);
app.use('/expense',expense);
app.use('/blogs',blog);
app.get('*', (req, res) => {
    res.sendFile(path.join( '../public/index.html'));
  });
// kick off the server 
app.listen(port);

  
console.log('Expense Watch app is listening at http://localhost:' + port);
