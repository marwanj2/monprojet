const { user } = require('../models')
const Material = require('../models/material.model')

// admin things

exports.createMaterial = async (req,res) =>{
    if(!req.body){
        return res.status(400).send({message:" content can not be empty!"})
    }
    const material = await new Material({
        name: req.body.name,
        price: req.body.price
    })
    material.save()
    .then(data =>{

        res.status(200).send("Material added successfully")
    })
    .catch(err =>{
        res.status(500).json(err)
    })
}

exports.getAllMaterials = async (req,res) =>{
    await Material.find()
    .then(materials => {
      res.status(200).json(materials);
    }).catch(err => {
      res.status(500).json(err);
    })
}


exports.deleteMaterial = async (req, res) => {
    await Material.findByIdAndDelete(req.params.id)
      .then(materials => {
        res.status(200).send("Material deleted successfully");
      }).catch(err => {
        res.status(500).json(err);
      })
  }


exports.UpdateMaterial = async (req, res) => {
  await Material.findById(req.params.id).then(
    materials => {
      if(!materials){
        return res.status(404).send({
          message: "Material not found with id " + req.params.id
        });
      }
    Material.findOneAndUpdate({_id:req.params.id},[{
        $set: {
          price: req.body.price != null?req.body.price:materials.price
        }
      }],{new:true})
      .then(updatedMaterial => {
        res.send(updatedMaterial);
      }).catch(err => {
        if(err.kind === 'ObjectId') {
          return res.status(404).send({
            message: "Material not found with id " + req.params.id
          });
        }
        return res.status(500).send({
          message: "Error updating materials with id " + req.params.id
        });
      });
    }).catch(err => {
        return res.status(404).send({
          message: "Material not found with id " + req.params.id
        });
      })
};