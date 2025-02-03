import { User } from "../models/User.js"

//register
const register = async (req, res) => {
    const {username, password} = req.body;

    try {
        const newUser = new User ({username, password})
        await newUser.save();
        res.status(201).json({message : 'succeed register'})
    } catch (error) {
        res.status(400).json({message : error.message})
    }
}

//login
const login = async (req, res) => {
    const {username, password} = req.body;

    try {
        const user = await User.findOne({username, password})
        if (!user) {
            return res.status(400).json({message : 'invalid'})
        }
        res.status(200).json({message : 'succeed login', user})
    } catch (error) {
        res.status(500).json({message : error.message})
    }
}

const getUser = async (req, res) => {
  try {
    const user = await User.find();
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Error fetching users" });
  }
};
const getUserById = async (req, res) => {
  try {
    const usergetid = await User.findById(req.params.id);
    res.status(200).json(usergetid);
  } catch (error) {
    res.status(500).json({ message: "Error fetching users" });
  }
}

export default {
    register,
    login,
    getUser,
    getUserById
}