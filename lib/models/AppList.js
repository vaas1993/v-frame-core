"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _VFrame = _interopRequireDefault(require("../VFrame"));

var _ObjectHelper = _interopRequireDefault(require("../helpers/ObjectHelper"));

var AppList = /*#__PURE__*/function () {
  function AppList() {
    (0, _classCallCheck2["default"])(this, AppList);
    (0, _defineProperty2["default"])(this, "searchModel", void 0);
    (0, _defineProperty2["default"])(this, "showModel", void 0);
    (0, _defineProperty2["default"])(this, "modelList", []);
    (0, _defineProperty2["default"])(this, "pager", {
      pagination: 1,
      size: 20,
      total: 0
    });
    (0, _defineProperty2["default"])(this, "isSearchShow", true);
    (0, _defineProperty2["default"])(this, "isExportShow", true);
    (0, _defineProperty2["default"])(this, "isPagerShow", true);
    (0, _defineProperty2["default"])(this, "actionList", [{
      text: '新建',
      type: 'create'
    }]);
    (0, _defineProperty2["default"])(this, "bodyConfig", {});
  }

  (0, _createClass2["default"])(AppList, [{
    key: "getShowModel",
    value:
    /**
     * 获取用于展示的模型实例
     * @returns {*}
     */
    function getShowModel() {
      if (!this.showModel) {
        this.showModel = this.searchModel;
      }

      return this.showModel;
    }
    /**
     * 获取分页数
     * @returns {number}
     */

  }, {
    key: "getPageCount",
    value: function getPageCount() {
      return Math.ceil(this.pager.total / this.pager.size);
    }
    /**
     * 设置搜索模型的数据
     * @param {object} sources
     */

  }, {
    key: "setSearchSources",
    value: function setSearchSources() {
      var sources = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      if (this.searchModel) {
        this.searchModel.setSources(sources);
      }
    }
    /**
     * 设置分页器
     * 未设置的项将使用原有的值替代
     * @param {object<total, pagination, size>} pager
     */

  }, {
    key: "setPager",
    value: function setPager(pager) {
      this.pager = Object.assign({}, this.pager, pager);
    }
    /**
     * 获取操作按钮列表
     * @returns {{text: string, type: string}[]}
     */

  }, {
    key: "getActionList",
    value: function getActionList() {
      return this.actionList.filter(function (item) {
        return _VFrame["default"].getInstance().getHasPermission(item.permission) && item.isShow !== false;
      });
    }
    /**
     * 获取列表内容配置
     * @returns {Object}
     */

  }, {
    key: "getBodyConfig",
    value: function getBodyConfig() {
      var model = this.getShowModel();
      return _ObjectHelper["default"].forEach(_ObjectHelper["default"].filter(this.bodyConfig, function (item) {
        return _VFrame["default"].getInstance().getHasPermission(item.permission);
      }), function (item, field) {
        item.name = item.name ? item.name : model.getLabel(field);
        return item;
      });
    }
    /**
     * 列表搜索
     * @param {int} pagination 指定页码，不传递时时候原页码+1
     * @param {boolean} clearList 调用接口前是否要清空原列表内容，默认清空
     * @returns {Promise<boolean>}
     */

  }, {
    key: "onLoad",
    value: function () {
      var _onLoad = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(pagination) {
        var clearList,
            _args = arguments;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                clearList = _args.length > 1 && _args[1] !== undefined ? _args[1] : true;
                this.pager.pagination = pagination || this.pager.pagination++;

                if (clearList) {
                  this.modelList = [];
                }

                _context.next = 5;
                return this.searchModel.list({
                  page: this.pager.pagination,
                  page_size: this.pager.size
                }, this.getShowModel().constructor);

              case 5:
                if (!_context.sent) {
                  _context.next = 8;
                  break;
                }

                this.modelList = this.modelList.concat(this.searchModel.response.models);
                this.setPager(this.searchModel.response.listMeta);

              case 8:
                return _context.abrupt("return", true);

              case 9:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function onLoad(_x) {
        return _onLoad.apply(this, arguments);
      }

      return onLoad;
    }()
  }]);
  return AppList;
}();

exports["default"] = AppList;