$(function () {
    let nowPages = 1   
    let lock = false
    function getDate(pno){
        if(lock) return
        if($('.nomore:visible').length == 1) return
        lock = true
        var url = `https://douyu.xin88.top/api/room/list?page=${pno}&type=`
    $.get(url, data => {
        lock = false
        console.log(data)
        var els = data.data.list.map(v => {
            return `<li>
                <div class="img">
                    <img src="${v.roomSrc}" alt="">
                        <div class='hn'>${v.hn}</div>
                        
                        <div class='name'>${v.nickname}</div>
                    </div>
        <div>
            <p>${v.roomName}</p>
        </div>
                    </li>`
        })
        $('#body .list').append(els)
        
        const{ nowPage , pageCount} = data.data
        nowPages = nowPage
        if(nowPage == 1){getDate(2)}
        if(nowPages == pageCount){
            $('.loadmore').hide()
            $('.nomore').show()
        }else{
            $('nomore').hide()
            $('loadmore').show()
        }
    })
    }
    getDate(1)
    getDate(2)
    $(window).scroll(function(){
        const y = $(window).scrollTop()
        const dom_h = $(document).height()
        const win_h = $(window).height()
        const offset_bottom = dom_h - win_h
        if(y > offset_bottom - 200){
            getDate( nowPages + 1)
        }
        
    })
    
}
)