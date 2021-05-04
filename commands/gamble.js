const mongoose=require('mongoose')
const Data=require('../models/account.js')
module.exports.run=async(client,message,args)=>{
	let param=message.content.substring(oop.length).split(' ')
	let hrt=param[1];
	let maxBet=Infinity;
	let bet=Number(param[2]);
	const choices=['heads','tails']
	if(!hrt) return message.channel.send('Please pick either head or tails');
	if(!bet) return message.channel.send('You did not specify a valid amount to gamble with!');
	if(!choices.includes(hrt)) return message.channel.send('That is not a valid side!\nPlease pick either head or tails.');
Data.findOne({
		userID:message.author.id
	},(err,data)=>{
		if(!data || data.money <= 0) return message.channel.send('You have not money to gamble with!');	
		if(bet !== Math.floor(bet)) return message.channel.send('You can not use decimals!');
	if(bet > data.money) return message.channel.send('You can not bet more than you have!');
	if(bet > maxBet) return message.channel.send(`You can not bet more than $${maxBet.toLocaleString()}`);

	let chances=['win','lose']
	let pick=chances[Math.floor(Math.random()*chances.length)]
	if(pick==='win'){
		message.channel.send(`You won! It was ${hrt}, $${bet} has been added to your balance!`)
		data.money+=bet;
		data.save().catch(err=>console.log(err))
	}else{
		message.channel.send(`Aww man, you lost! It wasn't ${hrt}. $${bet} has been deducted from your balance!`)
		data.money-=bet;
		data.save().catch(err=>console.log(err))
	}
	})

}
module.exports.help={
	name:'bet',
	aliases:['gamble']
}