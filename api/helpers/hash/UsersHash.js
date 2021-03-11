const redisHelper = require('../database/RedisClient');

class UsersHash{
    constructor(){
        this.client = redisHelper.getClient();
    }
    upsert(connectionId, meta){
        this.client.hset(
            'online',
            meta.googleId,
            JSON.stringify({
                connectionId,
                meta,
                when:Date.now()
            }),
            err => {
                if(err){
                    console.error(err);
                }
            }
        )
    }
    disconnect(googleId){
        this.client.hdel(
            'online',
            googleId,
            err => {
                if(err)
                    console.error(err);
            }
        )
    }
    list(callback){
        let active = [];
        this.client.hgetall('online',(err,users) => {
            if(err){
                console.error(err);
                return callback([]);
            }
            for(let user in users){
                active.push(JSON.parse(users[user]));
            }
            return callback(active);
        })
    }
}

module.exports = new UsersHash();