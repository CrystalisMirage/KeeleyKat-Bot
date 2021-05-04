const mongoose=require('mongoose')
const dotenv=require('dotenv').config()
const mySecret = process.env['mongoPass']

mongoose.connect(mySecret,{
	useNewUrlParser:true,
	useUnifiedTopology:true
});
const Data=require('../models/account.js')
module.exports.run=async function(client,message,args){
	if(!args[1]){
		var user=message.author;
	}else{
		var user=message.mentions.users.first()||client.users.cahce.get(args[1])
	}

	Data.findOne({
		userID:user.id
	},(err,data)=>{
		if(err) console.log(err)
		if(!data){
			const newData=new Data({
				name:user.username,
				userID:user.id,
				lb:"all",
				money:0,
				daily:0
			})
			newData.save().catch(err=>console.log(err))
			return message.channel.send(`${user.username} has $0 in their account`);
		}else{
			return message.channel.send(`${user.username} has $${data.money} in their account`);
		}
	})

}
module.exports.help={
	name:'balance',
	aliases:['bal','money']
}