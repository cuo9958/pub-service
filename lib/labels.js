const Sequelize = require("sequelize");
const db = require("../db/mysql");
const Op = Sequelize.Op;

const Labels = db.define(
    "fe_labels",
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        title: {
            type: Sequelize.STRING,
            defaultValue: "",
            comment: "标签名称"
        },
        attr_name: {
            type: Sequelize.STRING,
            defaultValue: "",
            comment: "属性名"
        },
        attr_val: {
            type: Sequelize.STRING,
            defaultValue: "",
            comment: "属性值"
        },
        attr_type: {
            type: Sequelize.STRING,
            defaultValue: "text",
            comment: "属性值类型"
        },
        nickname: {
            type: Sequelize.STRING,
            defaultValue: "",
            comment: "发布人"
        },
        status: {
            type: Sequelize.TINYINT,
            defaultValue: 0,
            comment: "状态"
        }
    },
    {
        freezeTableName: true
    }
);

//强制初始化数据库
// Labels.sync({ force: true });

module.exports = {
    insert: function(model) {
        return Labels.create(model);
    },
    get: function(id) {
        return Labels.findOne({
            where: { id }
        });
    },
    findByIds: function(ids) {
        let config = {
            where: {
                status: 1,
                id: {
                    [Op.in]: ids
                }
            },
            order: [["id", "desc"]]
        };
        return Labels.findAll(config);
    },
    getAll() {
        let config = {
            where: {
                status: 1
            },
            order: [["id", "desc"]]
        };
        return Labels.findAll(config);
    },
    getCount(limit = 1) {
        let config = {
            limit: 20,
            offset: (limit - 1) * 20,
            order: [["id", "desc"]]
        };
        return Labels.findAndCountAll(config);
    },
    use: function(id) {
        const model = {
            status: 1
        };
        return Labels.update(model, {
            where: {
                id
            }
        });
    },
    del: function(id) {
        const model = {
            status: 0
        };
        return Labels.update(model, {
            where: {
                id
            }
        });
    }
};
