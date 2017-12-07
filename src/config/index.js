// let baseUrl = "http://localhost:8086/"
let baseUrl = "http://59.110.164.55:8086/"

export default {
	api: {
        // article
        'addArticleUrl': baseUrl+'api/article/save',
        'articleListUrl': baseUrl+'api/article/list',
        'articleUpdateUrl': baseUrl+'api/article/update',
        'articleDeleteUrl': baseUrl+'api/article/delete',
        'readArticleUrl': baseUrl+'api/article/read',
		'addLabelUrl': baseUrl+'api/article/addLabel',
		'delLabelUrl': baseUrl+'api/article/delLabel',

        // activity
        'getAllActivityUrl': baseUrl+'api/activity/all',
        'getOneDayActivityUrl': baseUrl+'api/activity/oneDay',
        // user
        'loginUrl': baseUrl+'api/login',
        'githubLoginUrl': baseUrl+'api/login/github',
        'userProfileUrl': 'https://api.github.com/users/',
		// label
        'newLabelUrl': baseUrl+'api/label/new',
        'changeLabelUrl': baseUrl+'api/label/update',
        'getLabelsUrl': baseUrl+'api/labels',
        'deleteLabelUrl': baseUrl+'api/label/delete'
    },
    oauth: {
        client_id: '0f117211d715eb9eb73e',
        client_secret: 'af53da820d42bec5fceb6079e86c56a7b41244b5',
        authorizeUrl: 'http://github.com/login/oauth/authorize?client_id=0f117211d715eb9eb73e&scope=user',
        getTokenUrl: '/api/login/oauth/access_token'
    }
}
