module.exports = {
	moduleOption: {
		name: `General`,
		description: `A module featuring basic bot commands`,
		author: `Heroj04`,
		version: `1.0.0`,
	},
	commands: [
		{
			name: `help`,
			aliases: [`halp`, `?`],
			help: `Displays help information for commands and modules.`,
			usage: 'Help [command or module]',
			dm: true,
			func: (args) => {
				let compMsg = `--- Available Commands ---`;
				args.modules.forEach(module => {
					compMsg += `\n\n~${module.name}~\n${module.description}`;
					module.commands.forEach(command => {
						compMsg += `\n - ${command.name}`;
					});
				});
				args.msg.author.send(compMsg);
			},
		},
		{
			name: `about`,
			aliases: [`info`],
			help: `Displays information about the bot`,
			dm: true,
			func: (args) => {
				args.msg.author.send(`I am Radiobot, a Discord bot built by Heroj04 (@jackrfootner).\nMy Source code is available at www.github.com/Heroj04/Radiobot`);
			},
		},
		{
			name: `eval`,
			aliases: [`evaluate`, `parse`, `js`, `script`],
			help: `Executes provided scripts as the bot`,
			usage: `Eval <script>`,
			dm: true,
			owner: true,
			func: (args) => {
				try {
					let complete = eval(args.args);
					args.msg.channel.send(`Script completed, returned: ${complete}`);
				} catch (e) {
					args.msg.channel.send(`Script failed, error: ${e}`);
				}
			},
		},
		{
			name: `listids`,
			aliases: [`ids`],
			help: `Lists the IDs of users and channels in this guild.`,
			func: (args) => {
				let compMsg = `Guild ID: ${args.msg.guild.id}`;
				let textChannels = args.msg.guild.filter((channel, index, array) => channel.type === `text`);
				let voiceChannels = args.msg.guild.filter((channel, index, array) => channel.type === `voice`);
				compMsg += `\n\n~Text Channels~`;
				textChannels.forEach(channel => {
					compMsg += `\n${channel.name} ID: ${channel.id}`;
				});
				compMsg += `\n\n~Voice Channels~`;
				voiceChannels.forEach(channel => {
					compMsg += `\n${channel.name} ID: ${channel.id}`;
				});
				args.author.send(compMsg);
			},
		},
	],
};
