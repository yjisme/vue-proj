var movieDao = require("../dao/movieDao")

//改模块实现对电影的业务逻辑

//添加单部电影
exports.addMovie = async function (movieObj = {}) {
    movieObj.doubanid = "";
    //验证对象，略
    await movieDao.addMovies([movieObj]);
}

//修改电影
exports.updateMovie = async function (id, movieObj) {
    var oldMovie = await movieDao.getMovie(id); //获取原来的电影对象
    delete movieObj.id; //id是不能修改的
    //验证movieObj，略
    var newMovie = {
        ...oldMovie,
        ...movieObj //混入新的数据
    }
    await movieDao.updateMovie(id, newMovie);
}

//分页获取电影
exports.getMovies = async function (page = 1, limit = 10) {
    //开启两个Promise，同时获取电影数据和总数
    var results = await Promise.all([movieDao.getMovies(page, limit), movieDao.countMovies()])
    return { //封装返回的对象
        datas: results[0],
        total: results[1]
    }
}

//删除电影
exports.deleteMovie = async function (id) {
    await movieDao.deleteMovie(id);
}

//获取单部电影
exports.getMovie = async function(id){
    var obj = await movieDao.getMovie(id);
    obj.update = new Date(obj.update).toLocaleDateString();
    return obj;
}