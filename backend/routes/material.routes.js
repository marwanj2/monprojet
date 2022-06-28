const { authJwt } = require("../middlewares");
const controller = require("../controllers/material.controller");

module.exports = function(app) {
    app.use(function(req, res, next) {
      res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
      );
      next();
    });

    app.get("/api/materials",  controller.getAllMaterials);
    app.post("/api/material",controller.createMaterial)
    app.put("/api/materials/:id", controller.UpdateMaterial)
    app.delete("/api/materials/:id",  controller.deleteMaterial);


  };