/**
 * @description youziku (service.youziku.com) javascript sdk
 * @author jamesbing 
 */
(function (w, d) {

    var youzikuClient = function (host) {

        var config = {
            Host: "http://service.youziku.com"
        }
        /**
         * @description 私有模块
         */
        var HttpModule = function () {
            this.getajax = function () {
                var XmlHttp;
                if (window.ActiveXObject) {
                    var arr = ["MSXML2.XMLHttp.6.0", "MSXML2.XMLHttp.5.0",
                        "MSXML2.XMLHttp.4.0", "MSXML2.XMLHttp.3.0", "MSXML2.XMLHttp", "Microsoft.XMLHttp"];
                    for (var i = 0; i < arr.length; i++) {
                        try {
                            XmlHttp = new ActiveXObject(arr[i]);
                            return XmlHttp;
                        }
                        catch (error) { }
                    }
                }
                else {
                    try {
                        XmlHttp = new XMLHttpRequest();
                        return XmlHttp;
                    }
                    catch (otherError) { }
                }
            };

            this.request = function (url, param, method, callback, failcallback) {
                if (typeof (host) === "undefined") {
                    host = config.Host;
                }
                url = host + "/" + url;
                var Xobj = this.getajax();
                try {

                    Xobj.open(method, url, true);

                    if (method === "POST" || method === "post") {
                        Xobj.setRequestHeader('Content-Type', 'application/json');

                    }

                    Xobj.onreadystatechange = function () {
                        if (Xobj.readyState === 4) {
                            if (Xobj.status === 200 || Xobj.status === 304) {
                                var response;
                                if (callback) {
                                    try {
                                        response = JSON.parse(Xobj.responseText);
                                    } catch (e) {
                                        response = Xobj.responseText;
                                    }
                                    callback(response);
                                }

                            } else if (Xobj.status === 404) {
                                if (failcallback)
                                    failcallback(Xobj);
                            }
                        }
                    };
                    Xobj.send(param);
                }
                catch (e) {
                    console.log("Ajax发送请求失败！错误信息:" + e);
                }
            }
        };

        /**
         * @description 单标签模块
         * @param {*} httpModule 
         */
        var WebFontModule = function (httpModule) {
            var path = "webfont";

            this.getFontFace = function (entity, callback, failcallback) {
                httpModule.request(path + "/getFontFace", JSON.stringify(entity), "POST", callback, failcallback);
            }

            this.getWoffBase64StringFontFace = function (entity, callback, failcallback) {
                httpModule.request(path + "/getWoffBase64StringFontFace", JSON.stringify(entity), "POST", callback, failcallback);
            }

            this.getEOTFontFace = function (entity, callback, failcallback) {
                httpModule.request(path + "/getEOTFontFace", JSON.stringify(entity), "POST", callback, failcallback);
            }

            this.getWoffFontFace = function (entity, callback, failcallback) {
                httpModule.request(path + "/getWoffFontFace", JSON.stringify(entity), "POST", callback, failcallback);
            }

        };


        /**
         * @description 多标签模块
         * @param {*} httpModule 
         */
        var WebFontBatchModule = function (httpModule) {

            var path = "batchWebFont";
            this.getBatchFontFace = function (entity, callback, failcallback) {
                httpModule.request(path + "/getBatchFontFace", JSON.stringify(entity), "POST", callback, failcallback);
            }

            this.getBatchEOTFontFace = function (entity, callback, failcallback) {
                httpModule.request(path + "/getBatchEOTFontFace", JSON.stringify(entity), "POST", callback, failcallback);
            }

            this.getBatchWoffFontFace = function (entity, callback, failcallback) {
                httpModule.request(path + "/getBatchWoffFontFace", JSON.stringify(entity), "POST", callback, failcallback);
            }
        }

        /**
         * @description 自定义路径模块
         * @param {*} httpModule 
         */
        var CustomPathModule = function (httpModule) {
            var path = "batchCustomWebFont";
            this.createBatchWebFontAsync = function (entity, callback, failcallback) {
                httpModule.request(path + "/createBatchWebFontAsync", JSON.stringify(entity), "POST", callback, failcallback);
            }

            this.createBatchEOTWebFontAsync = function (entity, callback, failcallback) {
                httpModule.request(path + "/createBatchEOTWebFontAsync", JSON.stringify(entity), "POST", callback, failcallback);
            }

            this.createBatchWoffWebFontAsync = function (entity, callback, failcallback) {
                httpModule.request(path + "/createBatchWoffWebFontAsync", JSON.stringify(entity), "POST", callback, failcallback);
            }
        }
        //
        var httpModule = new HttpModule();
        var youzikuModuleConfig = {
            WebFont: new WebFontModule(httpModule),
            BatchWebFont: new WebFontBatchModule(httpModule),
            CustomPathModule: new CustomPathModule(httpModule)
        }
        return new youzikuClient.prototype.init(youzikuModuleConfig);
    }

    youzikuClient.fn = youzikuClient.prototype = {
        init: function (youziku) {

            //=============================单标签=========================
            this.getFontFace = function (entity, callback, failcallback) {
                youziku.WebFont.getFontFace(entity, callback, failcallback);
            }
            this.getWoffBase64StringFontFace = function (entity, callback, failcallback) {
                youziku.WebFont.getWoffBase64StringFontFace(entity, callback, failcallback);
            }
            this.getEOTFontFace = function (entity, callback, failcallback) {
                youziku.WebFont.getEOTFontFace(entity, callback, failcallback);
            }
            this.getWoffFontFace = function (entity, callback, failcallback) {
                youziku.WebFont.getWoffFontFace(entity, callback, failcallback);
            }

            //=============================多标签=========================
            this.getBatchFontFace = function (entity, callback, failcallback) {
                youziku.BatchWebFont.getBatchFontFace(entity, callback, failcallback);
            }

            this.getBatchEOTFontFace = function (entity, callback, failcallback) {

                youziku.BatchWebFont.getBatchEOTFontFace(entity, callback, failcallback);
            }

            this.getBatchWoffFontFace = function (entity, callback, failcallback) {
                youziku.BatchWebFont.getBatchWoffFontFace(entity, callback, failcallback);
            }


            //=============================自定义路径=========================
            this.createBatchWebFontAsync = function (entity, callback, failcallback) {

                youziku.CustomPathModule.createBatchWebFontAsync(entity, callback, failcallback);
            }

            this.createBatchEOTWebFontAsync = function (entity, callback, failcallback) {
                youziku.CustomPathModule.createBatchEOTWebFontAsync(entity, callback, failcallback);
            }

            this.createBatchWoffWebFontAsync = function (entity, callback, failcallback) {

                youziku.CustomPathModule.createBatchWoffWebFontAsync(entity, callback, failcallback);
            }
        }
    }

    youzikuClient.prototype.init.prototype = youzikuClient.fn;

    w.YouzikuClient = youzikuClient;

})(window, document)