var mongoose = require( 'mongoose' );
var User = require('../models/user');
var jwt = require('jsonwebtoken'); 
var config = require('../config');

module.exports=(router)=>{

    router.post('/register',(req, res, next)=>{
        // Check for registration errors
         const firstname = req.body.firstname;
         const lastname = req.body.lastname;
         const email = req.body.email;
         const username = req.body.username;
         const password = req.body.password;
     
         if (!firstname || !lastname || !email || !username || !password) {
             return res.status(422).json({ success: false, message: 'Posted data is not correct or incomplete.'});
         }
     
         User.findOne({ username: username }, function(err, existingUser) {
             if(err){ res.status(400).json({ success: false, message:'Error processing request '+ err}); }
     
             // If user is not unique, return error
             if (existingUser) {
                 return res.status(201).json({
                     success: false,
             message: 'Username already exists.'
                 });
             }
     
             // If no error, create account
             let oUser = new User({
                 firstname: firstname,
                 lastname: lastname,
                 email: email,
                 username: username,
                 password: password
             });
     
             oUser.save(function(err, oUser) {
                 if(err){ res.status(400).json({ success: false, message:'Error processing request '+ err}); }
             
                 res.status(201).json({
                     success: true,
             message: 'User created successfully, please login to access your account.'
                 });
             });
         });
    });





router.post('/login', (req, res)=>{
    // find the user
    User.findOne({ username: req.body.username }, function(err, user) {
		if(err){ res.status(400).json({ success: false, message:'Error processing request '+ err}); }

		if (!user) {
			res.status(201).json({ success: false, message: 'Incorrect login credentials.' });
		}else if (user) {
			user.comparePassword(req.body.password, function (err, isMatch) {
                if (isMatch && !err) {
                    var token = jwt.sign({userId: user._id}, config.secret, {
            expiresIn: config.tokenexp
            
            // const token = jwt.sign({  }, config.secret, { expiresIn: '24h' }); //
		    });
                    
                    let last_login = user.lastlogin;
                    
                    // login success update last login
                    user.lastlogin = new Date();
                
                    
                    user.save(function(err) {
                        if(err){ res.status(400).json({ success: false, message:'Error processing request '+ err}); }

                        res.status(201).json({
                            success: true,
                            message: {'userid': user._id, 'username': user.username, 'firstname': user.firstname, 'lastlogin': last_login},
                            token: token
                        });
                    });
                } else {
                    res.status(201).json({ success: false, message: 'Incorrect login credentials.' });
                }
            });	
		}
	});
});

router.use((req, res, next)=>{
    // check header or url parameters or post parameters for token
	var token = req.body.token || req.query.token || req.headers['authorization'];
    //console.log(token);
	if (token) {
        jwt.verify(token, config.secret, (err, decoded) => {
            // Check if error is expired or invalid
            if (err) {
              res.json({ success: false, message: 'Token invalid: ' + err }); // Return error for token validation
            } else {
              req.decoded = decoded; // Create global variable to use in any request beyond
              next(); // Exit middleware
            }
          });
	} else {
		return res.status(201).json({ 
			success: false, 
			message: 'Fatal error, Authenticate token not available.',
            		errcode: 'no-token'
		});
	}
});
//Route to get user's profile data
//=============================================================== */
router.get('/profile', (req, res) => {
    console.log(req.decoded.userId );
    console.log("Ganesh");
    // Search for user in database
    User.findOne({ _id: req.decoded.userId }).select('username email').exec((err, user) => {
      // Check if error connecting
      if (err) {
        res.json({ success: false, message: err }); // Return error
      } else {
        // Check if user was found in database
        if (!user) {
          res.json({ success: false, message: 'User not found' }); // Return error, user was not found in db
        } else {
          res.json({ success: true, user: user }); // Return success, send user object to frontend for profile
        }
      }
    });
  });
router.get('/user/:id', (req, res)=>{
    User.find({_id:req.params.id}).exec(function(err, user){
        if(err){ res.status(400).json({ success: false, message: 'Error processing request '+ err}); }
        res.status(201).json({
		success: true, 
		data: user
	});
    });
});
router.put('/user/:id',(req, res)=>{
    const firstname = req.body.firstname;
    const lastname = req.body.lastname;
    const email = req.body.email;
	const userid = req.params.id;

    if (!firstname || !lastname || !email || !userid) {
        return res.status(422).json({ success: false, message: 'Posted data is not correct or incompleted.'});
    } else {
	User.findById(userid).exec(function(err, user){
		if(err){ res.status(400).json({ success: false, message: 'Error processing request '+ err }); }
			
		if(user){
			user.firstname = firstname;
			user.lastname = lastname;
			user.email = email;
		}
		user.save(function(err){
			if(err){ res.status(400).json({ success: false, message:'Error processing request '+ err }); }
			res.status(201).json({
				success: true,
				message: 'User details updated successfully'
			});
		});
	});
   }
});
router.put('/password/:id',(req, res)=>{
    const userid = req.params.id;
    const oldpassword = req.body.oldpassword;
    const password = req.body.password;

    if (!oldpassword || !password || !userid) {
        return res.status(422).json({ success: false, message: 'Posted data is not correct or incompleted.'});
    } else {
        
	User.findOne({ _id: userid }, function(err, user) {
            if(err){ res.status(400).json({ success: false, message:'Error processing request '+ err}); }
            if (user) {
                user.comparePassword(oldpassword, function (err, isMatch) {
                    if (isMatch && !err) {
                        
                        user.password = password;

                        user.save(function(err) {
                            if(err){ res.status(400).json({ success: false, message:'Error processing request '+ err}); }

                            res.status(201).json({
                                success: true,
                                message: 'Password updated successfully'
                            });
                        });
                    } else {
                        res.status(201).json({ success: false, message: 'Incorrect old password.' });
                    }
                });	
            }
        });
    }
});
return router;
}
