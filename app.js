var express     = require('express'),
    bodyParser  = require('body-parser'),
    mongoose    = require('mongoose'),
    morgan      = require('morgan'),
    user        = require('./routes/user.route'),
    PORT        = 3030,
    app         = express();

//connect to mongodb
mongoose.connect('mongodb://localhost/JWTauth_API');

//config use
app.use(morgan('combined'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use('/user', user);

//routes

app.get('/checking', function(req, res){
    res.json({
        'Tutorial': 'Welcome to the Node express JWT Tutorial'
    });
});


app.listen(PORT, function(){
    console.log('server running on port '+ PORT);
});