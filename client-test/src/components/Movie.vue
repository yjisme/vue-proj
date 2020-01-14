<template>
    <div
        v-if="data"
        class="movie-item"
    >
        <router-link :to="{name:'movie-detail', params:{id:data.id}}">
            <img
                :src="data.cover"
                :alt="data.name"
                :title="data.name"
            >
        </router-link>
        <router-link :to="{name:'movie-detail', params:{id:data.id}}">

            <h2 :title="data.name">{{data.name}}</h2>
        </router-link>
    </div>
</template>

<script>
export default {
  props: ["data"]
};
</script>

<style scoped>
.movie-item {
  width: 140px;
  padding: 10px;
}

.movie-item img {
  width: 100%;
  height: 207px;
}

.movie-item h2 {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  text-align: center;
  margin: 15px 0;
}
</style>


