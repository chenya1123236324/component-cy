<!--<input type="button" value="点我" $-on:click="stage.clickEvent">-->

<!--tip三种类型:
    错误error(信息不全等错误提示);
    成功success;
    通知notice(底部)-->
<div $-on:click="tipApi.show" style="width: 50px;height: 30px;background-color: red">lalal</div>
<tip type="error" api="tipApi">请把必填项填写完整!</tip>

<tip type="success">信息已提交</tip>

<tip type="notice">尊敬的用户,我们的后台服务已经完成升级工作,我们将不断提升售后服务品质,感谢您对我们的支持!</tip>


<!--tip组件结构-->
<!--<div class="tip">请把必填项填写完整!</div>-->
<!--<div style="position: relative; top: 100px;left: 0;">-->

    <!--<div class="tip tip-notice">-->
        <!--<i class="iconfont icon-jinggaofull"></i>-->
        <!--<span>尊敬的用户,我们的后台服务已经完成升级工作,我们将不断提升售后服务品质,感谢您对我们的支持!</span>-->
        <!--<span class="close">-->
            <!--<i class="iconfont icon-chenghao"></i>-->
        <!--</span>-->
    <!--</div>-->
<!--</div>-->
