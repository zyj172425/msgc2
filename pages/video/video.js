$(function () {
    $('.pages>.next').click(function(){
        $('.pages li.active ').next().click()
    })
    $('.pages>.prev').click(function(){
        $('.pages li.active ').prev().click()
    })
    function getDate(pno){
        var url = `https://serverms.xin88.top/video?page=${pno}`
    $.get(url, data => {
        console.log(data)
        var els = data.data.map(v => {
            return `<li>
        <div class='img'>
        <img src="https://msgc.xin666.vip/assets/img/video/${v.pic}" alt="">
        <div class='text'><span>${v.views}次播放</span><span>${v.duration}</span></div>
        </div>            
        <div class="title"><span>${v.title}</span></div>
    </li>`
        })
        $('#body ul.list').html(els)
        //解构
        //网络图默认高度是0,当请求完毕时才会按照图片的比例,计算出自身的高度
        //当请求新的页面是,整个页面高度很小,有一种回到顶部的感觉
        //由于浏览器的原因刷新的时候可能缓存到本地不会跳转至顶部
        //统一方案:1.给li设置固定高度
        //2.回到顶部
        $(window).scrollTop(0)
        
        $('.pages>ul').empty()
        const { page , pageCount } = data
        //清空子元素,添加新的
        let minpage = page - 2
        let maxpage = page + 2
        console.log(minpage)
        console.log(maxpage)
        if(minpage<=1){
            minpage = 1 
            maxpage = minpage + 4
        }else if(maxpage>pageCount){
            maxpage = pageCount 
            minpage = pageCount-4
        }else{maxpage == maxpage;minpage == minpage}
        for(let i= minpage ; i <= maxpage; i++) {
            $('#body .pages>ul').append(`<li class=${i == page? 'active':''}>${i}</li>`)
        }
        $('.pages li').click(function(){
            getDate($(this).text())
        })
        //根据当前页来调整上一页和下一页按钮的显示状态
        if(page == 1){
            $('.pages .prev').hide()
        }else{
            $('.pages .prev').show()

        }
        if(page == pageCount){
            $('.pages .next').hide()
        }else{
            $('.pages .next').show()

        }
    })
    }
    getDate(1)
    //这些页数的li元素,是请求完毕后,利用for 循环动态新增的
    //如何给 动态新增 的元素添加点击事件?
    // 委托模式:基于事件冒泡机制,让一直存在的.pages元素棒li处理事件
    // $('.pages ul').on('click','li',function(){
    //     // li所显示的文字就是页数
    //     const pno = $(this).text()
    //     getDate(pno)
    // })
}
)