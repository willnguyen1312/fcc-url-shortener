module.exports = router => {
  router.use("/new/*", require("./handleAll"));
  router.get("*", ctx => {
    ctx.body = `Give me the url right behind the slash prefix with "new/" and you will see 😊`;
  });
};
