$(function(){
    $('.top-video').on('click','li',function () {
        
        if($(this).hasClass('active')){
            $(this).removeClass('active').children().trigger('pause')
            $(this).siblings().removeClass('noactive')
            $(this).children('div').show()
        }else{
            $(this).addClass('active').removeClass('noactive').siblings().addClass('noactive').removeClass('active')
            $(this).children().trigger('play')
            $(this).siblings().children().trigger('pause')
            $(this).children('div').hide()
            $(this).siblings().children('div').show()
        }
    })

    var url = 'https://serverms.xin88.top/index'
    $.get(url,data=>{
        console.log(data)
        $('.top-video ul').html(
            data.hot_video.map(value=>{
                const{vname,mp4,pic} = value
                return `<li>
                <video src="./assets/video/${mp4}" preload="metadata"></video>
                <div><i></i><b>${vname}</b></div>
            </li>`
            })
        )
        $('.main .area-1 .hot-search>ul').html(
            data.today_hot.map(value=>{
                const {name,emphasize} = value
                return`
                <li class='${emphasize ? 'active':''}'>
                        <a href="?p=search&wd=${name}">${name}</a>
                    </li>
                `
            })
        )
        //今日三餐
        //二维数组
        //遍历数组
        data.today_meal.forEach(value=>{
            const {cate_name,contents} = value
            $('.main .area-1 .hot-search>.today-meal>.text>ul').append(`<li>${cate_name}</li>`)
            $('.main .area-1 .hot-search>.today-meal>.text>ul li').eq(0).addClass('active')
            contents.forEach(value=>{
                const {title,desc,pic} = value
                $('.main .area-1 .hot-search>.today-meal .swiper-wrapper').append(`
                
                        <div class="swiper-slide"><img src="./assets/img/food/${pic}" alt="">
                            <b>${title}</b>
                            <span>${desc}</span>
                        </div>
                    `)
            })
        })
        data.index_items.forEach(value=>{
            const{title,items} = value
            const lis = items.map(value=>{
                const {author,pic,title,desc} = value 
                return `
                <li>
                <div class='img'> <img src="./assets/img/food/${pic}" alt=""><span>${author}</span></div>
                <b>${title}</b>
                <div class='text'><i></i><span class='line-1'>${desc}</span></div>
            </li>
                `
            })
            $('.main>.index_item').append(
                `
            <div>
                <h2>${title}</h2>
                <ul>
                    ${lis.join('')}
                </ul>
            </div>
                `
            )
        })
        
        })
    
    
    $('.main .area-1 .hot-search>.today-meal>.text ul').on('click','li',function(){
        $(this).addClass('active').siblings().removeClass('active')
        const i = $(this).index()
        mySwiper.slideTo(3 * i, 1000, false);
    })
    var mySwiper = new Swiper('.swiper', {
        slidesPerView: 3,
        slidesPerGroup: 3,
        spaceBetween: 10,
        //精确配置
        on: {
            slideChange: function () {
                const i = this.activeIndex / 3
                $('.text>ul>li').eq(i).addClass('active').siblings().removeClass('active')
            },
        },
    })
    $('.text>ul>li').click(function () {
        $(this).addClass('active').siblings().removeClass('active')
        
        //通过slide to 方法,切换到指定的滑动项
    })
    setInterval(() => {
      $('.banner').toggleClass('active')
    }, 4000)
    
})