import * as types from './types'

const mutations = {
    [types.SET_ARTICLE_MODE](state, mode) {
        state.mode = mode
    },
    [types.SET_ARTICLE_LIST](state, list) {
        state.articleList = list
    },
    [types.SET_CURRENT_INDEX](state, index) {
        state.currentIndex = index
    }
}

export default mutations

