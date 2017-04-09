/**
 * Created by xiyuan on 16-12-28.
 */
define(function () {

    var count=2,
        dataStorage={},
        resModel=$FRAME.$model();

    return function (pageBackMenu,homeMenu) {

        if(count){
            pageBackMenu.readData(function (pageBackMenu) {
                dataStorage.pageBackMenu=pageBackMenu;
                if(!--count){
                    resModel.write(dataStorage);
                }
            });

            homeMenu.readData(function (homeMenu) {
                dataStorage.homeMenu=homeMenu;
                if(!--count){
                    resModel.write(dataStorage);
                }
            });
        }

        return resModel;
    }

});