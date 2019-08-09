# pub-service
热更新提供的数据库服务

> @dal/config 是自定义的config库，为了单独区分service用到的配置和server用到的配置
> node-precommit 是自定义的git钩子，为了保持版本能够自动升级

### 数据源

#### mysql
支持读写分离，目前配置中没有做类似的配置，需要手动修改，具体可以参考`sequelize`的文档。

#### redis

1. redis支持2种模式。默认使用`redis`字段的配置，可以直连或者proxy。
2. 配置`redisCluster`字段，支持集群模式。
3. 使用redis.js导出的方法可以直接使用redis库操作方法。
4. 使用redis_pub.js导出的方法可以使用订阅发布模式。