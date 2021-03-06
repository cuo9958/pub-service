const Redis = require('ioredis');
const path = require("path");

process.env["NODE_CONFIG_DIR_C"] = path.join(__dirname, "../config/");
const config = require('node-my-config');

let cluster;
if (config.redisCluster && config.redisCluster.length > 0) {
    cluster = new Redis.Cluster(config.redisCluster, {
        redisOptions: {
            reconnectOnError: function (err) {
                console.log("redis集群连接失败", err);
                return false;
            }
        }
    });
    console.log("连接redis集群");

} else {
    cluster = new Redis(config.redis, {
        reconnectOnError: function (err) {
            console.log("redis连接失败", err);
            return false;
        }
    });
    console.log("连接redis");
}


module.exports = cluster;