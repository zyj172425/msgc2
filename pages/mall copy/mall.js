$(function () {
    
    $('.pages>.next').click(
        function(){
            $('.pages ul li.active').next().click()
        }
    )
    $('.pages>.prev').click(
        function(){
            $('.pages ul li.active').prev().click()
        }
    )
    function getDate(pno){
        var url = `https://serverms.xin88.top/mall?page=${pno}`
    $.get(url, data => {
        console.log(data)
        var els = data.data.map(v => {
            return `<li>
                <img src="../../assets/img/mall/${v.pic}" alt="">
<div class="text">
    <p class='line-2'>${v.name}</p>
<div>
    <span>￥${v.price}</span><span>月销${v.sale_count}</span>
</div>
</div>
                    </li>`
        })
        $('#body .list').html(els)
        //分页
        $('.pages ul').empty()
        $(window).scrollTop(0)
        

        const {page , pageCount} = data
        let minpage = page - 2
        let maxpage = page + 2
        if (minpage<1){
            minpage = 1
            maxpage = minpage + 4
        }
        if (maxpage>pageCount){
            maxpage = pageCount
            minpage = maxpage - 4
        }
        for(let i = minpage ; i<=maxpage;i++){
            $('.pages ul').append(`<li class=${ i == page ? 'active':''}>${i}</li>`)
        }
        if(page == 1){
            $('.pages>.prev').hide()
        }else{
            $('.pages>.prev').show()
        }
        if(page == pageCount){
            $('.pages>.next').hide()
        }else{
            $('.pages>.next').show()
        }

    })
    }
    getDate(1)
    $('.pages ul').on('click','li',function(){
        getDate($(this).text())
    })
}
)
