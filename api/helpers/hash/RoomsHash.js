const redisHelper = require('../database/RedisClient');
const shortid = require('shortid');

class RoomsHash{
    constructor(){
        this.client = redisHelper.getClient();
    }
    upsert(roomName){
        const id = "@Room:"+shortid.generate();
        this.client.hset(
            'rooms',
            id,
            JSON.stringify({
                id,
                roomName,
                when:Date.now()
            }),
            err => {
                if(err){
                    console.error(err);
                }
            }
        )
    }
    disconnect(){
        
    }
    list(callback){
        let roomList = [];
        this.client.hgetall('rooms',(err,rooms) => {
            if(err){
                console.error(err);
                return callback([]);
            }
            for(let room in rooms){
                roomList.push(JSON.parse(rooms[room]));
            }
            return callback(roomList);
        })
    }
}

module.exports = new RoomsHash();