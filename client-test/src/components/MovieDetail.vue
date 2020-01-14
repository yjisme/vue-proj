<template>
    <div
        class="movie-detail"
        v-if="movie"
    >
        <back-button>回到列表页</back-button>
        <h1>{{movie.name}}</h1>
        <div class="cover-info">
            <img
                :src="movie.cover"
                class="cover"
            >
            <p>
                <span class="title">类型</span>
                <span>{{movie.types}}</span>
            </p>
            <p>
                <span class="title">上映时间</span>
                <span>{{movie.update}}</span>
            </p>
            <p>
                <span class="title">评分</span>
                <span>{{movie.star?movie.star:"暂无评分"}}</span>
            </p>
            <p>
                <span class="title">豆瓣链接</span>
                <a
                    target="_blank"
                    :href="`https://movie.douban.com/subject/${movie.doubanid}`"
                >进入豆瓣电影详情</a>
            </p>
        </div>
        <div class="description">
            {{movie.description}}
        </div>
    </div>
</template>


<script>
import BackButton from "./BackButton";
export default {
  components: {
    BackButton
  },
  props: ["movie"]
};
</script>

<style scoped>
.movie-detail {
  width: 800px;
  margin: 20px auto;
}

.movie-detail h1 {
  font-size: 2em;
  margin: 1em 0;
}

.cover-info {
  overflow: hidden;
}

.cover-info .cover {
  width: 200px;
  float: left;
  margin-right: 20px;
}

.cover-info p {
  margin-bottom: 1.5em;
  color: #888;
}

.cover-info p span.title {
  color: #333;
}

.cover-info p span {
  margin-right: 10px;
}

.cover-info p a {
  color: rgb(4, 175, 231);
}

.description {
  margin: 1.5em 0;
  line-height: 1.5;
}
</style>
