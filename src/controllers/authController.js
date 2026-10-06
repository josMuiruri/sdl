import User from "../models/userModel.js";
import jwt from 'jsonwebtoken';
import { Op } from "sequelize";

export const signup = async (req, res) => {
    try {
        const { userName, email, password, passwordConfirm } = req.body;

        // validate
        if (!userName || !password || (!email)) {
            return res.status(400).json({
                status: "fail",
                message: "Username, password and either email are required."
            });
        }

        if (password !== passwordConfirm) {
            return res.status(400).json({
                status: 'fail',
                message: 'Password do not match'
            })
        }

        const orConditions = [
            { userName }
        ];

        if (email) {
            orConditions.push({ email });
        }

        // if (phone) {
        //     orConditions.push({ phone });
        // }

        const existingUser = await User.findOne({
            where: {
                [Op.or]: orConditions
            }
        });

        if (existingUser) {
            if (existingUser.userName === userName) {
                return res.status(409).json({
                    status: "fail",
                    message: "Username already taken."
                });
            }

            if (email && existingUser.email === email) {
                return res.status(409).json({
                    status: "fail",
                    message: "Email already registered."
                });
            }

            // if (phone && existingUser.phone === phone) {
            //     return res.status(409).json({
            //         status: "fail",
            //         message: "Phone number already registered."
            //     });
            // }
        }

        const user = await User.create({
            userName,
            email: email || null,
            // phone: phone || null,
            password
        });

        const token = jwt.sign(
            { id: user.id },
            process.env.JWT_SECRET_KEY,
            {
                expiresIn: process.env.JWT_EXPIRES_IN,
            }
        );

        res.cookie('jwt', token, {
            maxAge: 24 * 60 * 60 * 1000,
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict'
        });

        return res.status(201).json({
            status: "success",
            data: {
                user: {
                    id: user.id,
                    userName: user.userName,
                    email: user.email,
                    // phone: user.phone
                }
            }
        });

    } catch (error) {
        console.error("Signup Error:", error);

        return res.status(500).json({
            status: "fail",
            message: "Something went wrong."
        });
    }
};

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                status: 'fail',
                message: 'Email and password are required.',
            });
        }

        const orConditions = [];

        if (email) {
            orConditions.push({ email });
        }

        // if (phone) {
        //     orConditions.push({ phone });
        // }

        // find a user by their email
         const user = await User.findOne({
            where: {
                [Op.or]: orConditions
            },
        });

        if (!user) {
            return res.status(401).json({
                status: 'fail',
                message: 'Invalid email or password.',
            });
        }

        const passwordIsCorrect = await user.comparePassword(password);

        if (!passwordIsCorrect) {
            return res.status(401).json({
                status: 'fail',
                message: 'Invalid email or password.',
            });
        }

        const token = jwt.sign(
            { id: user.id},
            process.env.JWT_SECRET_KEY,
            {
                expiresIn: process.env.JWT_EXPIRES_IN,
            }
        );

        res.cookie('jwt', token, {
            maxAge: 24 * 60 * 60 * 1000,
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
        });
            
        return res.status(200).json({
            status: 'success',
            data: {
                user: {
                    id: user.id,
                    userName: user.userName,
                    email: user.email,
                    // phone: user.phone,
                },
            },
        });
    
    } catch (error) {
        console.error(error);

        return res.status(500).json({
            status: 'fail',
            message: 'something went wrong',
        });
    }
};