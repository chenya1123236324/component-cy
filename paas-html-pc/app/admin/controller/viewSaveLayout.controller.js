/**
 * Created by chenya on 2017/3/11.
 */
//保存布局
controller('viewSaveLayout',function () {
    this.title('保存布局');

    var viewId=1215,
        formInfoData=this.model('@moduleConfig/viewSaveLayout:formInfoData');

    formInfoData.method('getData',viewId);

    //提供表单信息数据
    this.assign('formInfoData',formInfoData);

    //提供拖拽数据配置
    this.assign('dragConf',this.model('@moduleConfig/viewSaveLayout:drag'));

    this.filter('dragConfHandle',function (dragConfs,fieldInfo,formInfoData,index,module) {
        //创建拖拽配置
        var dragConf={}.extend(dragConfs,{container:[]}),
            listConf=formInfoData.fieldConvert(fieldInfo);
        //提取并处理拖拽的数据配置
        formInfoData.formInfo.formConf.forEach(function (containerInfo,index) {

            dragConf.container.push({
                element: function () {
                    return document.querySelectorAll('.form-layout-edit')[index];
                },
                innerhandle: {
                    elements: 'ul>li',
                    in: function (e) {
                        this.target.classList.add('in');

                    },
                    out: function (e) {
                        this.target.classList.remove('in');
                    },
                    end:function (e,$element) {

                        console.log(this.data)
                        if(formInfoData.formInfo.formConf[index].list.indexOf(this.data.formField) === -1){

                            $packages('{PLUGINS}/hint/hint-loading',function ($loading) {
                                var loadingPlugins=$loading('字段渲染处理中...');

                                loadingPlugins.open();

                                setTimeout(function () {

                                    //检查父节点是否存在
                                    if(this.target.parentNode){
                                        var locaIndex=[].slice.call(this.target.parentNode.childNodes).indexOf(this.target);

                                        console.log($element);
                                        $element.parentNode.removeChild($element);

                                        formInfoData.formInfo.formConf[index] .list.splice(locaIndex,0,this.data.formField)
                                        //移除左边菜单中的数据
                                        // formInfoData.notUsedFields.splice(locaIndex,1);
                                    }
                                    loadingPlugins.close();

                                    setTimeout(function () {
                                        loadingPlugins.state && loadingPlugins.close();
                                    },100)

                                }.bind(this),500)

                            }.bind(this))
                        }
                    }
                },
                data:containerInfo,
                //进入/开始
                start: function (info) {
                    // console.log('start',info)
                },
                //移动
                move: function (info) {
                    // console.log('move',info)
                },
                //离开/结束
                end: function (info) {
                    // console.log('end',info)
                }
            })
        });

        //提供拖拽组件额外数据（以备form表单渲染）
        dragConf.data={
            index:index,
            module:module,
            fieldInfo:fieldInfo,
            formField:listConf,
            formInfoData:formInfoData
        };

        var showName='显示字段',
            hiddenName='隐藏字段',
            showIcon='icon-show',
            hiddenIcon='icon-hidden';

        listConf.actions=[
            {
                icon:listConf.hidden?showIcon:hiddenIcon,
                color:'#59abff',
                name:listConf.hidden?showName:hiddenName,
                trigger:function (e,data,rowEle) {
                    var name=showName,
                        icon=showIcon;

                    if(this.icon === showIcon){
                        icon=hiddenIcon
                        name=hiddenName
                    }

                    data.rowData.hidden=!data.rowData.hidden;
                    this.icon=icon;
                    this.name=name;
                }
            },
            /*{
                icon:'icon-shezhi',
                color:'#59abff',
                name:'设置',
                trigger:function () {

                }
            },*/
            {
                icon:'icon-shanchu',
                color:'#ff7e7e',
                name:'移除',
                trigger:function (e,data) {
                    $packages('{PLUGINS}/hint/hint-loading',function ($loading) {
                        var loadingPlugins = $loading('字段删除处理中...');
                        loadingPlugins.open();
                        setTimeout(function () {
                            data.layoutConfig.list.splice(data.index, 1);
                            setTimeout(function () {
                                loadingPlugins.state && loadingPlugins.close();
                            },100)
                        }.bind(this),500)
                    });
                }
            }
        ]
        return dragConf;
    })

    this.assign('submit',function (formList) {
        return function () {
            var sendData={
                viewId:viewId,
                showColumn:[],
                viewGroupList:[]
            }
            formList.forEach(function (formInfo) {
                sendData.viewGroupList.push({
                    name:formInfo.name,
                    columnAssemble:formInfo.list.reduce(function(arr,val,index){
                        arr[index]=val.id;
                        if(!val.hidden){
                            sendData.showColumn.push(val.id)
                        }
                        return arr;
                    },[]).join(',')
                })
            })
            sendData.showColumn=sendData.showColumn.join(',')

            formInfoData.method('submit',sendData,function () {
                $packages('{PLUGINS}/hint/hint-message',function ($message) {
                    $message('布局保存成功！');
                })
            });

        }
    })

    this.assign('layoutBaseConf',this.model('@layout:base'));

    this.layout('@layout:base','tpl').display();
})