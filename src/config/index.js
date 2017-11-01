export default {
	api: {
        // article
        'addArticleUrl': 'http://localhost:8086/api/article/save',
        'articleListUrl': 'http://localhost:8086/api/article/list',
        'articleUpdateUrl': 'http://localhost:8086/api/article/update',
        'articleDeleteUrl': 'http://localhost:8086/api/article/delete',
        'readArticleUrl': 'http://localhost:8086/api/article/read',
		'addLabelUrl': 'http://localhost:8086/api/article/addLabel',
		'delLabelUrl': 'http://localhost:8086/api/article/delLabel',

        // activity
        'getAllActivityUrl': 'http://localhost:8086/api/activity/all',
        'getOneDayActivityUrl': 'http://localhost:8086/api/activity/oneDay',
        // user
        'loginUrl': 'http://localhost:8086/api/login',
				// label
        'newLabelUrl': 'http://localhost:8086/api/label/new',
        'changeLabelUrl': 'http://localhost:8086/api/label/update',
        'getLabelsUrl': 'http://localhost:8086/api/labels',
        'deleteLabelUrl': 'http://localhost:8086/api/label/delete'
    }
}
