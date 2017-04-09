/**
 * Created by 贝贝 on 2016/12/12.
 */
//单层菜单组件
singleMenu(function ($app,$appConfig) {

    //tree数据检索
    function searchVal(srcList,searchValue) {

        //list数据克隆
        var newList=srcList.clone();

        //搜索处理,处理菜单的一条数据
        function serch(info) {
            //如果搜索的关键字匹配这条菜单数据,返回这条数据和匹配状态
            if(info.label.indexOf(searchValue) !== -1){
                return {
                    result:info,
                    state:'201'
                }
            }else{
             //如果不匹配,返回这调数据和不匹配状态
                return {
                    result:info,
                    state:'401'
                };
            }
        }

        //匹对处理
        (function getMatch(list){
            list=list||[];
            var state=null,
                info=null,
                res=null,
                rmKey=0,
                key=~0,
                len=list.length;
            while(++key<len){
                len-=rmKey;
                key-=rmKey;
                rmKey=0;
                info=list[key];
                res=serch(info);
                switch (res.state){
                    //匹对成功
                    case '201':
                        state=true;
                        break;
                    //匹对失败
                    case '401':
                        //删除匹配不上的数据
                        list.splice(list.in(info),1);
                        state =state ||false;
                        rmKey++;
                        break;
                }
            }
            return (state === null || state) ? true : false;
        })(newList);

        return newList;
    }

    var filter={
        //合并click事件
        clickConcat:function(){
            var ars=[].slice.call(arguments),
                index=ars.shift(),
                selectInfo=ars.shift(),
                dataInfo=ars.shift();

            return function (e) {
                ars.forEach(function (fn) {
                    typeof fn === "function" && fn.call(this,e,index,selectInfo,dataInfo);
                }.bind(this))
            }
        },
        //列表初始化
        init:function (selectInfo,selectOption,list) {
            //
            selectOption(null,0,selectInfo,list[0])
        },
        
        //接口处理
        interfaceHandle:function ($interface,singleMenuConf) {

            //源model的list数据
            var srcList=singleMenuConf.list;

            //对外提供single-menu搜索
            $interface.write({
                search:function (searchValue) {
                    singleMenuConf.list=searchVal(srcList,searchValue);
                }
            });
        }
        
    },
    template='<ul $-render="selectInfo|init:[$,selectOption,singleMenuConf.list]"><li $-bind:class="menuInfo.className" $-class="{active:selectInfo.selectOption == index}" $-for="(index,menuInfo) in singleMenuConf.list" $-on:click="menuInfo.events.click|clickConcat:[index,selectInfo,menuInfo,$,selectOption]"><span class="tli-content">{{menuInfo.label}}</span><span class="dic-btn"><i $-for="(index,btnInfo) in singleMenuBtn" class="iconfont" $-bind:class="btnInfo.icon" $-on:click="btnInfo.events.click"></i></span></li></ul>';

    $app.componentRegister('singleMenu',{
        priority:0,
        tools:[],
        handle:function () {
            var singleMenuContainer,
                oldElement = this.$element;

            //singleMenu API
            $interface =this.attrToVM('api');
            
            this.watchAttrData('config',function (singleMenuConf) {

                singleMenuContainer = this.viewVM('<div class="single-menu"  $-render="$interface|interfaceHandle:[$,singleMenuConf]">'+template+'</div>',{
                    singleMenuConf:singleMenuConf,
                    singleMenuBtn:singleMenuConf.button || [{icon:'',events:{click:function () {}}}],
                    selectInfo:{
                        selectOption:0
                    },
                    $interface: $interface,
                    selectOption:function (e,index,selectInfo,dataInfo) {
                        selectInfo.selectOption=index;
                        typeof singleMenuConf.select === 'function' && singleMenuConf.select(dataInfo);
                    }
                },filter).firstChild;

                oldElement.parentNode.replaceChild(singleMenuContainer,oldElement);

                oldElement = singleMenuContainer;
            }.bind(this))
        }
    })
});