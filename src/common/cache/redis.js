
import Redis from "ioredis";
import {config} from "../../config/config.js";

const client = new Redis(config.redisUrl);

client.on('error',() => {
    console.log('Redis connection error');
})

export function set (key, value ,ttl){
  return  client.set(key, value , "EX",ttl);
}

export function get (key){
   return  client.get(key);
}

export function del (key){
    return client.del(key);
}
