const User = require("../models/user.model");

exports.allAccess = (req, res) => {
  res.status(200).send("Public Content.");
};

exports.userBoard = (req, res) => {
  res.status(200).send("User Content.");
};

exports.adminBoard = (req, res) => {
  res.status(200).send("Admin Content.");
};

exports.moderatorBoard = (req, res) => {
  res.status(200).send("Moderator Content.");
};

exports.getUsers = async (req, res) => {
  User.find()
    .then(users => {
      res.status(200).json(users);
    }).catch(err => {
      res.status(500).json(err);
    })
}

exports.getUser = async (req, res) => {
  User.findById(req.params.id)
    .then(user => {
      res.status(200).json(user);
    }).catch(err => {
      res.status(500).json(err);
    })
}

exports.deleteUser = async (req, res) => {
  User.findByIdAndDelete(req.params.id)
    .then(users => {
      res.status(200).send("User deleted successfully");
    }).catch(err => {
      res.status(500).json(err);
    })
}

exports.UpdateUser = async (req, res) => {
  User.findById(req.params.id).then(
    user => {
      if(!user){
        return res.status(404).send({
          message: "User not found with id " + req.params.id
        });
      }
      User.findOneAndUpdate({_id:req.params.id},[{
        $set: {
          firstname: req.body.firstname != null?req.body.firstname:user.firstname,
          lastname: req.body.lastname != null?req.body.lastname:user.lastname,
          type: req.body.type != null?req.body.type:user.type,
        }
      }],{new:true})
      .then(updatedUser => {
        res.send(updatedUser);
      }).catch(err => {
        if(err.kind === 'ObjectId') {
          return res.status(404).send({
            message: "User not found with id " + req.params.id
          });
        }
        return res.status(500).send({
          message: "Error updating user with id " + req.params.id
        });
      });
    }).catch(err => {
        return res.status(404).send({
          message: "User not found with id " + req.params.id
        });
      })
};

exports.transaction = async (req, res) => {
  User.find({"phone": req.body.phone})
  .then(user => {
    console.log(req.body.montant);
    User.findOneAndUpdate({"phone": req.body.phone}, {
      $set: {
        montant: (( parseInt(req.body.montant)+parseInt(user[0].montant))/1000)
      }
    }).then(user =>{
      return res.status(201).send(user);
    }).catch(err => {
      return res.status(500).send(err);
    })
  }).catch(err => {
    return res.status(404).send("user not found")
  })
}