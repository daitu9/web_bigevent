$(function () {
    //调用这个getUserInfo函数获取用户的基本信息
    getUserInfo()
    var layer = layui.layer
    $('#btnLogout').on('click', function () {
        //提示用户是否退出
        layer.confirm('确定退出登录', { icon: 3, title: '提示' }, function (index) {
            //do something
            //1.清空本地储存中的token
            localStorage.removeItem('token')
            //2.重新跳转到登录页面
            location.href = '/login.html'
            //关闭confirm询问框
            layer.close(index);
        });
    })
})
//获取用户的基本信息
function getUserInfo() {
    $.ajax({
        method: 'GET',
        url: '/my/userinfo',
        //headers就是头配置对象
        // headers: {
        //     Authorzation: localStorage.getItem('token') || ''
        // },
        success: function (res) {
            if (res.status !== 0) {
                return layui.layui.msg('获取用户信息失败')
            }
            //调用renderAvatar渲染用户的头像
            renderAvatar(res.data)
        },
        //不论成功还是失败，最终都会调用complete回调函数
        complele: function (res) {
            // //在complete回调函数中,可以使用res.responseJSON拿服务器响应回来的数据
            // if (res.responseJSON.status === 1 && res.responseJSON.messaage === '身份验证失败') {
            //     //1.强制清空token
            //     localStorage.removeItem('token')
            //     //2.强制跳转到登录页面
            //     location.href = '/login.html'
            // }
        }
    })
}
//渲染用户的头像
function renderAvatar(user) {
    //1.获取用户的名称
    var name = user.nickname || user.username
    //2.设置欢迎的文本
    $('#welcome').html('欢迎&nbsp;&nbsp;' + name)
    //3.按需渲染用户的头像
    if (user.user_pic !== null) {
        //3.1渲染图片头像
        $('.layui-nav-img').attr('src', user.user_pic).show()
        $('.text-avatar').hide()
    }
    else {
        //3.2渲染文本头像
        $('.layui-nav-img').hide()
        var first = name[0].toUpperCase()
        $('.text-avatar').html(first)
            .show()
    }
}
