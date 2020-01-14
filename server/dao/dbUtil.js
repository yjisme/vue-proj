var mysql = require("mysql")

/**
 * 用户获取一个连接对象
 */
module.exports = function () {
    return mysql.createConnection({ //连接的配置
        host: "127.0.0.1", //连接到本机
        port: "3306", //mysql的监听端口
        user: "root", //数据库访问账号
        password: "ybybdwyj42", //数据库访问密码
        database: "moviedb" //访问的数据库
    });
}