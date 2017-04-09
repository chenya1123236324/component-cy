/**
 * Created by xiyuan on 17-1-3.
 */
appLocation(function ($app, $appConfig) {
    var template='<div class="app-location"><strong>当前位置:</strong><p $-if="!isInit">加载中<span class="loading-spinners"></span></p>' +
            '<a $-for="infoConf in innerConf.childrenConf"><span>{{infoConf.name}}</span><ul>' +
            '<li $-for="info in infoConf.list">{{info.name}}</li>' +
            '</ul></a></div>',
        filter={},
        //数据转换
        conversion=function (locationConf,nodeList) {
            var isPass,
                selectInfo;

            if(locationConf){

                if(!nodeList){
                    (nodeList=[]).push(locationConf);
                    isPass=true;
                }else if(locationConf.select){
                    nodeList.push(locationConf);
                    isPass=true;
                }else{
                    return false;
                }

                if(isPass && locationConf.list){
                    locationConf.list.forEach(function (info) {
                        selectInfo =conversion(info,nodeList)?true:selectInfo;
                    });
                    if(!selectInfo){
                        var lastInfo=locationConf.list[locationConf.list.length-1];
                        if(lastInfo){
                            lastInfo.select=true;
                            conversion(lastInfo,nodeList)
                        }
                    }
                }
            }
            return nodeList;
        };

    $app.componentRegister('appLocation', {
        handle: function () {
            var oldElement=this.$element,
                scope=window.pp={
                    innerConf:{
                        childrenConf:[]
                    },
                    locationConf:null,
                    isInit:false
                },
                element=this.viewVM(template,scope,filter).firstChild;

            //更换成新元素
            oldElement.parentNode.replaceChild(element, oldElement);

            this.watchAttrData('config',function (locationConf) {
                scope.isInit=true;
                scope.locationConf=locationConf;
                scope.innerConf.childrenConf=conversion(locationConf);
            }.bind(this));

        }
    });
});