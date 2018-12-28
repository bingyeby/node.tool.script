define("app/login", [ "jquery", "/js/asdf/asdf", "bootstrap", "mod/mod2" ], function(require, exports, module) {
    var $ = require("jquery");
    require("/js/asdf/asdf");
    console.log(111);
    require("bootstrap");
    require("mod/mod2");
});define("mod/mod2", [], function(require, exports, module) {
    console.log("mod2加载完毕");
});