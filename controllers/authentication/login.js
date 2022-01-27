const User = require('../../models').User
const Poll = require('../../models').Poll
const bcrypt = require('bcrypt');
const validator = require('validator');

const crypto = require('crypto');
let secret = "andrews"


module.exports.Login = async (req, res, next) => {
    if (!validator.isEmail(req.body.email) || !req.body.password){
        req.session.loginErrorMessage = 'Email or Password is incorrect'
        res.redirect('adminlogin')
    }

    let user = await User.findOne({
        where : {
            email:req.body.email
        }
    });

if(!user){
    req.session.loginErrorMessage= 'User do not exist'
    res.redirect('adminlogin')
    }else{

        const validPassword = hashPassword(req.body.password)
        if (validPassword == user.password) {
        req.session.user = user;
        
        res.locals.polls = await Poll.findAll()
        res.render('adminDashboard')
    }

        else {
            req.session.loginErrorMessage ='Invalid email or password'
            res.redirect('adminlogin')
    }
}
}



module.exports.Logout = async (req,res,next) =>{
    
    req.session.destroy ((error) => {
        if (error) {
            console.log('Error:failed to destroy session during logout'); 
            req.user = null;
            res.redirect('/login')}

    }

   
)};

//hash password
hashPassword = (password) =>{
    return crypto.createHmac('sha256', secret)
        .update(password)
        .digest('hex');
}

