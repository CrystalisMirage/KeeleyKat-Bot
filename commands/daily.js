const Discord=require('discord.js')
const mongoose=require('mongoose')
const Data=require('../models/account.js')
const ms=require('parse-large-ms')
console.log(ms(5000))
module.exports.run=async function(client,message,args) {
	let timeout=86400000;0
	let reward=100;
	let embed=new Discord.MessageEmbed()
	.setTitle('Daily Reward!!')
	Data.findOne({
		userID:message.author.id
	},(err,data)=>{
		if(err) console.log(err)
		if(!data){
			const newData=new Data({
				name:message.author.username,
				userID:message.author.id,
				lb:"all",
				money:reward,
				daily:Date.now()
			})
			newData.save().catch(err=>console.log(err))
			embed.setDescription(`You have claimed your daily reward of ${reward}. Your current balance is now ${newData.money}.`)
		embed.setColor('WHITE')
		message.channel.send(embed)
		}else{
			if(timeout-(Date.now()-data.daily)>0) {
			let time=ms(timeout-(Date.now()-data.daily))
			embed.setColor('RED')
			embed.setDescription('**You already claimed your daily reward!!**')
			embed.addField('You can claim again in',`**${time.hours} hours  ${time.minutes} minutes and ${time.seconds} seconds**`)
			return message.channel.send(embed);
		}else{
			data.money+=reward;
			data.daily=Date.now();
			data.save().catch(err=>console.log(err))
			embed.setDescription(`You have claimed your daily reward of ${reward}. Your current balance is now ${data.money}.`)
		embed.setColor('WHITE')
		message.channel.send(embed)
		}

		}
			})
	
}
module.exports.help={
	name:'daily',
	aliases:[]
}