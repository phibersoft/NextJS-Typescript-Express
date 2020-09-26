import * as express from "express";

const router: express.Router = express.Router();
router.get(`/developer`, (req, res) =>
  res.json({
    success: true,
    developer: "phibersoft",
    contact: "phibersoft@hotmail.com",
  })
);
module.exports = router;
