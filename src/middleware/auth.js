import bcrypt from 'bcrypt';
import User from "../models/userModel.js";
import jwt from 'jsonwebtoken';

export const signup = async (req, res) => {
    try {
        const {userName, email, password } = req.body;
        const data = {
            userName,
            email,
            password: await bcrypt.hash(password, 10),
        };
        // save the user
        const user = await User.create(data);

        if (user) {
            let token = jwt.sign({ id: user.id }, process.env.SECRET_KEY, {
                expiresIn: 1 * 24 * 60 * 60 * 1000,
            });

            res.cookie("jwt", token, { maxAge: 1 * 24 * 60 * 60, httpOnly: true });

            // send user details
            return res.status(201).send(user);
        } else {
            return res.status(409).send("Details are not correct");
        }
    } catch (error) {
        console.log(error);
    }
};


export const saveUser = async (req, res, next) => {
    // search the db to see if user exist
    try {
        const userName = await User.findOne({
            where: {
                userName: req.body.userName,
            },
        });

        // respond if username exist in db
        if (userName) {
            return res.json(409).send("username already taken");
        }

        // check if email already exist
        const emailCheck = await User.findOne({
            where: {
                email: req.body.email,
            },
        });

        // respond if email exist in the db
        if (emailCheck) {
            return res.json(409).send("Authentiction failed");
        }

        next();
    } catch (error) {
        console.log(error);
    }
};

