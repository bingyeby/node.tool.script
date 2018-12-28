define("mod/mod1", [ "./mod2" ], function(require, exports, module) {
    require("./mod2");
    console.log("mod1加载完毕");
});define("mod/mod2", [], function(require, exports, module) {
    console.log("mod2加载完毕");
});