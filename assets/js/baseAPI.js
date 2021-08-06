//注意：每次调用$.get()或者$.post()或者$.ajax()的时候，
//会先调用ajaxPrefilter这个函数
//在这个函数中，可以拿到我们给AJAX提供的配置对象
$.ajaxPrefilter(function (options) {
    //在发起真正的ajax请求前，统一拼接请求的根路径
    options.url = 'http://api-breakingnews-web.itheima.net' + options.url
    console.log(options.url);

    //统一为有权限的接口设置headers请求
    if (options.url.indexOf('/my/') !== -1) {
        options.headers = {
            Authorzation: localStorage.getItem('token') || ''
        }
    }

    //全局统一·挂载complete回调函数
    options.complete = function (res) {
        //在complete回调函数中,可以使用res.responseJSON拿服务器响应回来的数据
        if (res.responseJSON.status === 1 && res.responseJSON.messaage === '身份验证失败') {
            //1.强制清空token
            localStorage.removeItem('token')
            //2.强制跳转到登录页面
            location.href = '/login.html'
        }
    }

})