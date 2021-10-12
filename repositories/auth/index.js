const gravatar = require('gravatar');

const { User } = require('../../models');

const findByEmail = async email => await User.findOne({ email });

const findByToken = async token => await User.findOne({ token });

const create = async (email, password) => {
  const newUser = new User({ email });
  newUser.setPassword(password);
  newUser.avatarURL = gravatar.url(email, { protocol: 'http' });
  return await newUser.save();
};

const updateToken = async (_id, token) =>
  await User.findByIdAndUpdate(_id, { token }, { new: true });

const updateBalance = async (_id, balance) =>
  await User.findByIdAndUpdate(_id, { balance }, { new: true });

const updateIncome = async (_id, incomes) =>
  await User.findByIdAndUpdate(_id, { incomes }, { new: true });

const updateExpense = async (_id, expense) =>
  await User.findByIdAndUpdate(_id, { expense }, { new: true });

const removeAccessToken = async _id =>
  await User.findByIdAndUpdate(_id, { token: null });

const getCurrentUser = async token =>
  await User.findOne({
    token,
  });

module.exports = {
  findByEmail,
  create,
  updateToken,
  removeAccessToken,
  findByToken,
  updateBalance,
  getCurrentUser,
  updateIncome,
  updateExpense,
};
