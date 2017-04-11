/**
 * Created by xiyuan on 16-11-21.
 */
controller('drop',function () {
    var pageTitle='下拉菜单';

    this.title(pageTitle);
    this.assign('pageTitle',pageTitle);

    this.assign('dropMenuConfig',{

        list:[
            {
                content:'栏目一'
            },
            {
                content:'栏目二'
            },
            {
                content:'栏目三'
            }
        ]
    });

    this.display();
});