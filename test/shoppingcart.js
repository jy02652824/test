if (window.$ === undefined) {
    throw new Error("请先加载jQuery库")
}
"use strict";

$(function(){//0
    //获取用户id.刷新购物车
    var str=document.cookie;
    var uid=str.split("; ")[0].split("=")[1];
    var uname=str.split("; ")[1].split("=")[1];
    //加载页头和页尾
    $("#header").load("data/header.php");
    $("#footer").load("data/footer.php");
    $.ajax({
        type:"post",
        url:"data/shoppingcartlist.php",
        data:{uid:uid},
        success:function(data){
            var len=data.length;
            var html='';
            for(var i=0;i<len;i++){
                var obj=data[i];
                html+=`
                <tr>
                    <td>
                        <input type="checkbox"/>
                        <input type="hidden" value="${obj.pid}" />
                        <div><img src="${obj.pic}" alt=""/></div>
                    </td>
                    <td><a href="">${obj.pname}</a></td>
                    <td>${obj.price}</td>
                    <td>
                        <button class="${obj.cid}">-</button><input type="text" value="${obj.counts}"/><button class="${obj.cid}">+</button>
                    </td>
                    <td class="totle"><span>${parseFloat(obj.price*obj.counts).toFixed(2)}</span></td>
                    <td><a href="${obj.cid}">删除</a></td>
                </tr>
                `
            }
            $("#cart>tbody").html(html);
            //页面刷新更新总价
            sub();
        }
    });
/*    删除事件*/
    $("#cart>tbody").on("click","tr>td:last-child>a",function(e){
        e.preventDefault();
        var self=this;
        var cid=$(this).attr("href");
        del(self,cid)
    });
    var del=function(self,cid){
        if(window.confirm("确认要删除该物品吗")==true){
        $.ajax({
            url:"data/shopping_del.php",
            data:{cid:cid},
            success:function(data){
                if(data.code>0){
                    alert(data.msg);
                    var tr=$(self).parent().parent();
                    tr.remove();
                }else{
                    alert(data.msg);
                }
            }
        })
        }
    };
    //增加数量
    $("#cart>tbody").on("click","button:contains('+')",function(){
        var self=this;
        var cid=$(this).attr("class");
        $.ajax({
            url:"data/shopping_add.php",
            data:{cid:cid},
            success:function(data){
                if(data.code>0){
                    alert(data.msg);
                    //数量
                    var n=parseInt($(self).siblings('input').val())+1;
                    re(self,n);
                }else{
                    alert(data.msg);
                }
            }
        })
    });
    //减少
    $("#cart>tbody").on("click","button:contains('-')",function(){
        var self=this;
        var cid=$(this).attr("class");
        var n=parseInt($(self).siblings('input').val())-1;
        if(n!=0){
        $.ajax({
            url:"data/shopping_less.php",
            data:{cid:cid},
            success:function(data){
                if(data.code>0){
                    alert(data.msg);
                    //数量

                    re(self,n);
                }else{
                    alert(data.msg);
                }
            }
        })
        }
        else{
            del(self,cid)
        }
    });

    var re=function(self,n){
        $(self).siblings('input').val(n);
        //单价
        var price=parseFloat($(self).parent().prev().html());
        //小计
        $(self).parent().next().children().html((price*n).toFixed(2));
        sub();
    };


var sub=function(){
    //总价
    var sub=0;
    $("#cart .totle span").each(function(){
        sub+=parseFloat($(this).html())
    });
    //容器
    $("#cart_footer>div>span").html(sub.toFixed(2));
};





});//0
