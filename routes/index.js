module.exports = router => {
  router.use("/:query", require("./handleAll"));
};
