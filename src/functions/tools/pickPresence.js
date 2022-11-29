const { ActivityType } = require("discord.js");

module.exports = (client) => {
  client.pickPresence = async () => {
    const options = [
      {
        type: ActivityType.Watching,
        text: "Over NG",
        status: "idle",
      },
      {
        type: ActivityType.Playing,
        text: "Over NG",
        status: "online",
      },
      {
        type: ActivityType.Streaming,
        text: "Over NG",
        status: "dnd",
      },
    ];

    const option = Math.floor(Math.random() * options.length);

    await client.user.setPresence({
      activities: [
        {
          name: options[option].text,
          type: options[option].type,
        },
      ],
      status: options[option].status,
    }).catch(error);
  };
};
