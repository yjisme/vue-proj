<template>
    <movie-detail :movie="movie"></movie-detail>
</template>

<script>
import MovieDetail from "@/components/MovieDetail";
import { getMovie } from "@/services/movieService";
export default {
  components: {
    MovieDetail
  },
  data() {
    return {
      movie: null
    };
  },
  async mounted() {
    this.movie = await getMovie(this.$route.params.id);
  }
};
</script>

