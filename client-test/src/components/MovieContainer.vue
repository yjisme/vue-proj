<template>
    <div>
        <movie-list :movies="datas"></movie-list>
        <pager
            :total="total"
            :limit="limit"
            :current="current"
            @page-change="handleChange"
        ></pager>
    </div>
</template>

<script>
import MovieList from "./MovieList";
import Pager from "./Pager";
import { mapState } from "vuex";
export default {
  components: {
    MovieList,
    Pager
  },
  computed: mapState("movie", ["total", "datas", "limit", "current"]),
  mounted() {
    this.$store.dispatch("movie/fetchDatas");
  },
  methods: {
    handleChange(newPage) { 
        this.$store.commit("movie/setCurrent", newPage);
        this.$store.dispatch("movie/fetchDatas");
    }
  }
};
</script>
