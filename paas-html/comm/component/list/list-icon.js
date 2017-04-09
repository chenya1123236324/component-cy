/**
 * Created by xiyuan on 17-2-14.
 */
listIcon(function ($app,$appConfig) {

    var template='<ul class="list-icon"><li $-on:click="iconName|selectFocus:[$,innerConf]" $-class="{focus:innerConf.selectKey ==iconName }" $-for="(iconName,iconVal) in iconList"><i $-parses:class="iconfont icon-{{iconName}}"></i></li></ul>',
        iconList={"153":"e65b","genzongmubiaoshezhi":"e62a","sousuo":"e64f","sort-small":"e642","qian2":"e614","iconfontxitongshezhi":"e60b","gong":"e600","xinzengwenjianjia":"e65f","zhoujie":"e603","mima":"e677","gongwenbao":"e691","rili":"e692","kaohechengji":"e615","naozhong":"e66a","gerenzhongxin":"e63f","dengpao":"e683","chanpin":"e680","iconjian":"e643","caidan-dingdan":"e681","xinxi1":"e765","shezhi1":"e61c","shezhi":"e609","left":"e61b","jiahao":"e66d","shanchu":"e655","down":"e610","add":"e61d","dingdan":"e67a","xinxi":"e60a","pinggu":"e62c","diyxuanchuanye":"e61f","iconfontcolor34":"e648","yonghuming":"e678","jihui":"e62b","jia":"e641","jiequ2":"e601","shizhong":"e66b","baoji":"e62d","lianxiren":"e62e","money":"e62f","shuxian":"e607","dizhi":"e630","list":"e620","xiala":"e608","chenggong":"e6a1","jingzhengduishou01":"e687","list1":"e644","biaoti":"e621","jinggaofull":"e6a2","notification":"e646","search":"e622","mima1":"e679","list2":"e645","shuxian1":"e651","ok":"e605","lianxiren1":"e616","gongyingshang":"e631","close":"e715","disanfangdanbao":"e632","1195zaimouxingxiamianxinzeng":"e660","mp-report-des":"e67c","right":"e612","kehugenjin":"e682","tubiaodiaozheng321":"e63e","huo":"e688","news":"e689","tuichu":"e64c","icon4":"e64b","liwu":"e68a","sousuoleibie":"e69e","kehu":"e617","location":"e667","mail":"e623","quanxianshezhi":"e60c","camera":"e668","image":"e66e","yusan":"e693","heilongjiangtubiao03":"e694","qita":"e633","tijiao":"e624","jiahao2":"e640","fanhui":"e653","menu":"e602","icon04":"e671","color":"e695","iconfontchanpin":"e656","richeng":"e67d","xiaoxigonggaotongzhi":"e647","gongyongshiye":"e634","sjiantou02":"e66f","fapiao":"e684","lianxiren11":"e625","jingbaodeng":"e696","aims":"e68b","jianhao":"e675","addplan":"e661","zhongdiangenjin":"e685","right1":"e6a7","fenlei":"e619","youjiantou-copy":"e613","shoulileixing":"e65c","laba":"e68c","jiantou-copy":"e6a9","qiandao":"e657","angle-right":"e611","lianxiren2":"e626","liebiao-copy-copy":"e61e","xiaoshou":"e635","labeltag":"e658","xinghao":"e6a0","fengsu2":"e636","company-info":"e60d","fuwuqiguanli":"e672","disabled":"e6a3","shouxinguanli":"e637","tttt":"e669","sjiantou04-copy":"e670","xieyoujian":"e64d","yinzhang":"e68d","yidongduan":"e60e","hetong":"e638","xiangqing":"e627","caidan":"e64e","server":"e673","qukong":"e618","triangle-right-copy":"e64a","wenjianjia":"e650","ribaogao":"e639","qianming":"e659","upload":"e628","zidingyi":"e697","qiandao1":"e67e","xiangqing1":"e629","down-copy-desc":"e69c","baocun":"e69f","down-copy-asc":"e69d","jihuazhouqi":"e63a","chaxun":"e68e","wenzhangliebiao":"e68f","liebiao-copy":"e61a","setting":"e60f","yinxing":"e63b","xinzengshangjialianxiren":"e662","zuzhijiagou":"e654","baojiadan":"e686","renwuleixing":"e65d","xinzeng":"e663","hot":"e604","shuju":"e698","chenghao":"e676","wendang":"e699","filexinzeng":"e664","icon":"e690","qudao":"e63c","1196zuixiamianxinzengyixing":"e665","anquan":"e69a","shizhong1":"e66c","yonghu":"e6a8","xiaoxixinxi":"e649","souqiye":"e674","group12":"e67b","index-copy":"e606","xinzengyibiaopananniu":"e666","yiliao":"e63d","xiaoxi":"e652","qianyue":"e65a","appleixing":"e65e","tongjizhoubao":"e67f","suoxiao":"e6a4","caidanlianxiren":"e69b","5_2xitongrizhi":"e733","fangda":"e6a5","suoxiao1":"e6a6","search-input":"e734"},
        filter={
            selectFocus:function (iconName,innerConf) {
                return function () {
                    innerConf.selectKey=iconName;
                    typeof innerConf.iconConf.select === 'function' && innerConf.iconConf.select(iconName);
                }
            }
        };

    //图标组件注册
    $app.componentRegister('listIcon', {
        //指令优先级 降序执行
        priority: 0,
        //只调用一次，在指令第一次绑定到元素上时调用。
        handle: function ($object,$type,$net) {
            var scope={
                    innerConf:{
                        selectKey:'',
                        iconConf:{}
                    },
                    iconList:iconList
                },
                tagContainer=this.$element,
                iconListEle=this.viewVM(template,scope,filter).firstChild;

            //组件标签替换成grid的元素
            tagContainer.parentNode.replaceChild(iconListEle,tagContainer);

            //grid配置监听
            this.watchAttrData('config',function (iconConf) {
                scope.innerConf.iconConf=iconConf;
            });

        }
    });

});