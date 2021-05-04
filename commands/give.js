const mongoose=require('mongoose')
const Data=require('../models/account.js')
module.exports.run=async(client,message,args)=>{
	let user=message.mentions.users.first()||client.users.cache.get(args[1]);
	if(!user) return message.channel.send('You have not mentioned a user to give money to!');
	if(user.id===message.author.id)return message.channel.send('You can not give money to your self!');
	let monie=Number(args[2])
	if(!monie) return message.channel.send('Please specify a valid amount to give');
	if(monie < 1) return message.channel.send('That amount is too low to give someone!');
	Data.findOne({
		userID:message.author.id
	},async (err,authorData)=>{
		if(err) console.log(err)
		if(!authorData){
			return message.channel.send('You have no money to give!');
		}else{
			if(authorData.money<=0||authorData.money<monie)
			return message.channel.send('You can not give out more money than you have, and you have to have more than $0 to give out money!');
			Data.findOne({
				userID:user.id
			},async (err, data)=>{
				if(err) console.log(err)
				if(!data){
					data=new Data({
						name:user.username,
						userID:user.id,
						lb:'all',
						money:monie,
						daily:0
					})
				}else{
					data.money+=monie;
					authorData.money-=monie;
					data.save()
					authorData.save()
				}
			})
		}
			})
		

	return message.channel.send(`${message.member.displayName} has given ${user.username} $${monie}!`);
}

module.exports.help={
	name:'give',
	aliases:['lend']
}