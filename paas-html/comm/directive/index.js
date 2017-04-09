directiveRegister(function ($app,$appConfig) {

    var directivePath=$appConfig.FRAME_ROOT+'/comm/directive';

    /*扩展配置(组件引用)*/
    $app.extendConfig({

        //表单部分
        'model':directivePath+'/form/$-model.js',
        'value':directivePath+'/form/$-value.js',
        'checked':directivePath+'/form/$-checked.js',
        'del':directivePath+'/form/$-del.js',
        'form':directivePath+'/form/$-form.js',
        'submit':directivePath+'/form/$-submit.js',
        'valid':directivePath+'/form/$-valid.js',
        'validSwitch':directivePath+'/form/$-valid-switch.js',

        //事件绑定
        'on':directivePath+'/event/$-on.js',
        'events':directivePath+'/event/$-events.js',

        //公共部分
        'If': directivePath + '/comm/$-if.js',
        'cmd': directivePath + '/comm/$-cmd.js',
        'watch': directivePath + '/comm/$-watch.js',
        'render': directivePath + '/comm/$-render.js',
        'modelInit':directivePath+'/comm/$-model-init.js',
        'For': directivePath + '/comm/$-for.b.js',
        '$class':directivePath+'/comm/$-class.js',
        'show':directivePath+'/comm/$-show.js',
        'hidden':directivePath+'/comm/$-hidden.js',
        'slide':directivePath+'/comm/$-slide.js',
        'bind':directivePath+'/comm/$-bind.js',
        'style':directivePath+'/comm/$-style.js',
        'parses':directivePath+'/comm/$-parses.js',
        'parsesBind':directivePath+'/comm/$-parses-bind.js',
        'href':directivePath+'/comm/$-href.js',
        'src':directivePath+'/comm/$-src.js',
        'title':directivePath+'/comm/$-title.js',
        'url':directivePath+'/comm/$-url.js',

        //按钮部分
        'btnMaterial':directivePath + '/button/$-btn-material.js',

        //菜单部分
        'dropMenu':directivePath+'/menu/$-drop-menu.js',

        //动作指令（拖拽）
        'drag':directivePath+'/action/$-drag.js',

        //应用指令
        'app':directivePath+'/app/index.js',
    })

});
