import User from "./../models/userModel.js"

export const createUser = async (req, res) => {
    try {
        const newUser = await User.create(req.body);
        
        res.status(201).json({
            status: 'success',
            data: {
                user: newUser
            }
        })
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err.message })
    }
}

export const getAllUsers = async (req, res) => {
    try {

        const users = await User.findAll();
        res.status(200).json({
            status: 'success',
            results: users.length,
            data: {
                users
            }
        })
    } catch (err) {
        res.status(404).json({
            status: 'fail',
            message: err
        })
    }  
}

export const getUser = async (req, res) => {

    try {

        const user = await User.findByPk(req.params.id);

        if (!user)
            return res.status(404).json({});

        res.status(200).json({
            status: 'success',
            data: {
                user
            }
        });

    } catch (err) {
        res.status(404).json({
            status: 'fail',
            message: err
        });
    }
};