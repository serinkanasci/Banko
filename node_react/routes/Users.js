const express = require('express');
const users = express.Router();
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const User = require('../models/User');
const Banker = require('../models/Banker');
const Transfer = require('../models/Transfer');
const Account = require('../models/Account');
const Depot = require('../models/Depot');
const Alerte = require('../models/Alerte');
var basicAuth = require("express-basic-auth");

const Op = require('Sequelize').Op;


users.use(cors());

process.env.SECRET_KEY = 'secret';

function myAuthorizer(username, password) {
    const userMatches = basicAuth.safeCompare(username, 'projet_node');
    const passwordMatches = basicAuth.safeCompare(password, 'nodejs');
 
    return userMatches & passwordMatches;
}

users.post('/user_register',basicAuth( { authorizer: myAuthorizer } ),(req, res) => {
  const userData = {
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    mailadress: req.body.mailadress,
    passworduser: req.body.passworduser,
    adress: req.body.adress,
    phonenumber: req.body.phonenumber
  }

  User.findOne({
    where: {
      mailadress: req.body.mailadress
    }
  })
    //TODO bcrypt
    .then(user => {
      if (!user) {
        bcrypt.hash(req.body.passworduser, 10, (err, hash) => {
          userData.passworduser = hash;
          User.create(userData)
            .then(user => {
              res.json({ status: user.mailadress + ' Registered!' });
            })
            .catch(err => {
              res.send('error: ' + err);
            })
        })
      } else {
        res.json({ error: 'User already exists' });
      }
    })
    .catch(err => {
      res.send('error: ' + err);
    })
})







users.post('/user_login', basicAuth( { authorizer: myAuthorizer } ),(req, res) => {
  User.findOne({
    where: {
      mailadress: req.body.mailadress
    }
  })
    .then(user => {
      if (user) {
        if (bcrypt.compareSync(req.body.passworduser, user.passworduser)) {
          let token = jwt.sign(user.dataValues, process.env.SECRET_KEY, {
            expiresIn: 1440000
          })
          res.send(token);
        }
        else{
        	res.status(401).json({ error: 'Password does not exist' });
        }
    	}
       else {
        res.status(400).json({ error: 'User does not exist' });
      }
    })
    .catch(err => {
      res.status(400).json({ error: err });
    })
})

users.post('/depot', basicAuth( { authorizer: myAuthorizer } ),(req, res) => {
  const today = new Date()
  const userData = {
    description: req.body.description,
    iddepot: req.body.iddepot,
    creationdate: today,
    destination: req.body.destination,
    amount: req.body.amount
    
  }
  Depot.create(userData)
            .then(depot => {
              res.json({  Depot : 'Created!' });
            })
            .catch(err => {
              res.send('error');
            })
})

users.post('/alerte', basicAuth( { authorizer: myAuthorizer } ),(req, res) => {
  const today = new Date()
  const userData = {
    iduser: req.body.iduser,
    creationdate: today,
    description: req.body.description
  }
  Alerte.create(userData)
            .then(alerte => {
              res.json({  Alerte : 'Created!' });
            })
            .catch(err => {
              res.send('error');
            })
})


users.get('/get_alerte/:id', basicAuth( { authorizer: myAuthorizer } ),(req, res) => {

  const account = parseInt(req.params.id);


  Alerte.findAll({
    where: {
      iduser: account
    }
  })
    .then(alerte => {
      if (alerte) {
        res.json(alerte);
      } else {
        res.send('Alerte does not exist');
      }
    })
    .catch(err => {
      res.send('error: ' + err);
    })
})


users.get('/get_depot/:id', basicAuth( { authorizer: myAuthorizer } ),(req, res) => {

  const account = parseInt(req.params.id);


  Depot.findAll({
    where: {
      destination: account
    }
  })
    .then(depot => {
      if (depot) {
        res.json(depot);
      } else {
        res.send('Depot does not exist');
      }
    })
    .catch(err => {
      res.send('error: ' + err);
    })
})

users.get('/get_transfer/:id', basicAuth( { authorizer: myAuthorizer } ),(req, res) => {

  const account = parseInt(req.params.id);


  Transfer.findAll({
   
    where: {
    [Op.or]: [ 
   { 
     receiverid: {
      [Op.eq]: account
      }
    },
    { 
     senderid: {
      [Op.eq]: account
      }
    }
 ]
}

  })
    .then(transfer => {
      if (transfer) {
        res.json(transfer);
      } else {
        res.send('Transfer does not exist');
      }
    })
    .catch(err => {
      res.send('error: ' + err);
    })


})




