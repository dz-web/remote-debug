/**
 * Created by dz on 2017/3/14.
 */

(function () {

  function appendToHead(el) {
    document.getElementsByTagName('head')[0].appendChild(el);
  }

  function initClient() {
    function addStyle() {
      var css = '*{margin:0;padding:0;box-sizing:border-box}@keyframes debugger-enter{from{transform:translate3d(0,-100%,0)}to{transform:translate3d(0,0,0)}}@-webkit-keyframes debugger-enter{from{transform:translate3d(0,-100%,0)}to{transform:translate3d(0,0,0)}}@keyframes debugger-leave{from{transform:translate3d(0,0,0)}to{transform:translate3d(0,-100%,0)}}@-webkit-keyframes debugger-leave{from{transform:translate3d(0,0,0)}to{transform:translate3d(0,-100%,0)}}.debugger-tips{position:absolute;top:0;width:100%;background-color:rgba(255,0,0,0.5);color:#fff;font-size:14px;padding:2px 0;text-align:center;animation:debugger-enter .35s ease-in-out forwards;-webkit-animation:debugger-enter .35s ease-in-out forwards}.debugger-tips.leave{animation:debugger-leave .35s ease-in-out forwards;-webkit-animation:debugger-leave .35s ease-in-out forwards}';
      var style = document.createElement('style');
      style.innerText = css;
      appendToHead(style);
    }

    function createTips(str) {
      var tips = document.createElement('div');
      tips.setAttribute('class', 'debugger-tips');
      tips.innerHTML = str;
      document.body.appendChild(tips);

      function dismiss() {
        tips.setAttribute('class', 'debugger-tips leave');
      }

      tips.addEventListener('touchstart', dismiss);

      setTimeout(function () {
        tips.setAttribute('class', 'debugger-tips leave');
        setTimeout(function () {
          tips.parentNode.removeChild(tips);
        }, 1000);
      }, 3000);
    }

    function insertLog() {
      var funs = Object.keys(window.console);

      window.console = {
        wc: window.console,
      };

      for (var j = 0; j < funs.length; j++) {
        (function () {
          var item = funs[j];
          console[item] = function () {
            this.wc[item].apply(this.wc, Array.prototype.slice.call(arguments));
            log(arguments, item);
          };
        })();
      }

      window.onerror = function (errorMsg, url, lineNumber, column, errorObj) {
        console.error('Error: ' + errorMsg + 'Script:' + url + 'Line: ' + lineNumber
          + ' Column:' + column + 'StackTrace: ' + errorObj);
      };

      function log(msgs, type) {
        var arr = Object.keys(msgs);
        var rs = [];
        for (var i = 0; i < arr.length; i++) {
          var k = arr[i];
          try {
            if (typeof msgs[k] !== 'string') {
              var c = JSON.stringify(msgs[k]);
              rs.push(c !== undefined ? c : c.toString());
            }
          } catch (e) {

          }
          rs.push(msgs[k]);
        }

        Server.sendLog(rs.join(' '), type);
      }
    }

    var _Server = function (host) {
      this.socket = io('http://' + host);
      var _this = this;

      this.socket.on('connect', function () {
        _this.socket.emit('init', {
          url: location.href,
          agent: navigator.userAgent,
          title: window.document.title
        });
      });

      function evalCMD(cmd) {
        try {
          console.log(window.eval(cmd));
        } catch (e) {
          console.error(e.toString());
        }
      }

      // eval string
      // eval {cmd:'xxx',callback:'zfasd'}
      // eval {cmd:'xxx',callback:'zfasd',silent:true}
      this.socket.on('eval', function (data) {
        if (typeof data === 'object') {
          if (Object.prototype.hasOwnProperty.call(data, 'callback')) {
            try {
              _this.socket.emit(data.callback, window.eval(data.cmd));
            } catch (e) {
              console.error(e.toString());
            }
          } else {
            evalCMD(data.cmd);
          }
        } else {
          evalCMD(data);
        }
      });

      this.sendLog = function (logs, type) {
        this.socket.emit('log', { logs: logs, type: type });
      };
    };

    function getHost() {
      var srcripts = document.getElementsByTagName('script');
      for (var i = 0; i < srcripts.length; i++) {
        var src = srcripts[i].getAttribute('src');
        if (src && src.indexOf('#') !== -1) {
          try {
            var arr = src.split('#').pop().split('=');
            if (arr[0] === 'host') {
              return arr[1];
            }
          } catch (e) {}
        }
      }
    }

    addStyle();
    insertLog();

    var host = getHost();
    if (!host) {
      createTips('获取host失败');
      return;
    }
    window.Server = new _Server(host);
    createTips('远程调试中...');
  }

  function insertIO() {
    var scriptTag = document.createElement('script');
    scriptTag.setAttribute('src', 'http://dztmp.oss-cn-hangzhou.aliyuncs.com/socket.io.min.js');
    appendToHead(scriptTag);
    scriptTag.onload = initClient;
  }

  insertIO();
}());

(function () {
  var fetchRaw = window.fetch;
  if (fetchRaw) {
    window.fetch = function (args) {
      alert(args)
      return fetchRaw(args);
    };
  }
})();
