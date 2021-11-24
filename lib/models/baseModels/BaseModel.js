"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _typeof2 = _interopRequireDefault(require("@babel/runtime/helpers/typeof"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _ObjectHelper = _interopRequireDefault(require("../../helpers/ObjectHelper"));

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var BaseModel = /*#__PURE__*/function () {
  /**
   * 模型实例的唯一ID
   * 注意，每一次实例化都会生成一次唯一值，每次都是不同的值
   * @type {*}
   */

  /**
   * 校验规则配置
   * @type {object}
   */

  /**
   * 错误信息
   * @type {[]}
   */

  /**
   * 主键属性
   * @type {string}
   */

  /**
   * 属性格式化配置
   * @type {object<{value: function|object, formatter: function, formatterOptions: object}>}
   */

  /**
   * 属性映射的标签名
   * @type {object}
   */

  /**
   * 后缀属性指定的后缀名
   * 在 getValue 中，获取一个属性的展示值时，如果没有其它配置，会自动获取 属性名 + 后缀 组成的新属性的值
   * @type {string}
   */
  function BaseModel() {
    (0, _classCallCheck2["default"])(this, BaseModel);
    (0, _defineProperty2["default"])(this, "$unique", undefined);
    (0, _defineProperty2["default"])(this, "rules", {});
    (0, _defineProperty2["default"])(this, "errors", []);
    (0, _defineProperty2["default"])(this, "primaryKey", 'id');
    (0, _defineProperty2["default"])(this, "formatConfig", {});
    (0, _defineProperty2["default"])(this, "fieldLabels", {});
    (0, _defineProperty2["default"])(this, "fieldSuffix", '_view');
    this.$unique = ((1 + Math.random()) * 0x10000 | 0).toString(16);
  }
  /**
   * 获取主键属性的值
   * @returns {*}
   */


  (0, _createClass2["default"])(BaseModel, [{
    key: "getPrimary",
    value: function getPrimary() {
      return this[this.primaryKey];
    }
    /**
     * 设置主键属性的值
     * @param value
     */

  }, {
    key: "setPrimary",
    value: function setPrimary(value) {
      this[this.primaryKey] = value;
    }
    /**
     * 获取指定属性是否必填
     * 需要在 rules 中配置属性必填
     * @param field
     * @returns {boolean}
     */

  }, {
    key: "getIsRequired",
    value: function getIsRequired(field) {
      var _iterator = _createForOfIteratorHelper(this.rules[field] || []),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var rule = _step.value;

          if (rule.required === true) {
            return true;
          }
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }

      return false;
    }
    /**
     * 获取当前实例是否存在错误信息
     * @returns {boolean}
     */

  }, {
    key: "getHasErrors",
    value: function getHasErrors() {
      return this.errors.length !== 0;
    }
    /**
     * 清空当前实例的错误信息
     */

  }, {
    key: "clearErrors",
    value: function clearErrors() {
      this.errors = [];
    }
    /**
     * 为指定属性添加一个错误信息
     * @param {string} field
     * @param {string} message
     */

  }, {
    key: "addError",
    value: function addError(field, message) {
      this.errors.push({
        field: field,
        message: message
      });
    }
    /**
     * 批量添加错误信息
     * @param {array<{field: string, message: string}>} errors
     */

  }, {
    key: "addErrors",
    value: function addErrors(errors) {
      var _iterator2 = _createForOfIteratorHelper(errors),
          _step2;

      try {
        for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
          var item = _step2.value;
          this.addError(item.field, item.message);
        }
      } catch (err) {
        _iterator2.e(err);
      } finally {
        _iterator2.f();
      }
    }
    /**
     * 获取第一条错误信息
     * @param {string} field
     * @returns {null|string}
     */

  }, {
    key: "shiftErrorMessage",
    value: function shiftErrorMessage() {
      var field = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : undefined;

      var _iterator3 = _createForOfIteratorHelper(this.errors),
          _step3;

      try {
        for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
          var error = _step3.value;

          if (field === undefined || error.field === field) {
            return error.message;
          }
        }
      } catch (err) {
        _iterator3.e(err);
      } finally {
        _iterator3.f();
      }

      return null;
    }
    /**
     * shiftErrorMessage的别名
     * @param field
     * @returns {string|null}
     */

  }, {
    key: "getOneErrorMessage",
    value: function getOneErrorMessage() {
      var field = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : undefined;
      return this.shiftErrorMessage(field);
    }
    /**
     * 传入一个属性名，以一个数组的形式返回其所有的错误信息
     * @param {string} field
     * @returns {array<string>}
     */

  }, {
    key: "getErrors",
    value: function getErrors(field) {
      return this.errors.map(function (error) {
        return error.field === field ? error.message : null;
      }).filter(function (v) {
        return !!v;
      });
    }
    /**
     * 获取指定属性的标签
     * 需要在 fieldLabels 配置，否则返回属性名本身
     * @param {string} field
     * @returns {string}
     */

  }, {
    key: "getLabel",
    value: function getLabel(field) {
      if (this.fieldLabels[field]) {
        return this.fieldLabels[field];
      }

      return field.split('_').filter(function (v) {
        return !!v;
      }).map(function (word) {
        return word.substring(0, 1).toUpperCase() + word.substring(1);
      }).join(' ');
    }
    /**
     * 获取指定属性的展示值
     * 获取规则为：
     * 1. 先获取属性对应的原始值（或者source参数的值）
     * 2. 如果 formatConfig 配置了 value，并且 typeof value === 'object'，则将配置的 value 视为一个字典映射，根据属性对应的值获取其映射后的值，并跳到 5
     * 3. 如果 formatConfig 配置了 value，并且 typeof value === 'function'，则调用该函数，并获取该函数的返回值，并跳到 5
     * 4. 如果存在后缀属性，则获取后缀属性的值，并跳到 6
     * 5. 如果 formatConfig 配置了 formatter，则实例化格式器，并获取格式器处理后的值
     * 6. 返回最后获取到的值
     * @param {string} field 属性名
     * @param {*} source 指定一个特定的值进行格式化，该值指定后，不会修改实例对应属性的值
     * @returns {*}
     */

  }, {
    key: "getValue",
    value: function getValue(field) {
      var source = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;
      source = source === undefined ? this[field] : source;
      var format = this.formatConfig[field] || {}; // 字典翻译

      if ((0, _typeof2["default"])(format.value) === 'object') {
        source = format.value[source];
      } // 函数翻译
      else if (typeof format.value === 'function') {
        source = format.value({
          model: this,
          field: field,
          source: source
        });
      } // 后缀翻译
      else if (this[field + '_view']) {
        source = this[field + '_view'];
      } // 助手翻译


      if (format.formatter) {
        var formatter = new format.formatter["class"](source, this, format.formatter.options || {}, field);
        return formatter.getValue();
      }

      return source;
    }
    /**
     * 传入一个字符串，返回该字符串是不是当前实例的属性名
     * 判断逻辑：
     * 1. 不是模型自带的属性，比如 primaryKey，errors 这些
     * 2. 当前实例存在该属性 或 在 formatConfig 中配置了该属性 或 在 fieldLabels 中配置了该属性
     * @param {string} field
     * @returns {boolean}
     */

  }, {
    key: "getIsField",
    value: function getIsField(field) {
      return ['primaryKey', 'fieldSuffix', 'errors', 'formatConfig', 'rules', 'fieldLabels', 'response', '$unique'].indexOf(field) === -1 && (Object.prototype.hasOwnProperty.call(this, field) || this.formatConfig[field] || this.fieldLabels[field]);
    }
    /**
     * 返回当前实例所有的属性名列表
     * @returns {array<string>}
     */

  }, {
    key: "getFields",
    value: function getFields() {
      var result = [];

      for (var _i = 0, _Object$keys = Object.keys(this); _i < _Object$keys.length; _i++) {
        var field = _Object$keys[_i];

        if (this.getIsField(field)) {
          result.push(field);
        }
      }

      return result;
    }
    /**
     * 传入一个属性名列表，返回属性对应的展示值
     * 不传属性名列表时，将返回所有属性对应的展示值
     * 使用该方法时注意与 getSources 方法的区别
     * @param {array<string>} fields
     * @returns {object}
     */

  }, {
    key: "getValues",
    value: function getValues() {
      var fields = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
      var values = {};
      fields = fields.length ? fields : this.getFields();

      var _iterator4 = _createForOfIteratorHelper(fields),
          _step4;

      try {
        for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
          var field = _step4.value;

          if (this.getIsField(field)) {
            values[field] = this.getValue(field);
          }
        }
      } catch (err) {
        _iterator4.e(err);
      } finally {
        _iterator4.f();
      }

      return values;
    }
    /**
     * 获取模型的属性值
     * @param {string} field 对于属性是一个对象的，支持使用 . 号分隔符进行多级获取
     * @returns {*}
     */

  }, {
    key: "getSource",
    value: function getSource(field) {
      return _ObjectHelper["default"].getValue(this, field);
    }
    /**
     * 传入一个属性名列表，返回属性对应的原始值
     * 不传属性名列表时，将返回所有属性对应的原始值
     * 使用该方法时注意与 getValues 方法的区别
     * @param {array<string>} fields
     * @returns {{}}
     */

  }, {
    key: "getSources",
    value: function getSources() {
      var fields = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
      var values = {};
      fields = fields.length ? fields : this.getFields();

      var _iterator5 = _createForOfIteratorHelper(fields),
          _step5;

      try {
        for (_iterator5.s(); !(_step5 = _iterator5.n()).done;) {
          var field = _step5.value;

          if (this.getIsField(field)) {
            values[field] = this.getSource(field);
          }
        }
      } catch (err) {
        _iterator5.e(err);
      } finally {
        _iterator5.f();
      }

      return values;
    }
    /**
     * 批量设置属性对应的原始值
     * @param {object} sources
     */

  }, {
    key: "setSources",
    value: function setSources(sources) {
      for (var field in sources) {
        this[field] = sources[field];
      }
    }
    /**
     * 传入用于构建多个模型实例的属性列表，返回当前模型实例列表
     * @static
     * @param {array<object>} list
     * @returns {*}
     */

  }, {
    key: "getInstanceTo",
    value:
    /**
     * 传入一个类，将当前实例的数据通过 setSources 转移到另一个类实例中
     * @param {function} Model
     * @returns {BaseModel}
     */
    function getInstanceTo(Model) {
      var model = new Model();
      model.setSources(_ObjectHelper["default"].copy(this.getSources()));
      return model;
    }
  }], [{
    key: "instanceList",
    value: function instanceList(list) {
      var _this = this;

      return list.map(function (data) {
        var model = new _this();
        model.setSources(data);
        return model;
      });
    }
  }]);
  return BaseModel;
}();

exports["default"] = BaseModel;