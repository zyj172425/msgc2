$(function(){
    $('.pages .next').click(function(){
        $('.pages li.active').next().click()
    })
    $('.pages .prev').click(function(){
        $('.pages li.active').prev().click()
    })
    function getDate(pno) {
        var url = `https://serverms.xin88.top/note?page=${pno}`
        $.get(url, data => {
            console.log(data)
            var els = data.data.map(v => {
                return `<li>
                    <div class="img">
                    <img src="./assets/img/note/${v.cover}" alt="" width="250px">
                    </div>
            <div class="text">
                <p class="line-2">${v.title}</p>
                <div>
                    <div class="left">
                    <img src="./assets/img/note/${v.head_icon}"  alt="">
                <span>${v.name}</span>
                </div>
                <span>${v.favorite}</span>
                    </div>
            </div>
        </li>
                `
            })
            $('#body .list').html(els)
            $(window).scrollTop(0)
            $('.pages ul').empty()
            const{ page , pageCount } = data
            let minpage = page - 2
            let maxpage = page + 2
            if( minpage < 1 ){
                minpage = 1
                maxpage = minpage + 4
            }
            if(maxpage > pageCount){
                maxpage = pageCount
                minpage = maxpage - 4
            }
            for(let i = minpage;i<=maxpage;i++){
                $('.pages ul').append(`<li class = ${ i == page ? "active":''}>${i}</li>`)
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
        getDate($(this).text())
    })
    $('button').click(function () {
        getDate(++nowPage)
    })
})