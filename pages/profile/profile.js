$(function () {
    $('.container>div>.left ul>li').click(function () {
        $(this).addClass('active').siblings().removeClass('active')
        $('.right>h2').text($(this).html())
        var i = $(this).index()
        $('.main>li').eq(i).show().siblings().hide()
    })
    let user = sessionStorage.getItem('user') || localStorage.getItem('user')
    user = JSON.parse(user)
    const { id } = user
    $('#tx > img').prop('src', user.avatar || './assets/img/user_unknown.png')
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
    const url = 'https://serverms.xin88.top/users/head_photos'
    $.get(url, data => {
        console.log(data)
        $('.main li#tx ul').html(
            data.hero.map(value => {
                return `<li><img src="https://game.gtimg.cn/images/lol/act/img/champion/${value.alias}.png" alt="" data-ausrc=${value.selectAudio}></li>`
            })
        )
    })
    const ou = new Audio()

    $('#tx').on('click', 'li>img', function () {
        const srcl = $(this).prop('src')
        $('#tx>img').prop('src', srcl)
        ou.src = $(this).data('ausrc')
        ou.play()

    })


    $('#tx>#qd').click(function () {
        var url = 'https://serverms.xin88.top/users/head_photo'
        const alias = $(this).prev().prop('src')
        $.post(url, { id, alias }, data => {
            if (data.code == 200) {
                alert('上传成功')
                $('.user img').prop('src', alias)
                user.alias
                if (sessionStorage.getItem('user')) {
                    sessionStorage.setItem('user', JSON.stringify(user))
                }
                if (localStorage.getItem('user')) {
                    localStorage.setItem('user', JSON.stringify(user))
                }
            } else {
                alert('上传失败')
            }
        })
    })
    $('#tc').click(function () {
        alert('用户退出登录')
        sessionStorage.removeItem('user')
        localStorage.removeItem('user')
        $('#header .user').hide()
        $('#header .user').prev().show()
        location.replace('?p=home')

    })
})