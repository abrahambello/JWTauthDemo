var express     = require('express'),
    router      = express.Router(),
    mongoose    = require('mongoose'),
    bcrypt      = require('bcrypt'),
    jwt         = require('jsonwebtoken'),
    User        = require('../models/user.model');


//sign up route
router.post('/signup', function(req, res){
   bcrypt.hash(req.body.password, 10, function(err, hash){
        User.create({email: req.body.email, password: hash}, function(err, userCreated){
        if(err){
            return res.status(500).json({
                error: err
            });
        } else {
            console.log(userCreated);
            res.status(200).json({
                success: 'New user has been created'
            });
        }
    });
   });
});

//sign in route
router.post('/signin', function(req, res){
    User.findOne({email: req.body.email}, function(err, user){
        if(err){
            return res.status(500).json({
                error: err
            });
        } else if(!user){
            return res.status(404).json({
                failed: 'No user found'
            });
        }else{
            bcrypt.compare(req.body.password, user.password, function(err, result){
                if(err) {
                    return res.status(401).json({
                        failed: 'Unauthorized Access'
                    });
                }
                if(result) {
                    console.log(result);
                    var JWTToken = jwt.sign({
                        email: user.email,
                        _id: user._id
                    },
                        'secret',
                        {
                            expiresIn: '2h'
                        });
                    return res.status(200).json({
                        success: 'Welcome to the JWT Auth',
                        email: user.email,
                        id: user._id,
                        token: JWTToken,
                        Expiration: expiresIn
                    });
                }
                return res.status(401).json({
                    failed: 'Unauthorized Access'
                });
            })
        }
    });
});

//update user
module.exports = router;