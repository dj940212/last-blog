const state = {
    mode: "read",           //阅读&&编辑
    articleList: [],        //当前显示文章
    allArticles: [],         //所有文章
    currentIndex: -1,
    _id: '',
    isLogin: false,
    profile: {},
    token: '',
    curRoute: '/',
    labels: [],
    curEdit: -1 //当前显示的label编辑器index

}

export default state
