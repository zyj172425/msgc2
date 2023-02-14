$(function () {
    $('#body .order li').click(function () {
        $(this).addClass('active').siblings().removeClass('active')
        getDate(1)
    })
    $('.pages>.next').click(function(){
        $('.pages li.active ').next().click()
    })
    $('.pages>.prev').click(function(){
        $('.pages li.active ').prev().click()
    })
    function getDate(pno){
        //获取排序类型的值
        var type = $('.order>li.active').data('type')
        console.log(type)
        const params = new URLSearchParams(location.search)
        const wd = params.get('wd')
    var url = `https://serverms.xin88.top/mall/search?type=${type}&kw=${wd}&page=${pno}`
    $.get(url, data => {
        console.log(data)
        var els = data.data.map(v => {
            const{name,pic,price,sale_count}=v
            var re = new RegExp(`(${wd})`, 'gi')
            var res = name.replace(re, `<span style='color:red;'>$1</span>`)

            return `<li>
            <img src="../../assets/img/mall/${v.pic}" alt="">
            <div class="text">
            <h3><span>${res}</span></h3>
                <span>￥${v.price}</span>
                <div><span>数量: ${v.sale_count}</span></div>
            </div>
    </li>
            `

        })

        $('#body .list').html(els)
        $(window).scrollTop(0)
        $('.pages>ul').empty()
        const{ page , pageCount } = data
        let minpage = page - 2
        if(minpage<1)
        minpage = page
        let maxpage = minpage + 4
        if(maxpage>pageCount) 
        maxpage = pageCount

        minpage = maxpage - 4
        if(minpage<1)
        minpage = 1
        for(let i =minpage; i<=maxpage ; i++ ){
            $('.pages ul').append(`<li class=${i == page? 'active':''}>${i}</li>`)
        }
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
     $('.pages ul').on('click','li',function(){
         var pno = $(this).text()
         getDate(pno)
     })
}
)
