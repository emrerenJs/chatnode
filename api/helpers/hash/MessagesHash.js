const redisHelper = require('../database/RedisClient');
const shortid = require('shortid');

class MessagesHash{
    constructor(){
        this.client = redisHelper.getClient();
    }
    upsert({room,message,user}){
        this.client.hset(
            'messages:'+room.id,
            shortid.generate(),
            JSON.stringify({
                message,
                user,
                when:Date.now()
            }),
            err => {
                if(err){
                    console.error(err);
                }
            }
        )
    }
}

module.exports = new MessagesHash();