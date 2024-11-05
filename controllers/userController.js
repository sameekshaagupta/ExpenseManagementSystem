const userModel = require('../models/userModel')


const loginController = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await userModel.findOne({ email });

        if (!user) {
            return res.status(404).send("User Not Found");
        }

        if (user.password !== password) {
            return res.status(401).send("Invalid credentials");
        }

        res.status(200).json({
            success: true,
            user,
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            error: error.message,
        });
    }
};
//register calllback
const registerController = async (req,res) => {
    try {
        const newUser = new userModel(req.body)
        await newUser.save()
        res.send(201).json({
            success: true,
            newUser
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            error:error.message
        })
    }
}
module.exports = { loginController, registerController }