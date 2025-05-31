const fs = require('fs');
const path = require('path');
const { REST, Routes } = require('discord.js');

module.exports = (client) => {
    const commandsPath = path.join(__dirname, '..', 'commands');
    const commandFolders = fs.readdirSync(commandsPath);

    for (const folder of commandFolders) {
        const folderPath = path.join(commandsPath, folder);
        const commandFiles = fs.readdirSync(folderPath).filter(file => file.endsWith('.js'));
        
        for (const file of commandFiles) {
            const filePath = path.join(folderPath, file);
            const command = require(filePath);
            
            if ('data' in command && 'execute' in command) {
                client.commands.set(command.data.name, command);
            }
        }
    }

    const rest = new REST().setToken(client.token);

    (async () => {
        try {
            const commands = [];
            for (const command of client.commands.values()) {
                commands.push(command.data.toJSON());
            }

            await rest.put(
                Routes.applicationCommands(client.user.id),
                { body: commands },
            );
        } catch (error) {
            console.error(error);
        }
    })();
}; 