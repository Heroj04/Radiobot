const fs = require(`fs`);
const ytdl = require('ytdl-core');

var queue = {};

module.exports = {
	moduleOptions: {
		name: `SoundBoard`,
		description: `Play sound bites on command`,
		author: `Heroj04`,
		version: `1.0.0`,
	},
	commands: [
		{
			name: `addSound`,
			aliases: [`+sound`, `newsound`],
			help: `Add a new sound to the soundboard`,
			Usage: `AddSound <Name> <YTLink>`,
			owner: true,
			func: args => {
				if (args.args.length === 2) {
					fs.readdir(args.library, (e, files) => {
						if (e) {
							args.log(`Issue reading soundboard library: ${e}`, 40);
							args.msg.channel.send(`Error reading soundboard library.`);
							return;
						}
						if (files.includes(args.args[0].toLowerCase())) {
							return args.msg.channel.send(`A sound clip already exists with that name.`);
						}
						ytdl.getInfo(args.args[1], (err, info) => {
							if (err) {
								return args.log(`Issue getting metadata: ${err}`, 40);
							}
							if (info.length_seconds > 30) {
								return args.msg.channel.send(`Video too long to use on soundboard (Must be less than 30 seconds)`);
							}
							let download = ytdl.downloadFromInfo(info, { filter: `audioonly` });
							download.pipe(fs.createWriteStream(`${args.library}/${args.args[0].toLowerCase()}.temp`));
							download.on(`end`, () => {
								fs.rename(`${args.library}/${args.args[0].toLowerCase()}.temp`, `${args.library}/${args.args[0].toLowerCase()}`, error => {
									if (error) {
										args.log(`Issue saving file: ${error}`, 40);
									} else {
										args.msg.channel.send(`Soundclip added to library`);
									}
								});
							});
							download.on(`error`, error => {
								fs.unlink(`${args.library}/${args.args[0].toLowerCase()}.temp`, ex => {
									if (ex) {
										args.log(`Issue deleting temp file: ${ex}`, 40);
									}
								});
								args.log(`Issue downloading video: ${error}`, 40);
								args.msg.channel.send(`There was an error downloading that clip`);
							});
						});
					});
				} else {
					args.msg.channel.send(`Incorrect syntax, refer to 'help addsound' for more info.`);
				}
			},
		},
		{
			name: `playsound`,
			aliases: [`sound`, `play`, 'sb'],
			help: `Plays a sound bite in your channel`,
			usage: `PlaySound <soundName>`,
			func: args => {
				if (args.args.length > 0) {
					fs.readdir(args.library, (err, files) => {
						if (err) {
							args.log(`Issue reading soundboard library: ${err}`, 40);
						}
					});
				} else {
					args.msg.channel.send(`Please specify a sound I should play.`);
				}
			},
		},
	],
};