users.get('/user_profile', (req, res) => {
  let bearer = req.headers['authorization'];
  if(bearer.startsWith('Bearer ')){
      let test = bearer.replace('Bearer ','');

      var decoded = jwt.verify(test, process.env.SECRET_KEY);
  }
  else{
      var decoded = jwt.verify(bearer, process.env.SECRET_KEY);
  }


  User.findOne({
    where: {
      iduser: decoded.iduser
    }
  })
    .then(user => {
      if (user) {
        res.json(user)
      } else {
        res.send('User does not exist');
      }
    })
    .catch(err => {
      res.send('error: ' + err);
    })
})

users.post('/banker_register', basicAuth( { authorizer: myAuthorizer } ),(req, res) => {
  const userData = {
    userid: parseInt(req.body.userid),
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    mailadress: req.body.mailadress,
    passwordbanker: req.body.passworduser
  }

  Banker.findOne({
    where: {
      mailadress: req.body.mailadress
    }
  })
    //TODO bcrypt
    .then(banker => {
      if (!banker) {
        bcrypt.hash(req.body.passwordbanker, 10, (err, hash) => {
          userData.passwordbanker = hash;
          Banker.create(userData)
            .then(banker => {
              res.json({ status: banker.mailadress + ' Registered!' });
            })
            .catch(err => {
              res.send('error: ' + err);
            })
        })
      } else {
        res.json({ error: 'Banker already exists' });
      }
    })
    .catch(err => {
      res.send('error: ' + err);
    })
})





users.post('/banker_login', (req, res) => {
  Banker.findOne({
    where: {
      mailadress: req.body.mailadress
    }
  })
    .then(banker => {
      if (banker) {
        if (bcrypt.compareSync(req.body.passwordbanker, banker.passwordbanker)) {
          let token = jwt.sign(banker.dataValues, process.env.SECRET_KEY, {
            expiresIn: 1440000
          })
          res.send(token);
        }
        else{
          res.status(401).json({ error: 'Password does not exist' });
        }
      }
       else {
        res.status(400).json({ error: 'Banker does not exist' });
      }
    })
    .catch(err => {
      res.status(400).json({ error: err });
    })
})

users.get('/banker_profile', (req, res) => {
  let bearer = req.headers['authorization'];
  if(bearer.startsWith('Bearer ')){
      let test = bearer.replace('Bearer ','');
      var decoded = jwt.verify(test, process.env.SECRET_KEY);
  }
  else{
      var decoded = jwt.verify(bearer, process.env.SECRET_KEY);
  }


    Banker.findOne({
    where: {
      bankerid: decoded.bankerid
    }
  })
    .then(banker => {
      if (banker) {
        res.json(banker);
      } else {
        res.send('Banker does not exist');
      }
    })
    .catch(err => {
      res.send('error: ' + err);
    })
})

users.post('/transfer', basicAuth( { authorizer: myAuthorizer } ),(req, res) => {
  const userData = {
    senderid: parseInt(req.body.senderid),
    receiverid: parseInt(req.body.receiverid),
    amount: parseInt(req.body.amount),
    description: req.body.description
  }
  if(parseInt(req.body.senderid) == parseInt(req.body.receiverid)){
    res.send('C\'est débile');
  }
  else{

    if(Math.sign(parseInt(req.body.amount))==1){
    Transfer.create(userData)
            .then(transfer => {
              res.json({  Transfer : 'Sended!' });
            })
            .catch(err => {
              res.send('error');
            })
    }
    else{

      res.send('T\'es serieux mon gars ? Mets un nombre positif');

    }

  }
  
})

users.post('/create_account', basicAuth( { authorizer: myAuthorizer } ),(req, res) => {
  const today = new Date()
  const userData = {
    iduser: parseInt(req.body.iduser),
    amount: parseInt(req.body.amount),
    accountlimit: req.body.accountlimit,
    creationdate: today
  }

  Account.create(userData)
            .then(account => {
              res.json({  Account : 'Created!' });
            })
            .catch(err => {
              res.send('error');
            })
})

