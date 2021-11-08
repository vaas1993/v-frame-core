"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _typeof2 = _interopRequireDefault(require("@babel/runtime/helpers/typeof"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var StorageHelper = /*#__PURE__*/function () {
  function StorageHelper() {
    (0, _classCallCheck2["default"])(this, StorageHelper);
  }

  (0, _createClass2["default"])(StorageHelper, null, [{
    key: "set",
    value:
    /**
     * 保存一个数据
     * @param {string} name 键名
     * @param {string|object} value 需要保存的值
     * @param {int} expires 有效期，单位秒，小于等于0时代表不过期
     */
    function set(name, value) {
      var expires = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
      value = {
        format: (0, _typeof2["default"])(value),
        value: value,
        timestamp: new Date().getTime(),
        expires: expires > 0 ? expires * 1000 : undefined
      };
      window.localStorage.setItem(name, JSON.stringify(value));
    }
    /**
     * 根据名称取值，不存在值时返回 null
     * @param {string} name 键名
     * @returns {string|object|null}
     */

  }, {
    key: "get",
    value: function get(name) {
      var store = window.localStorage.getItem(name);

      if (!store) {
        return null;
      }

      store = JSON.parse(store);

      if (store.expires !== undefined) {
        var currentTime = new Date().getTime();

        if (currentTime > store.timestamp + store.expires) {
          this.remove(name);
          return null;
        }
      }

      return store.value;
    }
    /**
     * 根据名称判断有没有该值
     * 注意，如果保存的值是null，也会返回 false
     * @param {string} name 键名
     * @returns {boolean}
     */

  }, {
    key: "has",
    value: function has(name) {
      return this.get(name) !== null;
    }
    /**
     * 根据名称删除值
     * @param {string} name 键名
     */

  }, {
    key: "remove",
    value: function remove(name) {
      window.localStorage.removeItem(name);
    }
    /**
     * 清空整个本地存储
     */

  }, {
    key: "clear",
    value: function clear() {
      window.localStorage.clear();
    }
  }]);
  return StorageHelper;
}();

exports["default"] = StorageHelper;