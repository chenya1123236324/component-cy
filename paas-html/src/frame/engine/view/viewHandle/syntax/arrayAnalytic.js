/**
 * Created by xiyuan on 16-7-14.
 */

/*数组解析*/
function arrayAnalytic($pageAssign,fn) {
    var arrayTree=new behaviorTree($pageAssign,function () {

        //规则重写
        this.rule.start = [
            {
                v: ['['],
                type:'start'
            }
        ];

        this.rule.end = [
            {
                v: [']'],
                type:'end'
            }
        ];

        //参数分割
        this.rule.split = [
            {
                v: [','],
                type:'split'
            }
        ];

        //行为顺序
        this.order = {
            //进入语法解析状态
            start: [
                'selfAssignment',
                'decorate',
                'variable',
                'end'
            ],
            //自赋值/自运算
            selfAssignment: [
                'variable',
                'arithmetic',
                'deviation',
                'end'
            ],
            //修饰符号
            decorate: [
                'variable',
                'selfAssignment',
                'decorate'
            ],
            //变量 数据
            variable: [
                'end',
                'selfAssignment',
                'arithmetic',
                'split',
                'deviation',
                'end'
            ],
            //运算 (常规 加减乘除 与或非 ~ 三元运算 以及 数据过滤)
            arithmetic: [
                'decorate',
                'variable'
            ],
            //变异的运算
            deviation: [
                'deviation',
                'arithmetic',
                'end'
            ],
            split:[
                'decorate',
                'variable',
                'start',
                'end'
            ],
            end: [
                'start'
            ]
        };

    });

    //注入对象修改 (用于修改原有的对象属性或方法)
    typeof fn === 'function' && fn.bind(arrayTree)(arrayTree);

    return arrayTree;
}
