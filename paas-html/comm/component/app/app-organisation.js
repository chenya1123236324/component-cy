/**
 * Created by xiyuan on 17-1-13.
 */
appOrganisation(function ($app, $appConfig) {

    var template='<div class="app-organisation"><div class="app-organisation-content">' +
        '<div class="org-header">' +
            '<div class="org-title"><div><i class="iconfont icon-zuzhijiagou"></i><span>组织架构</span></div></div>' +
            '<div class="org-user-title"><div><span>请选择成员</span><input type="text" class="iconfont" placeholder="&#xe734;&nbsp;搜索"></div></div>' +
        '</div>' +
        '<div class="org-nav">' +
            '<div class="table-cell"><input type="text" class="iconfont" placeholder="&#xe734;  &nbsp;请输入搜索的部门..."></div>' +
            '<div class="table-cell"><ul class="org-title-list"><li>操作</li><li>姓名</li><li>手机号码</li><li>创建时间</li></ul></div>' +
        '</div>' +
        '<div class="org-main">' +
            '<div class="org-tree"><list-tree config="orgTree"></list-tree></div>' +
            '<div class="table-cell"><div class="org-list-container">' +
                '<div class="org-list-content"><form $-form="formApi"><ul class="org-list" $-for="userInfo in userInfoList"><li><input class="small" $-value="userInfo|userMapsAndVal:[$,userMaps]" $-on:change="userInfo|changeHandle:[$,res]" type="radio" name="org_user"></li><li>{{userInfo.realName}}</li><li>{{userInfo.mobile}}</li><li>{{userInfo.createTime|Date}}</li></ul></form></div>' +
                '<div class="org-list-footer"><span>当前 {{userInfoList|len}} 条数据</span></div>' +
            '</div></div>' +
        '</div>' +
        '</div></div>',
        filter={
            len:function (arr) {
                return arr.length||0
            },
            userMapsAndVal:function (userInfo,userMaps) {
                userMaps[userInfo.roleIds]=userInfo;
                return userInfo.roleIds;
            },
            changeHandle:function (userInfo,res) {
                return function () {
                    res.userInfo=userInfo;
                }
            }
        };


    //组织机构组件
    $app.componentRegister('appOrganisation', {
        //指令优先级 降序执行
        priority: 1000,
        //只调用一次，在指令第一次绑定到元素上时调用。
        handle: function () {

            var ele=this.$element,
                selectOrgInfo=null,
                orgTreeModel=$FRAME.model('HOME@custom/commApi:orgList'),
                userInfoListModel=$FRAME.model('HOME@custom/commApi:userInfoList'),
                scope={
                    orgTree:null,
                    userInfoList:[],
                    formApi:null,
                    userMaps:{},
                    res:{
                        userInfo:null
                    }
                },
                //组件渲染
                newEle=this.viewVM(template,scope,filter).firstChild,
                //组件对外提供接口
                $interface= this.attrToVM('api');

            //数据接口功能定义
            $interface.write({
                //获取选择的数据
                getSelectData:function () {
                    return scope.res.userInfo?{
                            orgInfo:selectOrgInfo,
                            userInfo:scope.res.userInfo
                        }:null;

                }.bind(this)
            });

            //元素更替
            ele.parentNode.replaceChild(newEle,ele);

            //组织树监听
            orgTreeModel.readData(function (orgTree) {

                //tree事件注入
                orgTree.actions={
                    click:function (eve,treeInfo) {
                        selectOrgInfo=treeInfo;
                        scope.res.userInfo=null;
                        //获取model数据
                        userInfoListModel.method('getData',treeInfo.orgCode);
                    }
                };
                //组织树数据传递
                scope.orgTree=orgTree;
            });

            //用户列表监听
            userInfoListModel.watch(function (data) {
                scope.userInfoList=data;
            });

            this.watchAttrData('config',function ($config) {
                //组织树数据请求处理
                orgTreeModel.method('getData',$config.orgCode);
            });

        }
    });
});