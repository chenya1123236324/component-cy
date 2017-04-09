/**
 * Created by xiyuan on 17-3-9.
 */
define(function () {
    var $date=$FRAME.lib.$date;
    //列表字段数据转换
    function gridFieldIConvert(fieldInfo, gridApiConf) {
        var subjoin = '',
            colModel = {
                //字体 对齐方式
                align: "center",
                name: fieldInfo.columnName
            },
            fieldKey = fieldInfo.moduleCode + '_' + fieldInfo.phyColumnName;

        //字段类型检查
        switch (Number(fieldInfo.showColValSet)) {
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
                switch (Number(fieldInfo.showType)) {
                    case 1:
                        switch (fieldInfo.colMark) {
                            case 'money':

                                colModel.callback = function (data) {
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
                        colModel.listConfig= function (data, rowData, index) {
                            if(!data)return '';
                            switch (fieldInfo.dateType) {
                                case 'date':
                                    data = $date.convert(data, 'yy-mm-dd');
                                    break;
                                case 'time':
                                    data = $date.convert(data, 'hh:ii:ss');
                                    break;
                                case 'datetime':
                                default:
                                    data = $date.convert(data, 'yy-mm-dd hh:ii:ss');
                                    break;
                            }
                            return {
                                content: data
                            }
                        };
                        //添加数据回调处理
                        colModel.callback = function (data, colData) {
                            if(!data)return '';
                            switch (fieldInfo.dateType) {
                                case 'date':
                                    data = $date.convert(data, 'yy-mm-dd');
                                    break;
                                case 'time':
                                    data = $date.convert(data, 'hh:ii:ss');
                                    break;
                                case 'datetime':
                                default:
                                    data = $date.convert(data, 'yy-mm-dd hh:ii:ss');
                                    break;
                            }
                            return data;
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

                        subjoin = "_RNAME"
                        /*var fieldData = gridApiConf[1];
                        fieldData && function (filedInfo) {
                            filedInfo && filedInfo.columnId == fieldInfo.id && (subjoin = "_RNAME");
                        }(fieldData[fieldInfo.columnCode])*/
                }
        }

        fieldInfo.fieldKey = fieldKey;
        //字段
        colModel.field = fieldKey + subjoin;

        return colModel;
    }

    var _struct={
        //数据接口 ,没有则不请求网络数据,需自行在数据过滤函数中返回
        // "url": "./serverData/data/list/grid.data",
        //网络请求的类型 如: POST | GET
        "method": "GET",
        //页面数据展示的条数
        "pageSize": 20,
        //页面可选展示的条数
        "pageSizeList": [10, 20, 30],
        //数据默认排序 [ asc | desc ]
        order: "asc",
        //排序的字段
        "orderField": "id",
        //数据请求时候发送的附带数据
        "sendData": {},
        //列表左边操作
        "leftColsModel": [],
        //字段模型
        "colsModel": [],
        //行事件处理
        events: {
            click: function () {
            }
        },
        /**
         * 数据初始化配置
         * @param resData
         * @param $interface
         */
        dataInitConf: function (gridListData, $interface) {
            //往开发作用域中存储列表数据
            $interface.developScope.gridListData = gridListData;
        }

    };

    return function (apiData,fieldInfo) {

        var viewId=fieldInfo.selectViewId,
            columnList=apiData.columnList,
            struct ={}.extend(_struct),
            showFieldInfo={},
            i=~0,
            l=columnList.length;

        while (++i<l){
            columnList[i].id === fieldInfo.selectShowColId && (showFieldInfo=columnList[i])
            break
        }

        fieldInfo.selectShowColKey=gridFieldIConvert(showFieldInfo).field;

        struct.sidx=apiData.sidx.sidx;
        struct.order=apiData.sidx.order;



        struct.leftColsModel=[];
        struct.colsModel=apiData.showColumnList.reduce(function(arr,val,index){
            arr[index]=gridFieldIConvert(val);
            return arr;
        },[]);

        /**
         * 数据过滤
         * @param data
         * @param [callback]
         */
        struct.filtration=function (sendData, callback) {

            $FRAME.server({
                serverType:'api',
                url:'gridStructure'
            }).success(function (res) {
                callback({
                    "dataCount": res.totalRecord,
                    "dataList": res.record.reduce(function(arr,val,index){
                        arr[index]=val;
                        return arr;
                    },[])
                })
            }).fail(function () {

            }).send({
                viewId:viewId,
                order:sendData.order,
                sidx:sendData.orderField,
                pageSize:sendData.pageSize,
                currentPage:sendData.pageNow
            });

        };

        return struct
    }
});