"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var EventHandler = /*#__PURE__*/function () {
  function EventHandler() {
    (0, _classCallCheck2["default"])(this, EventHandler);
    (0, _defineProperty2["default"])(this, "$events", {});
  }

  (0, _createClass2["default"])(EventHandler, [{
    key: "$on",
    value:
    /**
     * 添加事件监听器
     * @param {string} eventName 事件名称
     * @param {function} callback 事件处理函数
     * @param {boolean} once 是否只响应一次
     */
    function $on(eventName, callback) {
      var once = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
      this.$events[eventName] = this.$events[eventName] || [];
      this.$events[eventName].push({
        once: once,
        callback: callback
      });
    }
    /**
     * 移除某个事件
     * @param {string} eventName 事件名称
     * @param {function} callback 事件处理函数
     */

  }, {
    key: "$off",
    value: function $off(eventName, callback) {
      var list = (this.$events[eventName] || []).map(function (item) {
        return item.callback;
      });
      var index = list.indexOf(callback);

      if (index !== -1) {
        this.$events[eventName].splice(index, 1);
      }
    }
    /**
     * 触发事件
     * @param {string} eventName 事件名称
     * @param {*} params 事件参数
     */

  }, {
    key: "$emit",
    value: function $emit(eventName, params) {
      var _this = this;

      (this.$events[eventName] || []).map(function (item) {
        item.callback(params);

        if (item.once) {
          _this.$off(eventName, item.callback);
        }
      });
    }
    /**
     * 清空某个事件
     * @param {string} eventName 事件名称
     */

  }, {
    key: "$clear",
    value: function $clear(eventName) {
      if (this.$events[eventName]) {
        delete this.$events[eventName];
      }
    }
  }]);
  return EventHandler;
}();

exports["default"] = EventHandler;