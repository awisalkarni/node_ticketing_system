const router = require('express').Router();
let User = require('../models/user.model');
let Company = require('../models/company.model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
try {
  var config = require('./config.json');
} catch (ex) {

}

router.route('/').get((req, res) => {
  User.find()
    .then(users => res.json(users))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const username = req.body.username;
  const email = req.body.email;
  const password = req.body.password;
  const phone_number = req.body.phone_number;
  const company = req.body.company;

  const newUser = new User({
    username,
    email,
    password,
    phone_number,
    company,
  });

  newUser.save()
    .then(() => res.json('User added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/login').post(async (req, res) => {

  const username = req.body.username;
  const password = req.body.password;
  await User.findOne({ username: username })
    .then((user) => {

      if (user && bcrypt.compareSync(password, user.password)) {
        const secret = process.env.JWTSECRET || config.secret;
        const token = jwt.sign({ sub: user.id }, secret);
        res.json({ user: user, token: token });
      } else {
        res.status(401).json('Invalid username or password');
      }


    })
    .catch((err) => res.status(400).json('error: ' + err));


});

router.route('/register').post(async (req, res) => {

  const username = req.body.username;
  const email = req.body.email;
  const password = req.body.password;
  const companyName = req.body.company;

  var companyId;
  await Company.findOne({ name: companyName }, async function (err, existingCompany) {

    if (err) {
      console.log(err);
    }

    console.log(existingCompany);

    if (existingCompany == null) {
      
      const newCompany = new Company({
        name: companyName
      });

      companyId = newCompany._id;

      newCompany.save().catch(err => res.status(400).json('Error: ' + err));
    } else {
      companyId = existingCompany._id;
    }
  });

    console.log(companyId);

    const newUser = new User({
      username: username,
      email: email,
      password: password,
      company: companyId,
    });

    // hash password
    if (password) {
      newUser.password = bcrypt.hashSync(newUser.password, 10);
    }

    newUser.save()
      .then(() => res.json('New user registered'))
      .catch(err => res.status(400).json('Error: ' + err));

  });
  

  router.route('/add').post((req, res) => {
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;
    const phone_number = req.body.phone_number;
    const company = req.body.company;

    const newUser = new User({
      username,
      email,
      password,
      phone_number,
      company,
    });

    // hash password
    if (password) {
      newUser.password = bcrypt.hashSync(newUser.password, 10);
    }

    newUser.save()
      .then(() => res.json('User added!'))
      .catch(err => res.status(400).json('Error: ' + err));
  });


  router.route('/:id').get((req, res) => {
    User.findById(req.params.id)
      .then(user => res.json(user))
      .catch(err => res.status(400).json('Error: ' + err));
  });

  router.route('/:id').delete((req, res) => {
    User.findByIdAndDelete(req.params.id)
      .then(() => res.json('User deleted.'))
      .catch(err => res.status(400).json('Error: ' + err));
  });

  router.route('/update/:id').post((req, res) => {
    User.findById(req.params.id)
      .then(user => {
        user.username = req.body.username;
        user.email = req.body.email;
        user.phone_number = req.body.phone_number;
        user.company = req.body.company;

        user.save()
          .then(() => res.json('User updated!'))
          .catch(err => res.status(400).json('Error: ' + err));
      })
      .catch(err => res.status(400).json('Error: ' + err));
  });

  module.exports = router;