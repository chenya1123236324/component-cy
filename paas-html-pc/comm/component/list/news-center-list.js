//消息中心列表组件注册
newsCenterList(function($app,$appConfig){

    var listHtml='';
    //组件的HTML渲染
    function newsListRender(data,storageData){
        listHtml += '<ul class="news-center-ul">';
        if(data instanceof Array){
            //如果传过来的列表数据是个数组,遍历
            data.forEach(function(liData){
                listHtml+='<li>';
                //遍历li的list,拼div
                liData.list.forEach(function(divData){
                    listHtml+='<div class="'+divData.className+'"><i class="iconfont '+divData.list[0].icon+'"></i><span>'+divData.list[1].content+'</span></div>';
                });
                listHtml+='</li>';
            });
        }
        listHtml+='</ul>';
        return listHtml;
    }



    $app.componentRegister('newsCenterList',{
        //指令优先级 降序执行
        priority: 0,
        //引入的工具类
        tools: [],
        //只调用一次，在指令第一次绑定到元素上时调用。
        handle:function(){
            var oleElement = this.$element;

            //数据存储器
            var storageData = {
                uid:0,
                assign:{

                }
            }

            //监听数据
            this.watchAttrData('data',function(data){

                listHtml = newsListRender(data,storageData);


                console.log('++++++++',data)
                // console.log('listHtml',listHtml)
                oleElement.parentNode.replaceChild(this.viewVM(listHtml,storageData.assign),oleElement);
            }.bind(this))

        }
    })




})
