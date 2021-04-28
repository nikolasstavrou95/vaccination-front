const config = require("../config/auth.config");
const db = require("../models");
const Hospital = db.hospital;


var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");


exports.signup = (req, res) => {
    const hospital = new Hospital({
        name: req.body.name,
        address: req.body.address,
        phone: req.body.phone,
        doses: req.body.doses,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 8)
    });

    hospital.save((err, hospital) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }

        hospital.save(err => {
            if (err) {
                res.status(500).send({ message: err });
                return;
            }

            res.send({ message: "Hospital was registered successfully!" });
        });

    })
};
exports.signin = (req, res) => {
    Hospital.findOne({
        email: req.body.email
    })
        .exec((err, hospital) => {
            if (err) {
                res.status(500).send({ message: err });
                return;
            }

            if (!hospital) {
                return res.status(404).send({ message: "Hospital Not found." });
            }

            var passwordIsValid = bcrypt.compareSync(
                req.body.password,
                hospital.password
            );

            if (!passwordIsValid) {
                return res.status(401).send({
                    accessToken: null,
                    message: "Invalid Password!"
                });
            }

            var token = jwt.sign({ id: hospital.id }, config.secret, {
                expiresIn: 86400 // 24 hours
            });




            res.status(200).send({
                id: hospital._id,
                name: hospital.name,
                address: hospital.address,
                phone: hospital.phone,
                doses: hospital.doses,
                email: hospital.email,

                accessToken: token
            });
        });
};

