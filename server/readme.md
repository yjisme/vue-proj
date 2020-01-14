## 服务端使用说明

1. 运行``` npm install ```
2. 在mysql中创建数据库```moviedb```
3. 还原```moviedb.sql```
4. 修改```dao/dbUtil.js```中的配置
5. 执行```node index```

服务器每次启动后，会自动同步豆瓣最新电影，若不需要该功能，就把```index.js```中的前两行去掉。某些电影可能无法同步，原因是douban给定的格式不易解析。

## 静态资源

静态页面、图片、js  均放置在服务器端的public文件夹下

## API说明

### 分页查询电影

**path**: /api/movie

**method**：GET

**query**: 
- page: 默认1，页码
- limit：默认10，页容量

**response**：

```json
{
    "datas": [
        {
            "id": 18,
            "name": "士兵顺溜：兵王争锋",
            "star": "",
            "cover": "https://img9.doubanio.com/view/photo/s_ratio_poster/public/p2577460914.jpg",
            "types": "剧情, 动画",
            "update": "2020-1-17",
            "doubanid": "34911972",
            "description": "中国首部军事题材的动画片，延续了有六年电视剧沉淀基础的鲜明角色形象和热血剧情，用最尖端的动画技术，全方位展现了90后的军营生活和现代军事战争。影片故事取材于现役王牌特战旅，凝聚王牌部队实战经验，围绕“兵王”争霸比赛，通过用沉浸式体验逼真呈现现代战争和经典战役，为大家讲述了一部关于勇敢、友情，男儿血性的自我成长青春修炼的故事。"
        },
        {
            "id": 19,
            "name": "守望人",
            "star": "",
            "cover": "https://img3.doubanio.com/view/photo/s_ratio_poster/public/p2579091890.jpg",
            "types": "剧情",
            "update": "2020-1-15",
            "doubanid": "34925491",
            "description": "用质朴的民族语言、独特的高原风光、奇特的生活方式，各方位、多视角的讲述了西藏边区一家普通牧民两代人守护家乡的感人故事。细腻表现了夫妻、兄弟、父子、父女之间纯朴的感情，从而将剧中人、景、事有机的融合在一起。"
        },
        {
            "id": 21,
            "name": "武圣关公",
            "star": "",
            "cover": "https://img1.doubanio.com/view/photo/s_ratio_poster/public/p2576960858.jpg",
            "types": "动作, 动画",
            "update": "2020-1-11",
            "doubanid": "33411974",
            "description": "东汉末年，外戚专权，宦官秉政，群雄争霸，天灾不断。在这个战乱时代，解州运城出现一位义重如山的武将，他忠义仁勇的一生在历史上留下一段可歌可泣的英雄事迹，他就是——武圣关公。影片从关羽桃园三结义、温酒斩华雄、过五关斩六将到单刀赴会、水淹七军等经典历史段落，串起关公追随兄长、匡扶汉室、威震华夏的传奇一生，并将民间传说中战蚩尤解救苍生等神话巧妙呈现，全方位还原关公这一彪炳春秋的华夏传奇英雄。"
        }
    ],
    "total": 42
}
```

### 查询单部电影

**path**: /api/movie/:id

**method**：GET

**params**:
- id： 电影id

**response**：

```json
{
    "id": 21,
    "name": "武圣关公",
    "star": "",
    "cover": "https://img1.doubanio.com/view/photo/s_ratio_poster/public/p2576960858.jpg",
    "types": "动作, 动画",
    "update": "2020-01-10T16:00:00.000Z",
    "doubanid": "33411974",
    "description": "东汉末年，外戚专权，宦官秉政，群雄争霸，天灾不断。在这个战乱时代，解州运城出现一位义重如山的武将，他忠义仁勇的一生在历史上留下一段可歌可泣的英雄事迹，他就是——武圣关公。影片从关羽桃园三结义、温酒斩华雄、过五关斩六将到单刀赴会、水淹七军等经典历史段落，串起关公追随兄长、匡扶汉室、威震华夏的传奇一生，并将民间传说中战蚩尤解救苍生等神话巧妙呈现，全方位还原关公这一彪炳春秋的华夏传奇英雄。"
}
```

### 添加电影

**path**: /api/movie

**method**：POST

**body**：电影的所有字段信息，json和urlencoded格式均可

**response**：

```json
{
    "ok":true
}
```

### 修改电影

**path**: /api/movie/:id

**method**：PUT

**params**:
- id: 要修改的电影id

**body**：要修改的字段信息，json和urlencoded格式均可

**response**：

```json
{
    "ok":true
}
```

### 删除电影

**path**: /api/movie/:id

**method**：DELETE

**params**:
- id: 要修改的电影id

**response**：

```json
{
    "ok":true
}
```