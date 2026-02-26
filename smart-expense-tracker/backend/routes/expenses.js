
const express = require('express');
const router = express.Router();
const Expense = require('../models/Expense');
const auth = require('../middleware/auth');

router.get('/', auth, async (req, res) => {
  const expenses = await Expense.find({ user: req.user }).sort({ date: -1 });
  res.json(expenses);
});

router.post('/', auth, async (req, res) => {
  const { title, amount, category, date } = req.body;
  const expense = new Expense({ user: req.user, title, amount, category, date });
  await expense.save();
  res.json(expense);
});

router.delete('/:id', auth, async (req, res) => {
  await Expense.findByIdAndDelete(req.params.id);
  res.json({ msg: 'Removed' });
});

module.exports = router;
