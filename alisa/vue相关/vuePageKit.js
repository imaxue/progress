//var SERVERURL="";
//var HTMLURL="";

define(
    ['./enumGlobal.js?_r='+sessionStorage.releaseVersion],
    function (enumGlobal) {
        var _remoteDateTime = null, _num = 0;
        var _remoteDateTime30=null;
        _remoteDateTime= Date.parse(new Date());//获取当前时间戳 vuePageKit.getRemoteDate()=原来的window.serveTime。
        //alert(_remoteDateTime)
        // $.ajax({
        //     type: 'post',
        //     url: '/common/getDateTime',
        //     data: {},
        //     success: function (data) {
        //         _remoteDateTime = data.data;
        //     }
        //
        // });
        return {
            vueReg: /\w+Vue/i,
            ajaxQuene: [],
            //------------------ 以下都是工具方法     ------------------------------
            //vue实例化所需的参数
            vueData: function () {
                return {
                    el: '',
                    data: {},
                    methods: {}
                };
            },
            //返回vue实例
            vueBind: function (vueData) {
                return new Vue(vueData);
            },
            //解决this问题
            bind: function (_this, func, data) {
                var _this = _this;
                if (func == undefined) {
                    return ;
                }
                return function (e) {
                    return func.call(_this, e, data);
                };
            },
            // 不通过node访问接口的请求函数    （新中间件）
            // 将接口直接对线后台接口，
            // 返回的数据为{code：‘’，data:{},....}  最后返回 data数据
            getDataV1:function (options) {
                var XHR = null;
                if (window.XMLHttpRequest) {
                    XHR = new XMLHttpRequest();
                } else if (window.ActiveXObject) {
                    XHR = new ActiveXObject("Microsoft.XMLHTTP");
                }
                if (!XHR) {
                    return;
                }
                if(options.getHtml == undefined) {
                    var _ajaxObj = options.data;
                    var _isGroup = sessionStorage.isGroup;
                    if (_isGroup == '2') {
                        _ajaxObj.hotelId = sessionStorage.hotelId;
                    }
                    console.log(_ajaxObj.hotelId,_isGroup);
                    _ajaxObj.hotelCode = sessionStorage.hotelCode;
                    var sessionInfo = JSON.parse(sessionStorage.opInfo);
                    if(_ajaxObj.empId == null || _ajaxObj.empId == undefined){
                        _ajaxObj.empId = sessionInfo.empId;
                    }
                    _ajaxObj.empName = sessionInfo.employeeName;
                    _ajaxObj.groupId = sessionInfo.groupId;
                    _ajaxObj.empCode = sessionInfo.code;
                    _ajaxObj.token = sessionInfo.token;
                }
                if (options.type.toUpperCase() === 'GET') {
                    if (_ajaxObj) {
                        var _hrefExt = '';
                        for (var pro in _ajaxObj) {
                            _hrefExt += pro + '=' + _ajaxObj[pro] + '&';
                        }
                        if (_hrefExt.charAt(_hrefExt.length - 1) === '&') {
                            _hrefExt = _hrefExt.slice(0, -1);
                        }
                        options.url += '?' + _hrefExt;
                    };
                    if(options.getHtml == true){
                        XHR.open('GET',options.url);
                    }else{
                        XHR.open('GET',this.getServerUrl() + options.url);
                    }
                    XHR.send(null);
                }  else if (options.type.toUpperCase() === 'POST') {
                    XHR.open('POST', this.getServerUrl() + options.url);
                    XHR.setRequestHeader('content-type', 'application/json');
                    XHR.send(JSON.stringify(_ajaxObj));
                };
                XHR.onreadystatechange = function () {
                    options.success = options.success || options.callBack;
                    if (XHR.readyState == 4 && XHR.status == 200) {
                        if(options.getHtml == true){
                            var data = XHR.responseText;
                            options.success(data);
                            XHR = null;
                        }else{
                            var data = JSON.parse(XHR.responseText);
                            if (data) {
                                if (data.returnCode === 'yuju-1022') {
                                    alert(data.returnMsg);
                                    window.location = '/login.html?groupId='+sessionStorage.groupId+'&_t=' + Math.random();
                                    return ;
                                }
                            }
                            options.success(data);
                            XHR = null;
                        }
                    };
                };
            },
            getData: function (options) {
                $("#fullscreenLoadingSpan").css('display','block');

                var _ajaxObj = null;
                var requestType = 'post';
                var dataType = 'json';
                var contentType = 'application/json';
                if(options.getHtml == undefined) {
                    _ajaxObj = options.data;
                    var _isGroup = sessionStorage.isGroup;
                    if (_isGroup == '2') {
                        _ajaxObj.hotelId = sessionStorage.hotelId;
                    }
                    _ajaxObj.hotelCode = sessionStorage.hotelCode;
                    var sessionInfo = JSON.parse(sessionStorage.opInfo);
                    if(_ajaxObj.empId == null || _ajaxObj.empId == undefined){
                        _ajaxObj.empId = sessionInfo.empId;
                    }
                    _ajaxObj.empName = sessionInfo.employeeName;
                    _ajaxObj.groupId = sessionInfo.groupId;
                    _ajaxObj.groupCode = sessionInfo.groupCode;
                    _ajaxObj.empCode = sessionInfo.code;
                    _ajaxObj.token = sessionInfo.token;
                }
                if (options.type.toUpperCase() === 'GET') {
                    if (_ajaxObj) {
                        var _hrefExt = '';
                        for (var pro in _ajaxObj) {
                            _hrefExt += pro + '=' + _ajaxObj[pro] + '&';
                        }
                        if (_hrefExt.charAt(_hrefExt.length - 1) === '&') {
                            _hrefExt = _hrefExt.slice(0, -1);
                        }
                        options.url += '?' + _hrefExt;
                    }
                    if(options.getHtml == true){
                        // XHR.open('GET',options.url);
                        requestType = 'get';
                    }else{
                        // XHR.open('GET',this.getServerUrl() + options.url);
                        requestType = 'get';
                    }
                    // XHR.send(null);
                    requestType = 'get';
                    dataType = 'html';
                    contentType = 'application/x-www-form-urlencoded';
                }  else if (options.type.toUpperCase() === 'POST') {
                    options.url = this.getServerUrl() + options.url;
                    /*XHR.open('POST', this.getServerUrl() + options.url);
                    XHR.setRequestHeader('content-type', 'application/json');
                    XHR.send(JSON.stringify(_ajaxObj));*/
                    requestType = 'post';
                    dataType = 'json';
                    contentType = 'application/json';
                };
                var sendData = {};
                if (_ajaxObj) {
                    sendData = JSON.stringify(_ajaxObj);
                }
                $.ajax({
                    type : requestType,
                    url :  options.url,
                    data : sendData,
                    dataType : dataType,
                    contentType: contentType,
                    beforeSend : function(XMLHttpRequest) {
                        /*_showLoading();
                        console.log("isLoading = " + isLoading);
                        if(isLoading){
                            console.log("loading start ...");
                        }*/
                    },
                    success : function(reData) {
                        options.success = options.success || options.callBack;
                        $("#fullscreenLoadingSpan").css('display','none');

                        if(options.getHtml == true){
                            var data = reData;
                            options.success(data);
                        }else{
                            var data = reData; //JSON.parse(reData);
                            if (data) {
                                if (data.returnCode === 'yuju-1022') {
                                    alert(data.returnMsg);
                                    window.location = '/login.html?groupId='+sessionStorage.groupId+'&_t=' + Math.random();
                                    return ;
                                }
                            }
                            options.success(data);
                        }
                        /*if (reData.status == 1) {
                            success_callback(reData);
                        } else if ('XZJ-1008' == reData.params.returnCode) {
                            //未登录，跳转到登录页
                            location.href = "../error/timeOut.html";
                        } else {
                            error_callback(reData);
                        }*/
                    },
                    error : function(XMLHttpRequest, errorMsg, errorObj) {
                        console.log(XMLHttpRequest);
                        console.log(errorMsg);
                        console.log(errorObj);
                        $("#fullscreenLoadingSpan").css('display','none');

                        if (XMLHttpRequest.status == 404) {
                            window.location = "/views/notFind.html";
                        }
                    },
                    complete : function(){
                        /*_hideLoading();
                        if(isLoading){
                            console.log("loading end ...");
                        }*/
                    }
                })
            },
            // 页面跳转调用，输入的地址必须和HTML页面的路径一样
            pageTurn:function (options) {
                // var optionsUrl=options.url;
                 console.log(options.url)
                // if(optionsUrl.indexOf('?') !=-1){
                //     var htmlUrl=optionsUrl.slice(0,optionsUrl.indexOf('?'));
                //     var htmlData=optionsUrl.slice(optionsUrl.indexOf('?'),optionsUrl.length);
                var idx = options.url.indexOf('?');
                var prefixUrl = '';
                var suffixUrl = '';
                if (idx != -1) {
                    prefixUrl = options.url.substring(0, idx);
                    suffixUrl = options.url.substring(idx+1, options.url.length);
                    var paramsArr = suffixUrl.split('&');
                    if (paramsArr && paramsArr.length > 0) {
                        if (!options.params) {
                            options.params = {}
                        }
                        for (var i = 0; i < paramsArr.length; i++) {
                            var paramArr = paramsArr[i].split('=');
                            options.params[paramArr[0]] = paramArr[1];
                        }
                    }

                    options.url = prefixUrl;
                }

                if(options.params){
                    for(var pro in options.params){
                        sessionStorage.setItem(pro,options.params[pro])
                    }
                }
                this.getData({
                    type: 'get',
                    data: {},
                    url: 'views' + options.url + '.html?_t=' + Math.random(),
                    getHtml:true,
                    success: function (data) {
                        $("#main-content").html(data);
                    }
                })
                // }else{
                //     if(options.id){
                //         sessionStorage.id=options.id;
                //     }
                //     this.getData({
                //         type: 'get',
                //         data: {},
                //         url: 'views'+optionsUrl+'.html',
                //         getHtml:true,
                //         success: function (data) {
                //             $("#main-content").html(data);
                //         }
                //     })
                // }
            },
            /**
             * 加载弹框 弹框弹出调用  输入的地址必须和HTML页面的路径一样
             * @author liupq
             * @param options 参数集
             * @param pageLoadedFunc 页面加载完成时的回调方法
             */
            loadPopUp:function (options, pageLoadedFunc) {
                var xieNum=options.url.lastIndexOf("/");
                var urlId="#"+options.url.slice(xieNum+1,options.url.length);
                if(options.params){
                    for(var pro in options.params){
                        sessionStorage.setItem(pro,options.params[pro])
                    }
                }
                this.getData({
                    type: 'get',
                    data: {},
                    url: 'views'+options.url+'.html?_t=' + Math.random(),
                    getHtml:true,
                    success: function (data) {
                        $(urlId).html(data);
                        if(pageLoadedFunc instanceof Function)
                            pageLoadedFunc();
                    }
                })
            },
            getPage: function (options) {
                console.log(options.data)
                for (var i = 0; i < window.vueQueue.length; i++) {
                    for (var pro  in window.vueQueue[i]) {
                        if (this.vueReg.test(pro)) {
                            window.vueQueue[i][pro] && window.vueQueue[i][pro].$destroy();
                            window.vueQueue[i][pro] = null;
                        }
                    }
                }
                console.log(options.url)
                window.vueQueue.splice(0, window.vueQueue.length);
                this.getData({
                    type: 'get',
                    data: options.data,
                    url: options.url,
                    ajaxType: 1,
                    success: function (data) {
                        $("#main-content").html(data);
                    }
                })
            },
            /**
             *
             *@param {object} target  必填 原始对象副本
             *@param {object} extend  必填 原始对象
             *@param {Array} except   可选择 重复拷贝需要忽略的属性，主要用来排除下拉框绑定值的属性，主要解决下拉框数组被清空的问题
             */               //tempModel,model, array
            deepCopy: function (target, extend, except) {
                except = except || [];
                var _target = null, _extend = null;
                mark:for (var pro in extend) {
                    _extend = extend[pro];
                    if (_extend instanceof Array) {
                        if (_target = target[pro]) {
                            _target.splice(0, _target.length);
                            // _target = [];
                            for (var i = 0; i < except.length; i++) {
                                if (except[i] == pro) {
                                    for (var j = 0; j < _extend.length; j++) {
                                        _target.push(_extend[j]);
                                    }
                                }
                            }
                        } else {
                            target[pro] = _extend.slice(0);
                        }
                        continue;
                    } else if (_extend && typeof(_extend) == 'object') {
                        if (target[pro]) {
                            for (var i = 0; i < except.length; i++) {
                                if (except[i] == pro) {
                                    target[pro] = {};
                                    continue mark;
                                }
                            }
                        }
                        this.deepCopy(target[pro] ? target[pro] : target[pro] = {}, _extend);
                        continue;
                    }
                    target[pro] = _extend;
                }
                target = null;
            },
            extendDeep: function (parent, child) {
                if (typeof parent === 'null') {
                    return null;
                } else if (typeof parent === 'undefined') {
                    return undefined;
                } else if (typeof parent === 'number') {
                    return parent;
                } else if (typeof parent === 'function') {
                    return parent;
                } else if (parent instanceof Array) {
                    var _arr = [];
                    for (var i = 0; i < parent.length; i++) {
                        _arr.push(this.extendDeep(parent[i]));
                    }
                    return _arr;
                } else if (typeof parent === 'object') {
                    var i, proxy;
                    proxy = JSON.stringify(parent);
                    proxy = JSON.parse(proxy);
                    child = child || {};
                    for (i in proxy) {
                        if (proxy.hasOwnProperty(i)) {
                            child[i] = proxy[i];
                        }
                    }
                    proxy = null;
                    return child;
                }
            },
            /*
             * @parameter time:ticks(number)|yyyy-MM-dd（string）
             * @parameter dateNum(number)
             * @return yyyy-MM-dd（string）
             * */
            dateAdd: function (date, dateNum) {
                date = new Date(date);
                date = new Date(date.setDate(date.getDate() + dateNum)).getTime();
                return this._convert(date, 'yyyy-MM-dd');
            },
            /*
             * @parameter time:ticks(number)|yyyy-MM-dd（string）
             * @parameter dateNum(number)
             * @return yyyy-MM-dd（string）
             * */
            dateReduce: function (date, dateNum) {
                date = new Date(date);
                date = new Date(date.setDate(date.getDate() - dateNum)).getTime();
                return this._convert(date, 'yyyy-MM-dd');
            },
            /*
             * @parameter dateStart:ticks(number)|yyyy-MM-dd（string）
             * @parameter dateEnd:ticks(number)|yyyy-MM-dd（string）
             * @return yyyy-MM-dd（string）
             * */
            dateSub: function (dateStart, dateEnd) {
                var tick = new Date(dateEnd).getTime() - new Date(dateStart).getTime();
                return Math.floor(tick / 1000 / 60 / 60 / 24);
            },
            /*
             * @parameter date1:ticks(number)|yyyy-MM-dd（string）
             * @parameter date2:ticks(number)|yyyy-MM-dd（string）
             * @parameter compareMode:[less|equal|more]
             * @return true/false（boolean）
             * */
            dateCompare: function (date1, date2, compareMode) {
                switch (compareMode) {
                    case 'less':
                        return new Date(date1).getTime() < new Date(date2).getTime() ? true : false;
                    case 'equal':
                        return new Date(date1).getTime() < new Date(date2).getTime() ? true : false;
                    case 'more':
                        return new Date(date1).getTime() < new Date(date2).getTime() ? true : false;
                }
            },
            /*
             * @parameter time:ticks(number)|yyyy-MM-dd HH:mm（string）
             * @return HH:mm（string）
             * */
            getTime: function (time) {
                return this._convert(time, 'HH:mm');
            },
            getDay:function (time) {
                return parseInt(time)/86400000;
            },
            getHour: function (MM) {
                var _h = Math.floor(MM / 1000 / 3600);
                var _m = (MM - _h * 1000 * 3600) / 1000 / 60;
                return (_h < 10 ? '0' + _h : _h) + ':' + (_m < 10 ? '0' + _m : _m);
            },
            getRemoteDateNew: function () {
                //alert(_remoteDateTime)
                return this._convert(_remoteDateTime,'yyyy-MM-dd-HH:mm:ss');
            },


            //获取明年的当天的年月日
            getNowFormatDate: function () {
                var date = new Date();
                var seperator1 = "-";
                var year = date.getFullYear()+1;
                var month = date.getMonth() + 1;
                var strDate = date.getDate();
                if (month >= 1 && month <= 9) {
                    month = "0" + month;
                }
                if (strDate >= 0 && strDate <= 9) {
                    strDate = "0" + strDate;
                }
                var currentdate = year + seperator1 + month + seperator1 + strDate;
                console.log(currentdate)
                return currentdate;

            },

            getRemoteDateSec: function () {
                //alert(_remoteDateTime)
                return this._convert(_remoteDateTime,'yyyy-MM-dd-HH:mm:ss');
            },
            getRemoteDate: function () {             //默认是当天的
                //alert(_remoteDateTime)
                return this.dateCovert(_remoteDateTime);
            },
            getRemoteDate1: function () {

                var time=_remoteDateTime+3600*24*1*1000;
                //  alert(time)
                return this.dateCovert(time);
            },
            getRemoteDate1Yes: function () {

                var time=_remoteDateTime-3600*24*1*1000;
                return this.dateCovert(time);
            },
            getDateYeMon:function (date) {//把时间2018-01-01转成2018-01；只取年月
                date=new Date(date);
                var year=date.getFullYear();
                var month=date.getMonth()+1;
                month =(month<10 ? "0"+month:month);
                var mydate = (year.toString()+'-'+month.toString());
                return mydate;
            },
            getRemoteDate30: function () {

                var time=_remoteDateTime+3600*24*30*1000;
                //  alert(time)
                return this.dateCovert(time);
            },
            getRemoteHour: function () {
                return this.getTime(_remoteDateTime);
            },
            getMoney: function (money) {
                if(!money || isNaN(money)){
                    return 0;
                }
                // return Math.round(parseInt(money) / 100);
                return money / 100;
            },
            setMoney: function (money) {
                // if(!money || !parseInt(money)){
                //     return 0;
                // }
                // return Math.round(parseInt(money) * 100);
                return money * 100;
            },
            //table中有input输入框,不能使用formatter进行金额的分和元之间的转换需要使用此方法
            //参数有两个  1.arrList,需要和table数据绑定的表格数组  2.arrPara是第一个参数数组里面需要/100的金额的数组,要以数组的形式传入
            //例如特殊房编辑页的列表出的调用 this.fzFunction(this.tempModel.SpecialRoomtableList,[specilPrice,preRoomFee])
            formatMoney: function (arrList, arrPara) {
                for (var i = 0; i < arrList.length; i++) {
                    for (var j = 0; j < arrPara.length; j++) {
                        arrList[i].arrPara[j] = this.getMoney(arrList[i].arrPara[j])
                    }
                }

            },
            remarkHand:function (remark) {//备注字数太多处理
                if(remark){
                    if(remark.length>10){
                        return remark.substring(0,10)+'......'
                    }else{
                        return remark
                    }
                } else{}
            },
            dateCovert: function () {
                if (arguments.length == 2) {
                    var _obj = arguments[0];
                    var _pro = arguments[1];
                    _obj[_pro] = this._convert(_obj[_pro]);
                    return;
                };
                if (!arguments[0]) {
                    return null;
                }
                return this._convert(arguments[0], 'yyyy-MM-dd');
            },
            //将日期的date2018-12-04T16:00:00.000Z类型转换为yyyy-MM-dd类型

            dateShift:function (val) {
                var dateee = new Date(val).toJSON();
                var date = new Date(+new Date(dateee)+8*3600*1000).toISOString().replace(/T/g,' ').replace(/\.[\d]{3}Z/,'').substring(0,10);
                return date;
            },





            //转换后台传递过来的时间戳
            dateTimeCovert: function () {
                if (arguments.length == 2) {
                    var _obj = arguments[0];
                    var _pro = arguments[1];
                    _obj[_pro] = this._convert(_obj[_pro]);
                    return;
                };
                if (!arguments[0]) {
                    return null;
                }
                return this._convert(arguments[0], 'yyyy-MM-dd-HH:mm');
            },
            dateCovertSec: function () {
                if (arguments.length == 2) {
                    var _obj = arguments[0];
                    var _pro = arguments[1];
                    _obj[_pro] = this._convert(_obj[_pro]);
                    return;
                };
                if (!arguments[0]) {
                    return null;
                }
                return this._convert(arguments[0], 'yyyy-MM-dd-HH:mm:ss');
            },

            _convert: function (dateStr, dateFormat) {
                if(dateStr == null) return;
                var tempDate = new Date(dateStr);
                var tempDate1 = new Date(tempDate.getTime()+60*60*24*1000);
                // 退后一天
                var _dhou = tempDate1.getDate();
                var _Mhou = tempDate1.getMonth() + 1;
                var _M = tempDate.getMonth() + 1;
                var _d = tempDate.getDate();
                var _h = tempDate.getHours();
                var _m = tempDate.getMinutes();
                var _s = tempDate.getSeconds();
                _M = _M < 10 ? '0' + _M : _M;
                _d = _d < 10 ? '0' + _d : _d;
                _h = _h < 10 ? '0' + _h : _h;
                _m = _m < 10 ? '0' + _m : _m;
                _s = _s < 10 ? '0' + _s : _s;
                switch (dateFormat) {
                    case 'yyyy-MM-dd' :
                        return tempDate.getFullYear() + '-' + _M + '-' + _d;
                    case 'yyyy-MM-dd+1' :
                        return tempDate1.getFullYear() + '-' + _Mhou + '-' + _dhou;
                    case 'MM-dd-HH:mm' :
                        return  _M + '-' + _d + ' ' + _h + ':' + _m;
                    case 'yyyy-MM-dd-HH:mm' :
                        return  tempDate.getFullYear() + '-' +_M + '-' + _d + ' ' + _h + ':' + _m;
                    case 'yyyy-MM-dd-HH:mm:ss' :
                        return  tempDate.getFullYear() + '-' +_M + '-' + _d + ' ' + _h + ':' + _m+ ':' + _s;
                    case 'HH:mm' :
                        return _h + ':' + _m;
                    default:
                        return tempDate.getFullYear() + '-' + _M + '-' + _d;
                };
            },
            nextTick: function (func) {
                window.setTimeout(func, 80);
            },
            accMul: function (arg1,arg2)//乘法去浮点数
            {
                var m=0,s1=arg1.toString(),s2=arg2.toString();
                try{m+=s1.split(".")[1].length}catch(e){}
                try{m+=s2.split(".")[1].length}catch(e){}
                return Number(s1.replace(".",""))*Number(s2.replace(".",""))/Math.pow(10,m)
            },
            chanNum:function (r) {//小数转百分比
                //alert(r);
                if(r){
                    //var num= r*100+'%';
                    var num= this.accMul(r,100)+'%';
                    //  return this.chanFloatNum(num) ;
                    return num;
                }else{
                    return 0;
                }
            },
            chanFloatNum:function (r) {//保留小数点后两位
                if(r){
                    var num=r.toFixed(2);

                }
            },
            fomatFloat:function(src,pos){
                return Math.round(src*Math.pow(10, pos))/Math.pow(10, pos);
            },
            _prex: 'yuju',
            getUniquePrimaryKey: function () {
                return this._prex + _num++;
            },
            _opt: null,
            _pollAjaxReq: function () {
                if (_opt = this.ajaxQuene.pop())
                    this.getData(_opt);
            },
            showMessage: function ($message, msgType, information) {
                $message({
                    type: msgType,
                    message: information
                });
            },

            showAlert: function (that, msgType, type,fun) {
                that.$confirm(msgType, type,{
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'info'}).then(function() {
                    that.$message({
                        type: 'success',
                        message: '预览成功!'
                    });
                }).catch(function() {
                    that.$message({
                        type: 'info',
                        message: '已取消预览'
                    });
                });
            },
            showMsgBox : function (that,titleTxt,fun,data,url) {
                /*debugger;*/
                var _this = this;
                that.$msgbox({
                    title:titleTxt,
                    message:'是否预览此订单',
                    showCancelButton: true,
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    beforeClose: function(action, instance,done){
                        if (action === 'confirm') {//点击确定,显示打印预览
                            /*debugger*/
                            instance.confirmButtonLoading = true;
                            instance.confirmButtonText = '打印预览中...';
                            setTimeout(function() {
                                /*debugger*/
                                done();
                                if(url == 'billDetailsYFNo'){
                                    _this.loadPopUp({url:"/order/billDetailsYF"},function () {
                                        fun.init(data);
                                    })
                                }else if(url == 'staySingleA' || url == 'staySingleS' ){
                                    _this.loadPopUp({url:"/order/staySingle"},function () {
                                        fun.init(data);
                                    })
                                }else{
                                    _this.loadPopUp({url:"/order/"+url},function () {
                                        fun.init(data);
                                    })
                                }
                                setTimeout(function() {
                                    if(url == "billDetailsYF"){
                                        _this.pageTurn({url: '/order/dumbRoomAccountList'});
                                    }else if(url == 'staySingleA' || url == 'staySingleS'){
                                        //_this.pageTurn({url: '/reception/roomState/roomState'});
                                        _this.pageTurn({
                                            url: '/reception/roomState/roomState',
                                            params:{
                                                sign:data.sign,
                                                id_live:data.id,
                                            }
                                        });
                                    }
                                }, 1000);

                                setTimeout(function() {
                                    instance.confirmButtonLoading = false;
                                }, 300);

                            }, 1000);
                        } else {//点击取消
                            /*debugger*/
                            done();
                            if(url == "billDetailsYF"){
                                _this.pageTurn({url: '/order/dumbRoomAccountList'});
                            }else if(url == 'staySingleA' || url == 'staySingleS'){
                                //需求:跳转房态图之前,先弹出客账页面

                                //alert("我点击了取消")


                                //分界线分界线分界线分界线分界线
                                //_this.pageTurn({url: '/reception/roomState/roomState'});//在此跳转房态图
                                _this.pageTurn({
                                    url: '/reception/roomState/roomState',
                                    params:{
                                        sign:"apartmentCheckIn",
                                        id_live:data.id,
                                    }
                                });
                            }
                        }
                    }
                })


            },
            showMsgBoxdepositReceiptApp : function (that,titleTxt,fun,data,dan,url) {
                this.loadPopUp({url:"/order/"+url})
                that.$msgbox({
                    title:titleTxt,
                    message:'是否预览此订单',
                    showCancelButton: true,
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    beforeClose: function(action, instance,done){
                        if (action === 'confirm') {
                            instance.confirmButtonLoading = true;
                            instance.confirmButtonText = '打印预览中...';
                            setTimeout(function() {
                                done();
                                fun.init(data,dan);   //往打印要展示的js里面传递数据
                                setTimeout(function() {
                                    instance.confirmButtonLoading = false;
                                }, 300);
                            }, 2000);
                        } else {
                            done();
                        }
                    }
                })

            },
            // showConfirm: function ($confirm, options) {
            //     var _this = this;
            //     $confirm(options.text, '提示', {
            //         confirmButtonText: options.confirmButtonText,
            //         cancelButtonText: options.cancelButtonText,
            //         type: options.type
            //     }).then(function(){
            //         if (options.sure) {
            //             options.sure();
            //         }
            //     }).catch(function() {
            //         if (options.cancel) {
            //             options.cancel();
            //         } else {
            //             message: '已取消预览'
            //         }
            //     });
            // },
            //做搜索条件的时候需要清空数据为null的可以调用此方法,
            convertNull: function (submitModel) {
                for (var i in submitModel) {
                    if (submitModel[i] === "") {
                        submitModel[i] = null;
                    }
                }
            },
            //遮罩关闭
            shadeFun: function (that) {
                that.fullscreenLoading = true;
                setTimeout(function () {
                    that.fullscreenLoading = false;
                }, 2000);
            },
            getUrl: function() {
                var curWwwPath = window.document.location.href;
                //console.info(curWwwPath);
                var pathName = window.document.location.pathname;
                //console.info(pathName);
                var pos = curWwwPath.indexOf(pathName);
                //console.info(pos);
                var localhostPath = curWwwPath.substring(0, pos);
                //console.info(localhostPath);
                var projectName = pathName.substring(0, pathName.substr(1).indexOf('/') + 1);
                //console.info(projectName);
                if(this.isMatch(/^\/enboxs[a-zA-Z]*/, projectName.toLowerCase())) {
                    return (localhostPath + projectName);
                }
                //console.info('not');
                return localhostPath;
                //	return "http://t-sys.xzjcloud.com";
            },
            isMatch: function(regPartton, str) {
                return regPartton.test(str);
            },
            getServerUrl: function () {
                //console.log($('#pmsServerUrl').val())
                var baseUrl = this.getUrl();
                var serverUrl = '';
                if (baseUrl) {
                    if (baseUrl.lastIndexOf('10000') != -1 || baseUrl.lastIndexOf('12000') != -1) {
                        serverUrl = baseUrl.substring(0, baseUrl.lastIndexOf(':') + 1) + '11000';
                        //HTMLURL = baseUrl;
                    } else {
                        serverUrl = baseUrl + ':' + '11000';
                    }
                }
                /*if(sessionStorage.urls){
                    var pmsServerUrl = JSON.parse(sessionStorage.urls).pmsServerUrl;
                    if(pmsServerUrl){
                        serverUrl = pmsServerUrl;
                    }
                } else {
                    serverUrl = 'http://back.pms.yu500.com';
                }*/
                serverUrl = sessionStorage.pmsServerUrl;
                return serverUrl;
            },
            //兼容模式
            readCard : function (obj,that) {
                debugger
                var CertCtlObj = document.getElementById(obj);
                console.log('CertCtlObj--------------',CertCtlObj)
                var jsonStr = CertCtlObj.connect();   //连接读卡器
                json = JSON.parse(jsonStr);
                if(json.resultFlag == 0){
                    debugger
                    jsonStr = CertCtlObj.getStatus();   //得到读卡器状态
                    json = JSON.parse(jsonStr);
                    if(json.resultFlag == 0 && json.status == 0){
                        debugger
                        jsonStr = CertCtlObj.readCert();//读身份证信息
                        json = JSON.parse(jsonStr);
                        if(json.resultFlag == -1){

                            this.showMessage(that,'error',json.errorMsg);
                            //this.showMessage(that,'error','读卡器连接异常');
                            return
                        }
                        debugger
                        var date = json.resultContent.bornDay;
                        json.resultContent.bornDay = date.substring(0,4)+'-'+date.substring(4,6)+'-'+date.substring(6,8)
                        return {
                            address:json.resultContent.certAddress,
                            certificateCode:json.resultContent.certNumber,
                            effDate:json.resultContent.effDate,
                            expDate:json.resultContent.expDate,
                            certOrg:json.resultContent.certOrg,
                            birthDate:json.resultContent.bornDay,
                            nation:json.resultContent.nation,
                            gender:json.resultContent.gender,
                            name:json.resultContent.partyName
                        }
                    }else{
                        //alert(223)
                        this.showMessage(that,'error',json.errorMsg);
                    }
                }else
                {
                    //alert(224)
                    this.showMessage(that,'error','读卡器连接异常');
                    //this.showMessage(that,'error',json.errorMsg);
                }

                jsonStr = CertCtlObj.disconnect();  //断开连接读卡器
                json = JSON.parse(jsonStr);
                if(json.resultFlag == -1)
                {
                    //alert(225)
                    this.showMessage(that,'error','读卡器连接异常');
                    //this.showMessage(that,'error',json.errorMsg);
                }
            },

            //急速模式
            readCardjs:function (objdt,that) {
                debugger
                var obj =document.getElementById("RoutonReader");//Routon Card Reader
                var form1=document.getElementById("formCard");
                var isInit=false
                obj.setPortNum(0);
                if(false==isInit){
                    //设置端口号，1表示串口1，2表示串口2，依此类推；1001表示USB。0表示自动选择
                    var port = obj.setPortNum(0);  //changed args
                    if(port==0){
                        alert("端口初始化失败！");
                        return;
                    }
                    isInit=true;
                }
                //使用重复读卡功能
                obj.Flag=0;
                //obj.BaudRate=115200;
                //设置照片保存路径，默认路径为系统临时目录, 照片文件名：photo.bmp, photo.jpg。
                // var path=form1.photoPath.value;
                // if(path!="")
                //     obj.PhotoPath=path;
                // else
                //     obj.PhotoPath="";
                //读卡

                var rst = obj.ReadCard();
                //获取各项信息
                if(rst==0x90){
                    debugger
                    obj.name=obj.NameL()//姓名
                    obj.certificateCode=obj.CardNo()//身份证号
                    obj.gender=obj.SexL() //性别
                    obj.birthDate=obj.BornL() //出生日期
                    obj.address=obj.Address()//住址
                    return obj
                    // form1.nameL.value   =obj.NameL();
                    // form1.sexL.value    =obj.SexL();
                    // form1.nationL.value =obj.NationL();
                    // form1.bornL.value   =obj.BornL();
                    // form1.address.value =obj.Address();
                    // form1.idnum.value   =obj.CardNo();
                    // form1.agent.value   =obj.Police();
                    // form1.validDateL.value=obj.ActivityL();
                    // form1.name2.value       =obj.Name();
                    // form1.sexCode.value     =obj.Sex();
                    // form1.nationCode.value  =obj.Nation();
                    // form1.born2.value       =obj.Born();
                    // form1.validDate2.value  =obj.Activity();
                    // form1.validDateFrom.value=obj.ActivityLFrom;
                    // form1.validDateTo.value =obj.ActivityLTo;
                    // form1.samid.value = obj.SAMID();  //获得安全模块号
                    // form1.base64Image.value =obj.GetImage();
                    // form1.base64Image.value =obj.Born();
                } else {
                    // form1.nameL.value   ="";
                    // form1.sexL.value    ="";
                    // form1.nationL.value ="";
                    // form1.bornL.value   ="";
                    // form1.address.value ="";
                    // form1.idnum.value   ="";
                    // form1.agent.value   ="";
                    // form1.validDateL.value="";
                    // form1.name2.value       ="";
                    // form1.sexCode.value     ="";
                    // form1.nationCode.value  ="";
                    // form1.born2.value       ="";
                    // form1.validDate2.value  ="";
                    // form1.validDateFrom.value="";
                    // form1.validDateTo.value ="";
                    // form1.base64Image.value ="";
                    // form1.samid.value = "";
                    if(rst==0x02)
                        alert("请重新将卡片放到读卡器上！");
                    if(rst==0x41)
                        alert("读取数据失败！");
                }
            },
            //上传图片
            upload:function (data,fun) {
                var url = JSON.parse(sessionStorage.urls).fileServerUrl;
                $.ajax({
                     url:  url +'/upload/file',
                    //url:  "http://t-img.yu500.com"+'/upload/file' ,
                    type: 'post',
                    cache: false,
                    data: data,
                    processData: false,
                    contentType: false
                }).done(function(r) {
                    var ImgUrl = r.data.url;
                    fun(ImgUrl);
                    //上传成功把文件传到后台服务器
                    /* var arr = JSON.parse(r).data[0].filepath.split("/");
                    var jsondata = {rows:[{
                        resourcedesc : JSON.parse(r).data[0].oldfilename,
                        resourceurl : JSON.parse(r).data[0].filepath,
                        filename : arr[arr.length-1],
                        filesize : JSON.parse(r).data[0].filesize,
                        resourcetype : '2',
                        groupid : $(".current").attr('data-groupid'),
                        duration : duration
                    }]}; */
                }).fail(function(r) {
                    console.info(r);
                });
            },
            // 删除图片
            deleteImg:function (data,fun) {
                var url = JSON.parse(sessionStorage.urls).fileServerUrl;
                $.ajax({
                    url:  url +'/upload/delFile',
                    type: 'post',
                    cache: false,
                    data: JSON.stringify(data),
                    contentType: 'application/json'
                }).done(function(r) {
                    if(r.status == '1'){
                        fun();
                    }
                }).fail(function(r) {
                    console.info(r);
                });
            },
            dateFormat:function (date,format) {
                var o = {
                    "M+" : date.getMonth()+1, //month
                    "d+" : date.getDate(),    //day
                    "h+" : date.getHours(),   //hour
                    "m+" : date.getMinutes(), //minute
                    "s+" : date.getSeconds(), //second
                    "q+" : Math.floor((date.getMonth()+3)/3),  //quarter
                    "S" : date.getMilliseconds() //millisecond
                };
                if(/(y+)/.test(format)) format=format.replace(RegExp.$1,
                    (date.getFullYear()+"").substr(4- RegExp.$1.length));
                for(var k in o)if(new RegExp("("+ k +")").test(format))
                    format = format.replace(RegExp.$1,
                        RegExp.$1.length==1? o[k] :
                            ("00"+ o[k]).substr((""+ o[k]).length));
                return format;
            },


            /*//客账的弹窗
            settlePop: function () {
                var that = this;
                that.loadPopUp({url:"/common/settle"}, function() {
                    that.getData({
                        type: "post",
                        url: "/roomOrder/get",
                        data: {id : that.tempFullRoomModel.room.id },
                        dataType: "json",
                        success:function (data) {
                            settleModel.init(data.data);
                            $("#selttleApp").modal();
                            // relaInfoRoomModel.init(that.fullVue.fullRoom.room.id);
                            // $('#selectRoomsApp').modal();
                            $('#selttleApp').one('hide.bs.modal', vuePageKit.bind(that, that.selttleCallBack));
                        }
                    })
                });

            },
            selttleCallBack:function () {
                if(!!window.ActiveXObject || "ActiveXObject" in window){
                    //alert ("IE");
                    vuePageKit.pageTurn({
                        url: '/reception/roomState/roomState',
                        params:{

                        }
                    });
                }
                if(navigator.userAgent.indexOf("Firefox")!=-1){
                    //return "Firefox";
                }
                if(navigator.userAgent.indexOf("Chrome")!=-1){
                    // alert("Chrome");
                }
                if(navigator.userAgent.indexOf("Safari")!=-1){
                    //return "Safari";
                }
                return;
                // alert(2)

            },*/


        };
    });
