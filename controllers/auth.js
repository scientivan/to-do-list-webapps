exports.registerPage = (req,res) =>{
    res.render('register', {
        title : 'Register Page',
        layout: 'layouts/main-layout-login-register', 
        msg : req.flash('msg')
    })
}

exports.loginPage = (req,res) =>{
    res.render('login', {
        layout: 'layouts/main-layout-login-register',
        title : 'Login Page',
        msg : req.flash('msg')
    })
}
