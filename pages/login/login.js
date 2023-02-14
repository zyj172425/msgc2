$('button#btn').click(function () {
    const url = 'https://serverms.xin88.top/users/login'
    const pwd = $('#pwd').val()
    const phone = $('#phone').val()
    var params = {
        phone,
        pwd
    }
    $.post(url, params, data => {
        console.log('登录结果:', data)
    })
})
$('#btn').click(function () {
    const pwd = $('#pwd').val()
    const phone = $('#phone').val()
    var url = 'https://serverms.xin88.top/users/login'
    var params = {
        phone,
        pwd
    }
    $.post(url, params, data => {
        if (data.code == 200) {
            alert('恭喜登录成功,即将跳转到首页页面')
            const auto = $('#autologin').prop("checked")
            if (auto) {
                localStorage.setItem('user', JSON.stringify(data.data))
            } else {
                sessionStorage.setItem('user', JSON.stringify(data.data))
            }
            location.replace('?p=home')

        } else {
            alert('登录失败')
        }
    })
})
