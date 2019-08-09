const Sequelize = require("sequelize");
const db = require("../db/mysql");
const Op = Sequelize.Op;

const Bundle = db.define(
    "fe_bundle",
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        version: {
            type: Sequelize.INTEGER,
            defaultValue: 900,
            comment: "版本号"
        },
        platform: {
            type: Sequelize.STRING,
            defaultValue: "",
            comment: "平台"
        },
        sign: {
            type: Sequelize.STRING,
            defaultValue: "",
            comment: "bundle的签名"
        },
        link: {
            type: Sequelize.STRING,
            defaultValue: "",
            comment: "bundle地址"
        },
        bundleCompressUrl: {
            type: Sequelize.STRING,
            defaultValue: "",
            comment: "bundle压缩地址"
        },
        nickname: {
            type: Sequelize.STRING,
            defaultValue: "",
            comment: "发布人"
        },
        labels: {
            type: Sequelize.STRING,
            comment: "标签"
        },
        labelData: {
            type: Sequelize.TEXT,
            comment: "标签具体的字段"
        },
        brand: {
            type: Sequelize.STRING,
            defaultValue: "",
            comment: "品牌"
        },
        perce: {
            type: Sequelize.TINYINT,
            defaultValue: 0,
            comment: "占比"
        },
        remark: {
            type: Sequelize.STRING,
            defaultValue: "",
            comment: "shu说明"
        },
        client_id: {
            type: Sequelize.TEXT,
            defaultValue: "",
            comment: "白名单"
        },
        pub_type: {
            type: Sequelize.TINYINT,
            defaultValue: 0,
            comment: "发布类型"
        },
        status: {
            type: Sequelize.TINYINT,
            defaultValue: 0,
            comment: "状态;9:删除，0:编辑;1:发布"
        }
    },
    {
        freezeTableName: true
        // indexes: [
        //     {
        //         unique: true,
        //         fields: ["code"]
        //     }
        // ]
    }
);

//强制初始化数据库
// Bundle.sync({ force: true });

module.exports = {
    insert: function(model) {
        return Bundle.create(model);
    },
    get: function(id) {
        return Bundle.findOne({
            where: {
                id
            }
        });
    },
    findVersionPlatform(model) {
        return Bundle.findAll({
            where: {
                version: {
                    [Op.lte]: model.version
                },
                platform: model.platform,
                status: 1
            },
            attributes: [
                "sign",
                "link",
                "perce",
                "labels",
                "labelData",
                "brand",
                "bundleCompressUrl",
                "client_id",
                "pub_type"
            ],
            order: [["version", "desc"], ["id", "desc"]]
        });
    },
    getCount(limit = 1, opts = {}) {
        let config = {
            limit: 20,
            offset: (limit - 1) * 20,
            attributes: [
                "id",
                "version",
                "platform",
                "sign",
                "link",
                "nickname",
                "perce",
                "bundleCompressUrl",
                "pub_type",
                "remark",
                "status",
                "createdAt"
            ],
            order: [["version", "desc"], ["id", "desc"]]
        };
        config.where = Object.assign(
            {
                status: {
                    [Op.not]: 9
                }
            },
            opts
        );
        return Bundle.findAndCountAll(config);
    },
    unUse: function(id) {
        const model = {
            status: 0
        };
        return Bundle.update(model, {
            where: {
                id
            }
        });
    },
    use: function(id) {
        const model = {
            status: 1
        };
        return Bundle.update(model, {
            where: {
                id
            }
        });
    },
    del: function(id) {
        const model = {
            status: 9
        };
        return Bundle.update(model, {
            where: {
                id
            }
        });
    }
};
