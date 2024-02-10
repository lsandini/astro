const UserService = require(`./user.service`);
const { userModel, cgmSimModel, cloudModel, Survey } = require(`./user.model`);

module.exports = {
  ...UserService(userModel, cgmSimModel, cloudModel),
  Survey,
};