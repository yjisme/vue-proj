//该模块实现电影和数据库之间的交互

var createConnection = require("./dbUtil")

//一次添加多个电影
exports.addMovies = async function (movies = []) {
    return new Promise((resolve, reject) => {
        var conn = createConnection(); //创建连接
        conn.connect(); //打开连接
        for (const movieObj of movies) {
            var sql = "insert into movie(`name`,`star`,`cover`,`types`, `update`, `doubanid`, `description`) values(?,?,?,?,?,?,?)";
            var params = [movieObj.name, movieObj.star, movieObj.cover, movieObj.types, movieObj.update, movieObj.doubanid, movieObj.description];//为占位符(sql参数)提供数据
            conn.query(sql, params); //执行sql语句
        }
        conn.end(err => {
            if (err) {
                reject(err)
            }
            else {
                resolve();
            }
        }); //关闭连接
    })
}

//分页查询电影数组
exports.getMovies = async function (page = 1, limit = 10) {
    return new Promise((resolve, reject) => {
        var conn = createConnection();
        conn.connect();
        var sql = "select * from movie order by `update` desc limit ?,?";
        var params = [(page - 1) * limit, +limit];
        conn.query(sql, params, (err, results) => {
            if (err) {
                reject(err)
            }
            else {
                resolve(results.map(movie => ({
                    ...movie,
                    update: new Date(movie.update).toLocaleDateString()
                })));
            }
        })
        conn.end();
    })
}

//查询电影总数
exports.countMovies = async function () {
    return new Promise((resolve, reject) => {
        var conn = createConnection();
        conn.connect();

        var sql = "select count(id) as val from movie";
        conn.query(sql, (err, results) => {
            if (err) {
                reject(err)
            }
            else {
                resolve(results[0].val);
            }
        })

        conn.end();
    })
}

//更新一部电影
exports.updateMovie = async function (id, movieObj) {
    return new Promise((resolve, reject) => {
        var conn = createConnection();
        conn.connect();

        var sql = "update movie set `name`=?,`star`=?,`cover`=?,`types`=?,`update`=?, `description`=? where `id`=?";
        var params = [movieObj.name, movieObj.star, movieObj.cover, movieObj.types, movieObj.update, movieObj.description, id];//为占位符(sql参数)提供数据
        conn.query(sql, params, err => {
            if (err) {
                reject(err)
            }
            else {
                resolve();
            }
        })

        conn.end();
    })
}

//根据id获取电影
exports.getMovie = async function (id) {
    return new Promise((resolve, reject) => {
        var conn = createConnection();
        conn.connect();

        var sql = "select * from movie where id=?";
        var params = [id]
        conn.query(sql, params, (err, results) => {
            if (err) {
                reject(err)
            }
            else {
                resolve(results.length === 0 ? null : results[0]);
            }
        })

        conn.end();
    })
}

//删除一部电影
exports.deleteMovie = async function (id) {
    return new Promise((resolve, reject) => {
        var conn = createConnection();
        conn.connect();
        var sql = "delete from movie where id=?";
        var params = [id]
        conn.query(sql, params, err => {
            if (err) {
                reject(err)
            }
            else {
                resolve();
            }
        })
        conn.end();
    })
}

//获取所有电影
exports.getAllMovies = async function () {
    return new Promise((resolve, reject) => {
        var conn = createConnection();
        conn.connect();
        var sql = "select * from movie";
        conn.query(sql, (err, results) => {
            if (err) {
                reject(err)
            }
            else {
                resolve(results.map(movie => ({
                    ...movie,
                    update: new Date(movie.update).toLocaleDateString()
                })));
            }
        })
        conn.end();
    })
}