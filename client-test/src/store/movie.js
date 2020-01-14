import { getMovies } from "../services/movieService"
export default {
    namespaced: true,
    state: {
        total: 0,
        datas: [],
        limit: 10,
        current: 1
    },
    mutations: {
        setDatas(state, datas) {
            state.datas = datas;
        },
        setTotal(state, total) {
            state.total = total;
        },
        setCurrent(state, current) {
            state.current = current;
        }
    },
    actions: {
        async fetchDatas({ state, commit }) {
            var resp = await getMovies(state.current, state.limit)
            commit("setTotal", resp.total)
            commit("setDatas", resp.datas)
        }
    }
}