// 编译包
var run=require('BF-task');

//编译配置
config={
    option:{
        path:{
            src:'./src/frame',
            dest:'./frame'
        }
    },
    task:{
        js: {
            boot: {
                src: '{option.path.src}/boot.js',
                dest: '{option.path.dest}/{:name}{:suffix}',
                mode: 'b'    //b:美化   c:压缩
            }
        }
    }
};

run(config);

