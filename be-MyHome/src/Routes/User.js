const express = require("express");
const userSchema = require("../Models/user");

const router = express.Router();

//create user
router.post("/Users", (req, res) => {
    const user = userSchema(req.body);
    user
        .save()
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
});

//get all user
router.get("/Users", (req, res) => {
    userSchema
        .find()
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
});

//get a user
router.get("/Users/:id", (req, res) => {
    const { id } = req.params;
    userSchema
        .findById(id)
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
});

//update a user
router.put("/Users/:id", (req, res) => {
    const { id } = req.params;
    const {userName, email, visibleEmail, password} = req.body;
    userSchema
        .updateOne({ _id: id }, {$set: {userName, email, visibleEmail, password}})
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
});

//delete a user
router.delete("/Users/:id", (req, res) => {
    const { id } = req.params;
    userSchema
        .deleteOne({ _id: id })
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
});


module.exports = router;