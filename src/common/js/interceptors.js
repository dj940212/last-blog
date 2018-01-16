import axios from 'axios'
import cookie from 'js-cookie'

const interceptors = () => {
	// Add a request interceptor
	axios.interceptors.request.use(function (config) {
	    // Do something before request is sent
	    config.headers['x-access-token'] = cookie.get('token')

	    return config;
	  }, function (error) {
	    // Do something with request error
	    return Promise.reject(error);
	  });

	// Add a response interceptor
	axios.interceptors.response.use(function (response) {
		console.log("data===>",response.data.data)
		console.log("log===>",response.data.message)

		if (response.data.err_code === 9) {
			return alert("请登录")
		}

		if (response.data.err_code === 1) {
			return alert(response.data.message)
		}
	    // Do something with response data
	    return response;
	  }, function (error) {
	    // Do something with response error
	    return Promise.reject(error);
	});
}

export default interceptors

