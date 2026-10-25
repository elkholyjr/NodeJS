const service = require("./log.service");
async function create(req, res) {
  res.status(201).json(await service.createLog(req.body));
}
module.exports = { create };
