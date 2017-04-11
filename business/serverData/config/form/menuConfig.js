/**
 * Created by chenya on 2016/12/17.
 */
//菜单表单验证信息
menuValid({
    menuName: {
        require: {
            value: true,
            message: '菜单名称必填'
        },
        maxlen: 20,
        minlen: {
            value: 1,
            message: '菜单名称必填'
        },
    },
    menuOrder: {
        require: {
            value: true,
            message: '排序必填'
        },
        maxlen: 5,
        minlen: {
            value: 1,
            message: '排序必填'
        },
        regExp:{
            value:'^[1-9]\d*',
            message:'排序只能输入正整数'
        }
    },
    iconClass: {
        require: {
            value: true,
            message: '菜单样式必填'
        }
    },
    moduleId: {
        require: {
            value: true,
            message: '选择模块必填'
        }
    },
    viewId:{
        require: {
            value: true,
            message: '选择视图必填'
        }
    },
})