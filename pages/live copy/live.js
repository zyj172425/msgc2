$(function () {
    $('.pages .prev').click(function () {
        $('.pages li.active').prev().click()
    })
    $('.pages .next').click(function () {
        $('.pages li.active').next().click()
    })
    
    function getDate(pno){
        var url = `https://douyu.xin88.top/api/room/list?page=${pno}&type=yz`
    $.get(url, data => {
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
        $('#body .list').html(els)
        $('.pages ul').empty()
        
        const{ nowPage , pageCount} = data.data
        let minpage = nowPage - 2
        let maxpage = nowPage + 2
        if(minpage<1){
            minpage = 1
            maxpage = minpage + 4
        }
        if(maxpage>pageCount){
            maxpage = pageCount
            minpage = maxpage - 4
        }
        for(  i = minpage ; i <= maxpage ; i++){
            $('.pages>ul').append(`<li class=${i == nowPage ? 'active':''}>${i}</li>`)
        }
        $('.pages>.last').click(function(){
            //分辨出 回车按钮
            //事件参数中的keycode 代表当前案件的编号,其中13属于回车
            getDate(pageCount)
        })
        //不可用状态设置
        $('.pages .prev').prop('disabled', nowPage == 1)
        $('.pages .next').prop('disabled',nowPage == pageCount)
    })
    }
    getDate(1)
    $('.pages ul').on('click','li',function(){
        getDate($(this).text())
    })
    $('.pages>input').keyup(function(e){
        //分辨出 回车按钮
        //事件参数中的keycode 代表当前案件的编号,其中13属于回车
        if(e.keyCode == 13){
            getDate($(this).val())
        }
    })
    $('.pages>.first').click(function(){
        //分辨出 回车按钮
        //事件参数中的keycode 代表当前案件的编号,其中13属于回车
        getDate(1)
    })
    
}
)