const User = require('./userModel');

const userController = {};

userController.createUser = async (req, res, next) => {
  const { username, password } = req.body;
  if (!username || !password) {
    next({
        log: 'User creation error in userController.createUser: one of 2 fields is empty',
        status: 400,
        message: 'Both username and password must have some input' 
    });
  }
  const existingUser = await User.findOne({ username: username });
  if (!existingUser) {
    const newUser = await User.create({
      username: username,
      password: password,
    });
    res.locals.user = newUser;
    next()
  } else {
    next({
        log: 'Failed to create user in userController.createUser: Username already exists',
        status: 401,
        message: 'Cannot create user: username already exists'
    })
  }
};

userController.getUser = async (req, res, next) => {
    const {username, password} = req.body;
    console.log('Looking for user', username)
    const thisUser = await User.findOne({username: username});
    if(!thisUser){
        res.redirect('http://localhost:5173/signup') // needs to redirect to signup page if info is incorrect
    }
    const valid = await thisUser.comparePassword(password);
    if(!valid){
        res.redirect('http://localhost:5173/signup');
    }
    res.locals.user = thisUser
    return next()
}

module.exports = userController