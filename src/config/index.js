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
				// label
        'newLabelUrl': baseUrl+'api/label/new',
        'changeLabelUrl': baseUrl+'api/label/update',
        'getLabelsUrl': baseUrl+'api/labels',
        'deleteLabelUrl': baseUrl+'api/label/delete'
    }
}
