$(function(){
    //计算某个元素底部的位置
    function geth(elem){
        //底部的偏移量
        const h = $(elem).height()
        const t = $(elem).css('top')
        return parseInt(t) + h
}
    $('.backtop').click(function(){
        $(window).scrollTop(0)
    })
    let nowPage = 1
    let lock = false
    function getDate(pno) {
        var url = `https://serverms.xin88.top/note?page=${pno}`
        if (lock) return
        if($('.nomore:visible').length == 1) return
        lock = true
        $.get(url, data => {
            lock = false
            console.log(data.data)
            //本地分本地和网络两种
            //本地图片:默认的宽高 就是图片本身 -- 因为读取速度快
            //网络图:需要通过网络下载 -- 下载完之前,图片高度是0;下载完之后才有宽高
            //两段式的布局 会消耗系统的性能
            //1.网络请求前,显示出布局 -- 浪费性能的操作
            //2.图片请求完毕后,需要重新进行布局
            //解决方案:让服务器直接传递图片的宽高数据
            var els = data.data.map(v => {
                const img_h = 242.5*v.height/v.width
                return `<li>
                    <div class="img">
                    <img src="./assets/img/note/${v.cover}" alt="" style="height:${img_h}px;" >
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
            $('#body .list').append(els)
            //数组:存放每一列中,摆放在最下方的那个元素
            const xia_arr = [] 
            //查询到所有的li元素,挨个进行位置的调整
            //形参 当前遍历元素的序号 当前遍历的元素
            $('.list>li').each((index,elem)=>{
                console.log(index,elem)
                //把元素封装成jquery类型的对象
                const w = $(elem).width()
                if(index<4){
                    $(elem).css({top:0,left:index*w+index*10})
                    xia_arr.push(elem)
                }else{
                    //第二排开始要先查询已有元素中,底部最矮的那个
                    var min_el = xia_arr[0]
                    xia_arr.forEach((el,i)=>{
                        console.log(geth(el))
                        if(geth(el)<geth(min_el)){
                            min_el = el
                        }                        
                        
                    })
                    
                    $(elem).css({top:geth(min_el)+10,left:$(min_el).css('left')})
                    //当最小元素所在列 添加新的元素之后,从xia_arr 中替换掉这一列的最小元素
                    //数组的splice(序号,个数,新元素)
                    const i = xia_arr.indexOf(min_el)
                    xia_arr.splice(i,1,elem)
                    var max_el = xia_arr[0]
                    xia_arr.forEach((el,i)=>{
                        console.log(geth(el))
                        if(geth(el)>geth(max_el)){
                            max_el = el
                        }    
                        $('.list').height(geth(max_el))
                        
                    })
                }
                

            })
            //因为ul的子元素都是绝对定位,导致其父元素的高度丢失
            //需要手动计算:查看最下方的那个子元素的底部的位置,设置成ul的高度            
            const { page , pageCount} = data
            nowPage = page
            if(page == pageCount){
                $('.loadmore').hide()
                $('.nomore').show()
            }else{
                $('.loadmore').show()
                $('.nomore').hide()
            }
        })
    }
    getDate(1)
$(window).scroll(function(){
    const y = $(window).scrollTop()
    const dom_h = $(document).height()
    const wid_h = $(window).height()
    //触底偏移量
    const offset_bottom = dom_h - wid_h
    if(Math.round(y) > offset_bottom - 300){
        getDate(nowPage + 1)
    }
    if(y>300){
        $('.backtop').css('display','flex')
    }
})
})