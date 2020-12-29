const d=new (require('discord.js')).Client(),
cf=require('./config.json');
d.cs=new (require('discord.js')).Collection();
(require('fs')).readdir('./commands/',(e,c)=>{
    if(e)return console.log('err loading');
    c.forEach(c=> d.cs.set(c.split('.')[0], require(`./commands/${c}`)));
});
d.on('ready',()=> console.log('ready'))
    .on('message',m=>{
        const a=m.content.slice(cf.p.length).trim().split(/ +/g),
        cm=d.cs.get(a.shift().toLowerCase());
        if(m.author.bot||!m.content.indexOf(cf.p)===0||!cm)return;
        cm.r(m, a);
    });
d.login(cf.t);
