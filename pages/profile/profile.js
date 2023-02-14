$(function () {
    $('.container>div>.left ul>li').click(function () {
        $(this).addClass('active').siblings().removeClass('active')
        $('.right>h2').text($(this).text())
        var i = $(this).index()
        $('.main>li').eq(i).show().siblings().hide()
    })
    let user = sessionStorage.getItem('user') || localStorage.getItem('user')
    user = JSON.parse(user)
    function shijianc(time) {
        let date = new Date(time)
        let Y = date.getFullYear() + '-'
        let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-'
        let D = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + ' '
        let h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':'
        let m = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':'
        let s = (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds())
        return Y + M + D + h + m + s
    }
    var time = shijianc(user.created)
    $('.main table tbody').html(
        `
        <tr>
                                <td>会员名</td>
                                <td>xxx</td>
                            </tr>
                            <td>手机号</td>
                            <td>${user.phone}</td>
                            </tr>
                            <td>注册时间</td>
                            <td>${time}</td>
                            </tr>
        `
    )
    $('button').click(function () {
        alert('用户退出登录')
        sessionStorage.removeItem('user')
        localStorage.removeItem('user')
        $('#header .user').hide()
        $('#header .user').prev().show()
        location.replace('?p=home')

    })
})