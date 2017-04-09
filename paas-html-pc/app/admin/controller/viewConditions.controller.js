/**
 * Created by 贝贝 on 2016/12/1.
 */
//视图条件配置
controller('viewConditions',function () {
//==================================================================================
    this.title('视图条件配置');
//===================================================================================

    //新增按钮receive的数据
    var commConf=this.model();
    this.assign('commConf',commConf);

    //grid组件API(提供一个空的model ,可以往里面写数据)
    var gridApi=this.model();
    this.assign('gridApi',gridApi);


    //grid组件
    var gridConfModel = this.model('@viewConditions:viewConditionsList');
    gridConfModel.method('getApi',gridApi);
    this.assign('gridConf',gridConfModel);

    //组织架构树
    var treeDataModel = this.model('@viewConditions:treeConf');
    treeDataModel.method('getTreeList',gridConfModel,gridApi,commConf);
    this.assign('treeConf',treeDataModel);

    //过滤器(查询tree)
    this.filter('searchFilter',function (searchValue,treeSearch) {
        return function () {
            treeSearch(searchValue);
        }
    });

    //tree的增删改操作
    this.assign('bussinessEvent',{
        add:function(){
            alert('添加业务类型--调用dialog');
            //调用dialog
        },
        edit:function(){
            //获取当前编辑行的节点和文本
            var cont = this.parentNode.parentNode.querySelector('.dic-type-txt');
            var txt = cont.innerHTML;

            //点击编辑时,先判断是否有正在编辑的项,如果有提示并return,没有才执行下面的
            var edits = document.querySelector('.tab-left-nav').querySelector('.type-edit');

            if (cont.childNodes[0].value) {
                //如果是编辑状态 , 点击进行保存
                cont.innerHTML = cont.childNodes[0].value;
                this.classList.remove('icon-baocun', 'type-edit');
                this.classList.add('icon-xieyoujian');

            } else {
                cont.innerHTML = "<input type='text' value='" + txt + "' style='width: 100px;'/>";
                this.classList.remove('icon-xieyoujian');
                this.classList.add('icon-baocun', 'type-edit');
            }

        },
        blur:function(){
            var cont = this.parentNode.parentNode.querySelector('.dic-type-txt');
            console.log(cont.innerHTML)
            if(cont.childNodes[0].value){
                alert('请保存修改')
            }
        },
        delete:function(){
            alert('删除业务类型--调用确认插件');
            //调用确认插件
        }
    });

    // 模糊查询
    var fuzzyQueryModel = this.model('COMPONENT@fuzzyQuery:fuzzyQuery');
    // this.assign('fuzzyQueryData',fuzzyQueryModel);

    //按钮
    var btnGroupMeModel = this.model('@viewConditions:viewConditionsBtnGroup');
    btnGroupMeModel.method('getGridApi',gridApi);
    this.assign('btnGroupMe',btnGroupMeModel);

    this.assign('layoutBaseConf',this.model('@layout:base'));

    this.layout('@layout:base','tpl').display();
})