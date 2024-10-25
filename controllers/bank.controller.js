const Bank = require('../models/bank.model');

// Add Bank Account
exports.addBankAccount = async (req, res) => {
    const { bank, holder,branch, accountno, ifsc } = req.body;
    try {
        const newAccount = await Bank.create({
            user: req.user.id,
            bank,
            holder,
            accountno,
            ifsc,
            branch
        });
        res.status(201).json(newAccount);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Get Bank Accounts
exports.getBankAccounts = async (req, res) => {
    try {
        const accounts = await Bank.find({ user: req.user.id });
        res.json(accounts);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Edit Bank Account
exports.editBankAccount = async (req, res) => {
    const { id } = req.params;
    const updates = req.body;

    try {
        const account = await Bank.findOneAndUpdate({ _id: id, user: req.user.id }, updates, { new: true });
        if (!account) return res.status(404).json({ message: 'Account not found' });
        res.json(account);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Delete Bank Account
exports.deleteBankAccount = async (req, res) => {
    const { id } = req.params;
    try {
        const account = await Bank.findOneAndDelete({ _id: id, user: req.user.id });
        if (!account) return res.status(404).json({ message: 'Account not found' });
        res.json({ message: 'Account deleted' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.getDetails = async(req,res) =>{
    const{id} = req.params;
    try{
        const account = await Bank.findOne({_id:id,user:req.user.id});
        if (!account) return res.status(404).json({ message: 'Account not found' });
        res.status(200).json(account);
    }
    catch(error){
        res.status(404).json({error: error.message});
    }
}
