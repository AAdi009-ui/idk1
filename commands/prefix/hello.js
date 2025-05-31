module.exports = {
    name: 'hello',
    description: 'Replies with a greeting',
    async execute(message, args) {
        await message.reply(`Hello ${message.author.username}!`);
    },
}; 