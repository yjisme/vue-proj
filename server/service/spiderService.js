//该模块用于爬取豆瓣最近的热门电影，并同步到数据库
var cheerio = require("cheerio")
var axios = require("axios").default
var movieDao = require("../dao/movieDao");

//正在热映的地址
var indexUrl = "https://movie.douban.com/cinema/nowplaying/chengdu/";
//详情页地址
var detailUrl = "https://movie.douban.com/subject/{id}/";

/**
 * 根据url地址获取html字符串
 * @param {*} url 
 */
async function loadHTML(url) {
    var resp = await axios.get(url)
    return resp.data
}

/**
 * 从首页的html中获取所有电影的豆瓣id
 */
async function getMovieIds() {
    console.log("【开始】正在获取豆瓣热映电影首页....");
    var html = await loadHTML(indexUrl);
    console.log("【完毕】豆瓣热映电影首页获取完毕")
    var $ = cheerio.load(html); //将html结构转换为jquery对象
    var lis = $("#nowplaying li.list-item"); //获取页面中所有的正在热映的li元素
    var ids = Array.from(lis).map(li => li.attribs.id)
    return ids;
}

/**
 * 从首页的html中获取所有电影的id，并且从数据库中去除掉那些已经获取过的id
 */
async function washIds() {
    var ids = await getMovieIds();//获取目前的最新电影的id
    console.log("【开始】正在筛选要处理的电影")
    var movies = await movieDao.getAllMovies();//获取所有电影
    var hasIds = movies.map(m => m.doubanid);//获取已经获取过的电影id
    var results = ids.filter(id => !hasIds.includes(id))
    console.log(`【完毕】已得到要处理的电影，共${results.length}部`)
    return results;
}

/**
 * 获取单部电影对象
 * @param {*} id 电影的id
 */
async function getOneMovie(id) {
    try {
        var url = detailUrl.replace("{id}", id) //生成请求地址
        var html = await loadHTML(url) //获取html
        var $ = cheerio.load(html)
        var json = $(`script[type="application/ld+json"]`).html().replace(/\n/g, "");
        obj = JSON.parse(json);
        var movie = {
            name: obj.name,
            star: obj.aggregateRating.ratingValue,
            cover: obj.image,
            types: obj.genre.join(", "),
            update: obj.datePublished,
            description: $(`span[property="v:summary"]`).text(),
            doubanid: id
        }
        console.log(`【完毕】电影【${movie.name}】获取完毕`);
        return movie;
    }
    catch (err) {
        console.log(`电影【${id}】获取失败，原因未知`);
        return null;
    }
}

/**
 * 获取所有需要加入到数据库的电影
 */
async function fetchAllMovies() {
    var ids = await washIds();//获取所有需要获取的电影id
    var proms = ids.map(id => getOneMovie(id))
    var movies = await Promise.all(proms);
    console.log("所有电影获取完毕");
    movies = movies.filter(m => m);
    handleImgs(movies)
    return movies;
}
var request = require("request")
var fs = require("fs")
var path = require("path")
//下载处理封面图片
function handleImgs(movies) {
    var dir = path.resolve(__dirname, "../imgs");
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir);
    }
    for (const m of movies) {
        handleImg(m)
    }
}
//下载处理封面图片  单张
function handleImg(m) {
    var ext = path.extname(m.cover); //获取图片后缀
    var filename = path.resolve(__dirname, "../imgs", `${m.doubanid}${ext}`)
    if (!fs.existsSync(filename)) {
        request(m.cover).pipe(fs.createWriteStream(filename))
    }
    m.cover = `/imgs/${m.doubanid}${ext}`;
}


//爬取豆瓣正在热映影片
module.exports = async function () {
    var movies = await fetchAllMovies();
    console.log(`【开始】正在将电影同步到数据库`)
    await movieDao.addMovies(movies)
    console.log(`【完毕】【所有电影都已同步到数据库】`)
}