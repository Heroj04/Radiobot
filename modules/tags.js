const fs = require(`fs`);

module.exports = {
	moduleOptions: {
		name: `Tagging`,
		description: `Tag messages to recall later`,
		author: `Heroj04`,
		version: `1.0.0`,
	},
	startup: args => {
		fs.readdir(args.library, (err, files) => {
			if (err) {
				throw err;
			}
			let guilds = args.bot.guilds.array();
			for (var i = 0; i < guilds.length; i++) {
				let stats;
				try {
					stats = fs.statSync(`${args.library}/${guilds[i].id}.json`);
					if (!stats.isFile()) {
						throw new Error(`Not a file`);
					}
				} catch (e) {
					if (e.code === `ENOENT`) {
						fs.writeFileSync(`${args.library}/g${guilds[i].id}.json`, `{}`);
					}
				}
			}
		});
	},
	commands: [
		{
			name: `addtag`,
			aliases: [`newtag`, `tagthis`, `tagas`],
			help: `Creates a new tag.`,
			func: (args) => {
				args.msg.channel.send(`tagstuff`);
			},
		},
	],
};
