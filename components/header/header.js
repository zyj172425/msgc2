$(function () {
    //根据本地的存储的 user信息, 来判定当前的登录状态
    //存在user 说明登录; 不存在 说明没登录过
    let user = sessionStorage.getItem('user') || localStorage.getItem('user')
    user = JSON.parse(user)
    console.log(user)
    if (user) {
        $('.user').show()
        $('.user').prev().hide()
        $('.user>a').html(user.phone)
    } else {
        $('.user').hide()
        $('.user').prev().show()
    }
    //读取输入框中的值,拼接到路径中

    //通过代码修改地址栏的地址
    // console.log(wd)
    const params = new URLSearchParams(this.location.search)
    const wd = params.get('wd')
    $('.search>input').val(wd)
    $('.search>button').click(function () {
        var wd = $('.search input').val()
        location.assign(`?p=search&wd=${wd}`)
    })
    $('.search>input').keyup(function (e) {
        //分辨出 回车按钮
        //事件参数中的keycode 代表当前案件的编号,其中13属于回车
        if (e.keyCode == 13) {
            $(this).next().click()
        }
    })
})
