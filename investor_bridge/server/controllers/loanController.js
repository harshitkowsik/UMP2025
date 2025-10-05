const Loan = require('../models/Loan');

exports.createLoan = async (req, res) => {
  try {
    const { bankName, loanAmount, interestRate, loanTerm, description } = req.body;
    const loan = await Loan.create({
      bankName,
      loanAmount,
      interestRate,
      loanTerm,
      description,
      postedBy: req.user.id
    });
    res.status(201).json(loan);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

exports.getAllLoans = async (req, res) => {
  try {
    const loans = await Loan.find().populate('postedBy', 'name');
    res.json(loans);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};
