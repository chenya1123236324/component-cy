/**
 * Created by 贝贝 on 2016/11/4.
 */
//右侧tab导航栏
controller('right-nav',function () {

    var rightNavModel = this.model('@tab:right-nav');

    this.assign('tabRightNavModel',rightNavModel);

    this.display();
});

//左侧tab导航栏
controller('left-nav',function () {

    var leftNavModel = this.model('@tab:left-nav');

    this.assign('tabLeftNavModel',leftNavModel);

    this.display();
});

//顶部tab导航栏(字段-视图-操作)
controller('top-nav',function () {
    var tabTopNavModel = this.model('@tab:top-nav');
    this.assign('tabTopNav',tabTopNavModel);
    this.display();
})

//字典类别列表与搜索
controller('dictionary-list',function(){
    var dicModel = this.model('@tab:dictionary-list');
    this.assign('dicListModel',dicModel);

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

    this.display();
})