<h1>{{pageTitle}}</h1>
<div>
    <form>
    <select name="dssd" style="width:102px;" config="selectConfig" $-on:change="selectChange"></select>

    <select name="ss" $-parses:style="width:{{style.width}}px;border:solid 1px {{style.color}}">
        <option value="1" selected>1</option>
        <option value="2" selected>2</option>
        <option value="3">3</option>
    </select>
        <button>submit</button>
    </form>
</div>