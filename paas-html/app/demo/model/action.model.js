/**
 * Created by xiyuan on 17-2-26.
 */
model('drag',function () {
   this.server({
       serverType:'jsonp',
       method:'drag',
       url: $FRAME.getConfig('PATH.FRAME_ROOT')+'/serverData/config/action/drag.js'
   }).receive(function (res) {
       this.$model = res;
   }.bind(this)).send();
});

model('dragEdit',function () {
   this.server({
       serverType:'jsonp',
       method:'drag',
       url: $FRAME.getConfig('PATH.FRAME_ROOT')+'/serverData/config/action/dragEdit.js'
   }).receive(function (res) {
       this.$model = res;
   }.bind(this)).send();
});