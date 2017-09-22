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
    },
    [types.SET_ARTICLE_ID](state, _id) {
        state._id = _id
    },
    [types.SET_IS_LOGIN](state, isLogin) {
        state.isLogin = isLogin
    }
}

export default mutations

