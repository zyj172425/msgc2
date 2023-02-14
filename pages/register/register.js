$(function(){
    //当密码有修改时应该再次触发有验证密码
    $('#password1').change(function(){
        $('#password2').focus().blur()
    })
    
    $('button#btn').click(function(){
        const phone = $('#username').val()
        
        const pwd = $('#password').val()
        //网络请求的方式有很多种,最常见的是get,post
        //get适合从服务器获取数据,对应sql的查询操作
        //post 适合向服务器传递数据,对应sql的增删改操作
        //发送请求时的差别:
        //get的参数 :请求地址?参数=值$参数=值... 和请求地址一起发
        //post的三个参数:请求地址,请求参数,回调函数
        var url = 'https://serverms.xin88.top/users/register'
        //请求参数:有两种方式可选 -- 字符串或对象
        //字符串格式:参数=值&参数=值..
        //对象格式:{参数:值,参数:值}
        var params = `phone=${phone}&pwd=${pwd} `
        console.log('注册参数',params)
        $.post(url,params,data=>{
            console.log('注册结果',data)
        })
    })
    $('#username').blur(function(){
        const phone = $('#username').val()
        //如果输入框没有值得话,不检测
        if(phone == '')return //return终止代码的执行
        //判断手机号格式是否正确
        if(/^1[3-9]\d{9}/.test(phone) == false){
            //不正确:输入框加err样式&&展示手机号格式错误
            $(this).addClass('err')
            $(this).next().children().eq(0).show()
        }else {
            var url = 'https://serverms.xin88.top/users/checkPhone'
            $.post(url,{phone},data=>{
                console.log(data)
                if(data.code == 200){
            $(this).next().children().eq(2).show()
                }
                if(data.code == 202){
                    $(this).addClass('err')
            $(this).next().children().eq(1).show()
                }
            })
        }
    }).focus(function(){
        $(this).removeClass('err').next().children().hide()
    })
    $('#password1').blur(function(){
        const pwd = $('#password1').val()
        //如果输入框没有值得话,不检测
        if(pwd == '')return //return终止代码的执行
        if(/^[a-zA-Z]\w{5,17}/.test(pwd) == false){
            $(this).addClass('err')
            $(this).next().children().eq(0).show()
        }else{
            $(this).next().children().eq(1).show()
        }
    }).focus(function(){
        $(this).removeClass('err').next().children().hide()
    })
    $('#password2').blur(function(){
        const pwd1 = $('#password1').val()
        const pwd2 = $('#password2').val()
        if(pwd2 == '')return
        if(pwd1 == pwd2){
            
            $(this).next().children().eq(1).show()
        }else{
            $(this).addClass('err')
            $(this).next().children().eq(0).show()
        }
    }).focus(function(){
        $(this).removeClass('err').next().children().hide()
    })
    $('#btn').click(function(){
        if($('.agree label input').prop('checked') == false){
            alert('请勾选用户协议')
            return
        }
        
        if($('.info p.ok:visible').length!=3){
            alert('请确保所有信息均填写正确,才能完成注册')
            return
        }
        const pwd = $('#pwd').val()
        const phone = $('#phone').val()
        var url = 'https://serverms.xin88.top/users/checkPhone'
        var params = {
            phone,
            pwd
        }
            $.post(url,params,data=>{
                if(data.code == 200){
                    alert('恭喜注册成功,即将跳转到登录页面')
                    location.replace('?p=login')
                }else{
                    alert('很遗憾注册成功')
                }
                })
    })
})
