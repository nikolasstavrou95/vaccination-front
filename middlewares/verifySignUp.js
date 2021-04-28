const db = require("../models");

const Hospital = db.hospital;

checkDuplicateUsernameOrEmail = (req, res, next) => {
    // Username
    Hospital.findOne({
        name: req.body.name
    }).exec((err, hospital) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }

        if (hospital) {
            res.status(400).send({ message: "Failed! Hospital Name is already in use!" });
            return;
        }

        // Email
        Hospital.findOne({
            email: req.body.email
        }).exec((err, hospital) => {
            if (err) {
                res.status(500).send({ message: err });
                return;
            }

            if (hospital) {
                res.status(400).send({ message: "Failed! Email is already in use!" });
                return;
            }

            next();
        });
    });
};



const verifySignUp = {
    checkDuplicateUsernameOrEmail,

};

module.exports = verifySignUp;