users.put('/update_account/:id', basicAuth( { authorizer: myAuthorizer } ),(req, res) => {
  const today = new Date()
  const userData = {
    idaccount: parseInt(req.params.id),
    amount: parseInt(req.body.amount),
    accountlimit: req.body.accountlimit,
    creationdate: today
  }

  Account.findOne({
    where: {
      idaccount: userData.idaccount
    }
  })
    .then(account => {
      if (account) {
        account.update({
            amount:userData.amount  
        });

        account.update({
            accountlimit:userData.accountlimit  
        });

        res.json(account);
      } else {
        res.send('Account does not exist');
      }
    })
    .catch(err => {
      res.send('error: ' + err);
    })


  })





  users.put('/update_user/:id', basicAuth( { authorizer: myAuthorizer } ),(req, res) => {
   const userData = {
    iduser: parseInt(req.params.id),
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    mailadress: req.body.mailadress,
    adress:req.body.adress,
    phonenumber:req.body.phonenumber,
    passworduser:req.body.passworduser
  }

  User.findOne({
    where: {
      iduser: userData.iduser
    }
  })
    .then(user => {
      if (user) {
        bcrypt.hash(req.body.passworduser, 10, (err, hash) => {
          userData.passworduser = hash;
          user.update({
            firstname: userData.firstname,
            lastname: userData.lastname,
            mailadress: userData.mailadress,
            adress: userData.adress,
            phonenumber: userData.phonenumber,
            passworduser: userData.passworduser
        });

        res.json(user);
        })
        
      } else {
        res.send('User does not exist');
      }
    })
    .catch(err => {
      res.send('error: ' + err);
    })


  })


users.put('/update_banker/:id', basicAuth( { authorizer: myAuthorizer } ),(req, res) => {
  const userData = {
    bankerid: parseInt(req.params.id),
    userid:parseInt(req.body.userid),
    firstname:req.body.firstname,
    lastname:req.body.lastname,
    mailadress:req.body.mailadress,
    passwordbanker:req.body.passwordbanker
  }

  Banker.findOne({
    where: {
      bankerid: userData.bankerid
    }
  })
    .then(banker => {
      if (banker) {
        bcrypt.hash(req.body.passwordbanker, 10, (err, hash) => {
          userData.passworduser = hash;
          banker.update({
            userid:userData.userid,
            firstname:userData.firstname,
            lastname:userData.lastname,
            mailadress:userData.mailadress,
            passwordbanker: hash
        });

        res.json(banker);
        })
        
      } else {
        res.send('Banker does not exist');
      }
    })
    .catch(err => {
      res.send('error: ' + err);
    })


  })





users.delete('/delete_account', basicAuth( { authorizer: myAuthorizer } ),(req, res) => {
  const userData = {
    idaccount: req.body.idaccount
  }

  Account.destroy({
   where: {
       idaccount: req.body.idaccount
   }
}).then(function(rowDeleted){ // rowDeleted will return number of rows deleted
  if(rowDeleted === 1){
     res.json({  Account : 'Deleted!' });
   }
}, function(err){
    res.send('error'); 
});
})


users.delete('/delete_banker', basicAuth( { authorizer: myAuthorizer } ),(req, res) => {

  Banker.destroy({
   where: {
       bankerid: req.body.bankerid
   }
}).then(function(rowDeleted){ // rowDeleted will return number of rows deleted
  if(rowDeleted === 1){
     res.json({  Account : 'Deleted!' });
   }
}, function(err){
    res.send('error'); 
});
})



users.get('/get_account/:id', basicAuth( { authorizer: myAuthorizer } ),(req, res) => {

  const account = parseInt(req.params.id);


  Account.findOne({
    where: {
      idaccount: account
    }
  })
    .then(account => {
      if (account) {
        res.json(account);
      } else {
        res.send('Account does not exist');
      }
    })
    .catch(err => {
      res.send('error: ' + err);
    })
})

users.get('/get_accounts/:id', basicAuth( { authorizer: myAuthorizer } ),(req, res) => {

  const account = parseInt(req.params.id);


  Account.findAll({
    where: {
      iduser: account
    }
  })
    .then(account => {
      if (account) {
        res.json(account);
      } else {
        res.send('Account does not exist');
      }
    })
    .catch(err => {
      res.send('error: ' + err);
    })
})

users.get('/get_user/:id', basicAuth( { authorizer: myAuthorizer } ),(req, res) => {

  const account = parseInt(req.params.id);


  User.findOne({
    where: {
      iduser: account
    }
  })
    .then(user => {
      if (user) {
        res.json(user);
      } else {
        res.send('User does not exist');
      }
    })
    .catch(err => {
      res.send('error: ' + err);
    })
})


users.get('/get_bankers', basicAuth( { authorizer: myAuthorizer } ),(req, res) => {



  Banker.findAll({
  })
    .then(banker => {
      if (banker) {
        res.json(banker);
      } else {
        res.send('Banker does not exist');
      }
    })
    .catch(err => {
      res.send('error: ' + err);
    })
})

users.get('/get_banker/:id', basicAuth( { authorizer: myAuthorizer } ),(req, res) => {


  const banker = parseInt(req.params.id);



  Banker.findOne({
    where: {
      bankerid: banker
    }
  })
    .then(banker => {
      if (banker) {
        res.json(banker);
      } else {
        res.send('Banker does not exist');
      }
    })
    .catch(err => {
      res.send('error: ' + err);
    })
})


module.exports = users;