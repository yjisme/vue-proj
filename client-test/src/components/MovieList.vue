<template>
    <div class="movie-list">
        <movie
            v-for="item in movies"
            :key="item.id"
            :data="item"
        />
    </div>
</template>

<script>
    import { getMovie } from "../services/movieService";
    import Movie from "./Movie";
    export default {
      components: {
        Movie
      },
      props: {
        movies: {
          type: Array,
          default: []
        }
      }
    };
</script>

<style scoped>
    .movie-list {
        display: grid;
        grid-template-columns: repeat(5, 1fr);
        width: 1000px;
        margin: 0 auto;
    }
</style>

