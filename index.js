const Discord=require('discord.js')
const client=new Discord.Client()
const dotenv=require('dotenv').config()
client.commands=new Discord.Collection()
client.aliases=new Discord.Collection()
const fs=require('fs')
console.log(process.env['mongoPass'])
fs.readdir('./commands/',(err, files)=>{
	if(err) console.log(err)
	let jsfile=files.filter(f=>f.split('.').pop() === 'js')
	if(jsfile.length<=0){
		console.log('I searched high and low but no commands were found')
		return;
	}
	jsfile.forEach((f)=>{
		let props=require(`./commands/${f}`)
		console.log(`${f} was loaded successfuly`)
		client.commands.set(props.help.name,props)

		props.help.aliases.forEach(alias=>{
			client.aliases.set(alias,props.help.name)
		})

	})

})

const PREFIX=process.env.PREFIX;
client.on('message',async message=>{
	if(message.author.bot)
	return;
	if(!message.content.startsWith(`${PREFIX}`))
	return;
	let args=message.content.substring(PREFIX.length).split(' ')
	let cmd;
	let command;
	cmd=args[0].toLowerCase()
	if(client.commands.has(cmd)){
		command=client.commands.get(cmd)
	}else if(client.aliases.has(cmd)){
		command=client.commands.get(client.aliases.get(cmd))
	}
	try{
		command.run(client,message,args)
	}catch (e){
		return;
	}
})