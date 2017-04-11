/**
 * Created by xiyuan on 16-11-21.
 */
controller('index',function () {
    var pageTitle='列表页面演示';

    this.title(pageTitle);
    this.assign('pageTitle',pageTitle);

    this.layout().display();
});

controller('grid',function () {
    var pageTitle='grid演示';

    this.title(pageTitle);
    this.assign('pageTitle',pageTitle);

    this.assign('gridConf',this.model('@list:gridConf'));

    this.display();
});

controller('tree',function () {
    var pageTitle='tree演示';

    this.title(pageTitle);
    this.assign('pageTitle',pageTitle);

    this.assign('treeConf',this.model('@list:treeConf'));

    this.assign('class','fsdf sdfsd ppp');

    this.filter('testTreeApi',function (treeApi) {
       return function () {
           console.log(treeApi,treeApi.getSelect())
       }
    });

    this.filter('searchFilter',function (searchValue,treeSearch) {
        return function () {
            treeSearch(searchValue);
        }
    });

    this.display();
});