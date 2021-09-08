module.exports = (app) => {
  const test = require("../controllers/testControllers.js");

  var router = require("express").Router;

  router.post("/", test.create);

  router.get("/:id", test.findOne);

  router.delete("/:id", test.delete);

  app.use("/api/test", router);
};
