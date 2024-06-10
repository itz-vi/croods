
const express = require('express');
const router = express.Router();
const userModel = require('./users')


router.get('/', async function (req, res) {
  const users = await userModel.find();
  res.render("home", { users });
});


//------------ Create - Read  Profile --------------- //
router.post("/create", async function (req, res) {
  const { username, email, password } = req.body;
  const newUser = await userModel.create({ username, email, password })
  const users = await userModel.find();
  res.render("home", { users });
});


//------------ Update Profile --------------- //
router.post("/updateUser/:id", async function (req, res) {
  const { username, email, password } = req.body;
  const id = req.params.id;
  await userModel.findByIdAndUpdate(id, { username, email, password }, { new: true });
  const users = await userModel.find();
  const latestUser = users.length > 0 ? users[users.length - 1] : null;
  res.render("home", { users, user: latestUser });
});


router.get("/deleteUser/:id", async function (req, res) {
  const id = req.params.id;
  await userModel.findByIdAndDelete(id);
  const users = await userModel.find();
  const latestUser = users.length > 0 ? users[users.length - 1] : null;
  res.render("home", { users, user: latestUser });
});

module.exports = router;
