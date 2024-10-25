const User = require('../models/user.model');
const Bank = require('../models/bank.model');


const getUsers = async(req,res)=>{

    try {
       
        const users = await User.find({}, { _id: 1, username: 1 }); // to get the id and username of all users

        if (users.length === 0) { 
            return res.status(404).json({ message: "Not found" }); 
        }

        return res.status(200).json(users);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}


const getUserBanks = async (req, res) => {
    try {
        const { id } = req.params; // Extract user ID from request parameters
        const banks = await Bank.find({ user: id }); // Find all banks associated with the user ID

        if (banks.length === 0) {
            return res.status(404).json({ message: "No banks found for this user." }); // Handle case where no banks are found
        }

        // Send the list of banks back to the client
        return res.status(200).json(banks); // Respond with a success status and the banks data
    } catch (error) {
        console.error("Error fetching user banks:", error);
        return res.status(500).json({ message: "Internal server error." });
    }
};

module.exports = {getUsers,getUserBanks};
