const Balance = require("../../schemas/balance");
const { Types } = require("mongoose");

module.exports = (client) => {
  client.fetchBalance = async (userId, guildId) => {
    let storedBalance = await Balance.findOne({
      userId: userId,
      guildId: guildId,
    });

    if (!storedBalance) {
      storedBalance = new Balance({
        _id: Types.ObjectId(),
        userId: userId,
        guildId: guildId
      });

      await storedBalance
        .save()
        .then(async (balance) => {
          console.log(
            `[Balance Created]: UserID: ${balance.userId}, GuildID: ${balance.guildId}`
          );
        })
        .catch(console.error);
      return storedBalance;
    } else return storedBalance;
  };
};
