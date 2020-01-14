//专门处理访问学生的接口
var express = require("express");
var movieService = require("../service/movieService")
var router = express.Router(); //得到一个路由对象

//配置路由规则

//获取单个电影
router.get("/:id", async (req, res) => {
    //获取page 和 pageSize
    var id = req.params.id;
    var result = await movieService.getMovie(id);
    res.send(result);
})

//分页获取电影
router.get("/", async (req, res) => {
    //获取page 和 pageSize
    var page = req.query.page || 1; //默认为1
    var pageSize = req.query.limit || 10; //默认为10
    var result = await movieService.getMovies(page, pageSize)
    res.send(result);
})

//删除电影
router.delete("/:id", async (req, res) => {
    //获取page 和 pageSize
    var id = req.params.id;
    await movieService.deleteMovie(id)
    res.send({ ok: true });
})

//添加电影
router.post("/", async (req, res) => {
    await movieService.addMovie(req.body)
    res.send({ ok: true })
})

router.put("/:id", async (req, res) => {
    await movieService.updateMovie(req.params.id, req.body)
    res.send({ ok: true })
})

module.exports = router;