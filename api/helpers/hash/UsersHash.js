const redis = require('redis');

class UserHash{
    constructor(){
        const redisClientOptions = {
            host:process.env.REDIS_URI,
            port:process.env.REDIS_PORT
        }
        this.client = redis.createClient(redisClientOptions)
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

module.exports = new UserHash();