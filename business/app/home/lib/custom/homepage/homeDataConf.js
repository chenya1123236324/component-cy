
/**
 * Created by lei on 17-2-20.
 */
define(['../homepage/listDataExtract'],function (listDataExtract){
    var This = this;

    //列表接口数据转换
    function exportFunc(viewId,gridApiConf,createTime,titleColId) {

        var colList = gridApiConf.columnList;                  //所有字段列表
        var showCols = gridApiConf.showColumnList;                 //显示字段列表
        var btnList = gridApiConf.operationList;                  //按钮列表
        var relatedModule = gridApiConf.moduleRelatedMap;            //外键关系信息
        var operationConditions = gridApiConf.operationRuleList;      //操作条件
        var specialShowdata = gridApiConf.viewSpcShowList             //特殊显示条件
        var orderData = gridApiConf.sidx;                //:列表排序信息

        var gridConf;
        gridFieldInfo = {};


        //列表标题
        var resList=[];
        var fieldName;
        //遍历显示字段列表将colModel拼进数组
        if(showCols){
            showCols.forEach(function (menuInfo) {
                // console.log(menuInfo,"66666666666666")
                //列表字段数据转换
                var subjoin = '',
                    id = menuInfo.id;

                colModel = {
                    name: menuInfo.columnName,
                    align:'center',
                    //是否需要开启排序
                    order: true,
                },
                    fieldKey = menuInfo.moduleCode + '_' + menuInfo.phyColumnName;

                //字段类型检查
                switch (Number(menuInfo.showColValSet)) {
                    case 2:
                        subjoin = '_DNAME';
                        break;
                    case 3:
                        subjoin = "_ONAME";
                        break;
                    case 4:
                        subjoin = "_UNAME";
                        break;
                    case 5:
                        subjoin = "_RNAME";
                        break;
                    default :
                        switch (Number(menuInfo.showType)) {
                            case 1:
                                switch (menuInfo.colMark) {
                                    case 'money':

                                        colModel.listConfig = function (data) {
                                            return data ? Number(data).toLocaleString() : '';
                                        };

                                        break;
                                    case 'foreignkey':

                                        subjoin = "_RNAME";
                                        break;
                                }
                                break;
                            //时间类型
                            case 6:
                                //添加数据回调处理
                                colModel.listConfig = function (data, colData) {

                                    var newDate = new Date();
                                    newDate.setTime(data);

                                    if(!data)return '';
                                    switch (menuInfo.dateType) {
                                        case 'date':
                                            // data = $date.convert(data, 'yy-mm-dd');
                                            data = newDate.format('h:m:s');
                                            break;
                                        case 'time':
                                            // console.log(newDate,'=======================')
                                            data = newDate.format(('yyyy-MM-dd h:m:s'));
                                            break;
                                        case 'datetime':
                                            data = newDate.format('yyyy-MM-dd');
                                            break;
                                        default:
                                            data = newDate.format('yyyy-MM-dd');
                                            break;
                                    }
                                    return {
                                        content:data
                                    };
                                };
                                break;
                            case 7:
                                subjoin = "_SDNAME";
                                break;
                            case 8:
                                subjoin = "_FNAME";
                                break;
                            case 9:
                                subjoin = "_IMGNAME";
                                break;
                            default :
                                var fieldData = btnList;
                                fieldData && function (filedInfo) {
                                    filedInfo && filedInfo.columnId == menuInfo.id && (subjoin = "_RNAME");
                                }(fieldData[menuInfo.columnCode])
                        }
                }

                // menuInfo.fieldKey = fieldKey;
                //字段
                colModel.field = fieldKey + subjoin;

                //首页数据展示标题字段
                if(id === titleColId){
                    fieldName = fieldKey + subjoin;
                }

                resList.push(colModel);

            });
        }



        var fieldArr = {        //首页的列表数据集合
            configList:[]
        }

        listDataExtract(viewId,fieldName,gridApiConf,createTime,function (configList) {

            fieldArr.configList = configList;
        })

        return {
            fieldArr:fieldArr
        }

    }

    return exportFunc;


})