$(function () {
    let nowPage = 1
    // 通过加锁的方式,保证 同一个页面只能发送一次
    // 先查看是否上锁,锁了则不做事,结束之后打开锁
    let lock = false
    function getDate(pno){
        // 判断:是否加锁
        var url = `https://serverms.xin88.top/mall?page=${pno}`
        if (lock) return
        //查询nomore元素是否可见,条件为:可见的
        //length :读取查询到结果的个数;如果是一个,就说明存在可见的
        // 可见就说嘛没有更多数据了
        if($('.nomore:visible').length == 1) return
        lock = true
    $.get(url, data => {
        lock = false
        console.log(data)
        var els = data.data.map(v => {
            return `<li>
                <img src="./assets/img/mall/${v.pic}" alt="">
<div class="text">
    <p class='line-2'>${v.name}</p>
<div>
    <span>￥${v.price}</span><span>月销${v.sale_count}</span>
</div>
</div>
                    </li>`
        })
        
        $('#body .list').append(els)
        const { page,pageCount} = data
        nowPage = page
        if (page == pageCount){
            $('.loadmore').hide()
            $('.nomore').show()
        }else{
            $('.nomore').hide()
            $('.loadmore').show()
        }
    })
    }
    getDate(1)

    $(window).scroll
            (function () {
                console.log('窗口在滚动....')
                //获取窗口滚动的距离 ,即相对顶部的距离
                const y = $(window).scrollTop()
                console.log('偏移量:', y)
                const dom_h = $(document).height()
                console.log('内容高', dom_h)
                //窗口高
                const win_h = $(window).height()
                console.log(win_h)
                //触底的偏移量 = 内容高-窗口高
                const offset_bottom = dom_h - win_h
                console.log(offset_bottom)
                if (Math.round(y) > offset_bottom - 300) {
                    getDate(nowPage+1)
                }
                //实战中,会提前触底操作的触发机会,更早的去获取更多数据
                //这样可以提升用户体验
            })
}
)
