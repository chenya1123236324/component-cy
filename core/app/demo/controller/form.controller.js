/**
 * Created by xiyuan on 16-11-30.
 */
controller('date',function () {
    var pageTitle='日期页面';
    this.title(pageTitle);
    this.assign('pageTitle',pageTitle);

    this.display();

});

controller('layout',function () {
    var pageTitle='表单布局';
    this.title(pageTitle);
    this.assign('pageTitle',pageTitle);

    this.assign('dragConf',this.model('@action:drag'));
    this.assign('formLayout',this.model('@form:layout'));

    this.display();
});

controller('valid',function () {
    var pageTitle='表单校验';
    this.title(pageTitle);
    this.assign('pageTitle',pageTitle);

    this.assign('valid',this.model('@form:valid'));

    this.display();
});

controller('select',function () {

    var pageTitle='select页面',
        style=this.model(function () {
            this.$model={
                width:100,
                color:'pink'
            };
        });

    this.title(pageTitle);
    this.assign('pageTitle',pageTitle);
    this.assign('style',style);

    setTimeout(function () {
        style.write({
            width:300,
            color:'red'
        });
    }.bind(this),3000)

    this.assign('selectConfig',this.model('@form:selectConfig'));

    this.assign('selectChange',function () {
        console.log(this.value)
    });

    this.display();

});

controller('drag',function () {
    var pageTitle='表单拖拽编辑';
    this.title(pageTitle);
    this.assign('pageTitle',pageTitle);

    this.assign('dragConf',this.model('@action:dragEdit'));
    this.assign('formLayout',this.model('@form:layoutEdit'));

    this.display();
});
