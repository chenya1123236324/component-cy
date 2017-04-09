/**
 * Created by xiyuan on 16-9-29.
 */

//消息中心列表
controller('news-center-list',function(){

    var newsMenuModel = this.model('@list:news-center-list');
    this.assign('newsCenterList',newsMenuModel);
    this.display();
});

//ztree
controller('ztree-list',function(){

    var ztreeListModel = this.model('@list:ztree-list');
    this.assign('treeData',ztreeListModel);
    this.display();
})

//高级检索组件  advanced-search
controller('advanced-search',function () {
    //得到默认查询标签按钮数据 【defaultQueryTag的名称不可改变！！！】
    var defaultQueryTag = this.model('@defaultQueryTag:defaultQueryTag');
    this.assign('defaultQueryTag',defaultQueryTag);
    //得到高级检索内容中保存、清空按钮数据【advancedSearchSave的名称不可改变！！！】
    var advancedSearchSave = this.model('@list:advancedSearchSave');
    this.assign('advancedSearchSave',advancedSearchSave);

    //得到高级检索中新增的标签
    var newAddQueryTag = this.model('@list:newAddQueryTag');
    this.assign('newAddQueryTag',newAddQueryTag);
    //得到高级检索中select下拉框中的数据
    var searchSelect=this.model('@list:searchSelect');
    this.assign('searchSelect',searchSelect);

    this.display();
});

//dataGrid 组件
/*
controller('data-grid',function () {
    //得到diglog按钮数据
    var gridDialogButton = this.model('@list:gridDialogButton');
    this.assign('dialogButton',gridDialogButton);

    //得到dialog模板拼接数据
    var gridDialogData = this.model('@list:gridDialogData');
    this.assign('gridDialogData',gridDialogData);
    this.display();
});
*/

