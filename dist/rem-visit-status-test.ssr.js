'use strict';function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
}

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

function _iterableToArrayLimit(arr, i) {
  if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return;
  var _arr = [];
  var _n = true;
  var _d = false;
  var _e = undefined;

  try {
    for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);

      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }

  return _arr;
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

  return arr2;
}

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
var script = {
  name: "VisitBoxProgress",
  data: function data() {
    return {};
  },
  props: {
    name: {
      required: true
    },
    completedValue: {
      required: false
    },
    totalValue: {
      required: false
    },
    fontSize: {
      type: String
    },
    progress: {
      required: false
    },
    boxColor: {
      default: false
    },
    progressBarColor: {
      default: '#ffffff',
      required: false
    },
    tooltipText: {
      type: String,
      default: ''
    },
    SmallBox: {
      type: Boolean,
      default: false
    },
    FontSizeValue: {
      type: String
    },
    DummyFontSize: {
      type: Boolean,
      default: false
    },
    active: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    defaultBoxColor: function defaultBoxColor() {
      if (!this.boxColor) {
        var _ref;

        return _ref = {
          backgroundColor: 'rgb(238,91,77)',
          backgroundImage: '-moz-linear-gradient( 108deg, rgb(247,157,154) 0%, rgb(243,124,116) 62%, rgb(238,91,77) 100%)'
        }, _defineProperty(_ref, "backgroundImage", // eslint-disable-line
        '-webkit-linear-gradient( 108deg, rgb(247,157,154) 0%, rgb(243,124,116) 62%, rgb(238,91,77) 100%)'), _defineProperty(_ref, "backgroundImage", // eslint-disable-line
        '-ms-linear-gradient( 108deg, rgb(247,157,154) 0%, rgb(243,124,116) 62%, rgb(238,91,77) 100%)'), _defineProperty(_ref, "backgroundImage", // eslint-disable-line
        'linear-gradient( 108deg, rgb(247,157,154) 0%, rgb(243,124,116) 62%, rgb(238,91,77) 100%)'), _ref;
      } else {
        return this.boxColor;
      }
    }
  },
  mounted: function mounted() {
    var vm = this;
    this.$root.$on('bv::tooltip::show', function (bvEvent) {
      vm.$nextTick(function () {
        jQuery('.b-tooltip-' + vm._uid + ' > .tooltip-inner').css('background-color', vm.defaultBoxColor.backgroundColor);
        jQuery('.b-tooltip-' + vm._uid + ' > .arrow').css('border-top-color', vm.defaultBoxColor.backgroundColor);
        jQuery('.b-tooltip-' + vm._uid + ' > .arrow').css('border-bottom-color', vm.defaultBoxColor.backgroundColor);
      });
    });
  }
};function normalizeComponent(template, style, script, scopeId, isFunctionalTemplate, moduleIdentifier /* server only */, shadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
    if (typeof shadowMode !== 'boolean') {
        createInjectorSSR = createInjector;
        createInjector = shadowMode;
        shadowMode = false;
    }
    // Vue.extend constructor export interop.
    const options = typeof script === 'function' ? script.options : script;
    // render functions
    if (template && template.render) {
        options.render = template.render;
        options.staticRenderFns = template.staticRenderFns;
        options._compiled = true;
        // functional template
        if (isFunctionalTemplate) {
            options.functional = true;
        }
    }
    // scopedId
    if (scopeId) {
        options._scopeId = scopeId;
    }
    let hook;
    if (moduleIdentifier) {
        // server build
        hook = function (context) {
            // 2.3 injection
            context =
                context || // cached call
                    (this.$vnode && this.$vnode.ssrContext) || // stateful
                    (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext); // functional
            // 2.2 with runInNewContext: true
            if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
                context = __VUE_SSR_CONTEXT__;
            }
            // inject component styles
            if (style) {
                style.call(this, createInjectorSSR(context));
            }
            // register component module identifier for async chunk inference
            if (context && context._registeredComponents) {
                context._registeredComponents.add(moduleIdentifier);
            }
        };
        // used by ssr in case component is cached and beforeCreate
        // never gets called
        options._ssrRegister = hook;
    }
    else if (style) {
        hook = shadowMode
            ? function (context) {
                style.call(this, createInjectorShadow(context, this.$root.$options.shadowRoot));
            }
            : function (context) {
                style.call(this, createInjector(context));
            };
    }
    if (hook) {
        if (options.functional) {
            // register for functional component in vue file
            const originalRender = options.render;
            options.render = function renderWithStyleInjection(h, context) {
                hook.call(context);
                return originalRender(h, context);
            };
        }
        else {
            // inject component registration as beforeCreate hook
            const existing = options.beforeCreate;
            options.beforeCreate = existing ? [].concat(existing, hook) : [hook];
        }
    }
    return script;
}function createInjectorSSR(context) {
    if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__;
    }
    if (!context)
        return () => { };
    if (!('styles' in context)) {
        context._styles = context._styles || {};
        Object.defineProperty(context, 'styles', {
            enumerable: true,
            get: () => context._renderStyles(context._styles)
        });
        context._renderStyles = context._renderStyles || renderStyles;
    }
    return (id, style) => addStyle(id, style, context);
}
function addStyle(id, css, context) {
    const group = css.media || 'default' ;
    const style = context._styles[group] || (context._styles[group] = { ids: [], css: '' });
    if (!style.ids.includes(id)) {
        style.media = css.media;
        style.ids.push(id);
        let code = css.source;
        style.css += code + '\n';
    }
}
function renderStyles(styles) {
    let css = '';
    for (const key in styles) {
        const style = styles[key];
        css +=
            '<style data-vue-ssr-id="' +
                Array.from(style.ids).join(' ') +
                '"' +
                (style.media ? ' media="' + style.media + '"' : '') +
                '>' +
                style.css +
                '</style>';
    }
    return css;
}/* script */
var __vue_script__ = script;
/* template */

var __vue_render__ = function __vue_render__() {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('div', {
    staticClass: "visitStatusWrapper",
    class: {
      'small-box': _vm.SmallBox
    }
  }, [_vm._ssrNode("<div" + _vm._ssrClass("VisitBoxContent", {
    'active': _vm.active
  }) + _vm._ssrStyle(null, _vm.defaultBoxColor, null) + ">", "</div>", [_vm._ssrNode("<div class=\"text-center\"><div class=\"VisitTitle\"" + _vm._ssrStyle(null, {
    paddingTop: _vm.progress != null ? '20px' : '30px'
  }, null) + "><span>" + _vm._s(_vm.name) + "</span></div> <div class=\"VisitNumber\"" + _vm._ssrStyle(null, {
    top: _vm.progress != null ? '-7px' : '6px'
  }, null) + "><h1" + _vm._ssrClass("Number", {
    'text-3d': !_vm.SmallBox,
    'DummyFontSize': _vm.DummyFontSize
  }) + _vm._ssrStyle(null, {
    'font-size': _vm.fontSize ? _vm.fontSize : null,
    fontSize: _vm.FontSizeValue
  }, null) + ">" + _vm._ssrEscape("\n          " + _vm._s(_vm.completedValue) + "\n          ") + (_vm.totalValue ? "<span>" + _vm._ssrEscape("/ " + _vm._s(_vm.totalValue)) + "</span>" : "<!---->") + "</h1></div></div> <div style=\"clear: both\"></div> "), _vm._t("default"), _vm._ssrNode(" "), _vm.progress != null ? _vm._ssrNode("<div class=\"VisitProgress col-sm-12\">", "</div>", [_vm._ssrNode("<div class=\"left\">", "</div>", [_c('b-progress', {
    attrs: {
      "max": 100,
      "height": "1.5rem"
    }
  }, [_c('b-progress-bar', {
    style: {
      backgroundColor: _vm.progressBarColor
    },
    attrs: {
      "value": _vm._f("nullToZero")(_vm.progress)
    }
  })], 1)], 1), _vm._ssrNode(" <div class=\"right\">" + _vm._ssrEscape(_vm._s(_vm.progress) + "%") + "</div>")], 2) : _vm._e()], 2)]);
};

var __vue_staticRenderFns__ = [];
/* style */

var __vue_inject_styles__ = function __vue_inject_styles__(inject) {
  if (!inject) return;
  inject("data-v-ef19cb9c_0", {
    source: ".visitStatusWrapper{position:relative}.visitStatusWrapper .VisitBoxContent{position:relative;border-radius:3px;min-height:150px;box-shadow:0 0 14px 0 rgba(0,0,0,.25);color:#fff;padding:0 10px 25px 10px;font-family:Avenir-Black}.visitStatusWrapper .VisitBoxContent .VisitTitle{justify-content:flex-start}.visitStatusWrapper .VisitBoxContent .VisitNumber{text-align:center}.visitStatusWrapper .VisitBoxContent .VisitTitle{padding:20px 0 0 0;min-height:50px;font-size:13px;opacity:.7}.visitStatusWrapper .VisitBoxContent .VisitTitle span{font-family:inherit}.visitStatusWrapper .VisitBoxContent .VisitNumber{position:relative;top:-7px;margin-bottom:15px}.visitStatusWrapper .VisitBoxContent .VisitNumber .Number{font-family:Avenir-Black;color:#fff;font-size:50px}.visitStatusWrapper .VisitBoxContent .VisitNumber .Number span{font-size:26px;color:#fff;opacity:.7;font-family:Avenir-Black}.visitStatusWrapper .VisitBoxContent .VisitNumber .Number.DummyFontSize{margin-bottom:25px;font-size:25px!important}.visitStatusWrapper .VisitBoxContent .text-3d{text-shadow:0 1px 0 #c9cfce,0 2px 0 #bcc2c2,0 3px 0 #afb6b6,0 4px 0 #a4adac,0 5px 0 #9fa8a7,0 6px 0 #99a3a2,0 7px 0 #97a1a0,0 8px 0 #949e9d,0 0 5px rgba(0,0,0,.05),0 1px 3px rgba(0,0,0,.2),0 3px 5px rgba(0,0,0,.2),0 5px 10px rgba(0,0,0,.2),0 10px 10px rgba(0,0,0,.2),0 20px 20px rgba(0,0,0,.3)}.visitStatusWrapper .VisitBoxContent .VisitProgress{width:100%}.visitStatusWrapper .VisitBoxContent .VisitProgress .progress{height:6px!important;border-radius:5px;background:rgba(0,0,0,.2);overflow:visible}.visitStatusWrapper .VisitBoxContent .VisitProgress .progress .progress-bar{box-shadow:0 4px 4px 0 rgba(0,0,0,.25);margin-top:-1px;height:7px;border-radius:5px}.visitStatusWrapper .VisitBoxContent .VisitProgress .left{float:left;width:calc(100% - 55px)}.visitStatusWrapper .VisitBoxContent .VisitProgress .right{font-size:12px;font-family:Avenir-Black;float:right;width:55px;text-align:right;position:relative;top:-5px}.visitStatusWrapper .VisitBoxContent.BluePass{background:0 0!important;box-shadow:inset 0 0 10px 0 #9c9ef1;border:2px solid rgba(255,255,255,.19);border-radius:3px}.visitStatusWrapper .VisitBoxContent.BluePass .TwoNumber{color:#508eba!important}.visitStatusWrapper .tooltip-inner span strong{font-family:'Avenir-Black !important;'}.visitStatusWrapper .tooltip-text{position:absolute;right:5px;top:0;z-index:1;display:block;padding:10px}.visitStatusWrapper .tooltip-text i{color:rgba(255,255,255,.6);font-size:18px}.visitStatusWrapper .tooltip-text i:hover{color:#fff}.visitStatusWrapper.small-box .VisitBoxContent{min-height:110px!important;padding-bottom:0!important}.visitStatusWrapper.small-box .VisitBoxContent .VisitTitle{padding-top:10px!important}.visitStatusWrapper.small-box .VisitBoxContent .VisitNumber{margin-bottom:10px}.visitStatusWrapper.small-box .VisitBoxContent .VisitNumber .Number{font-size:36px;margin-bottom:0!important;line-height:.8em}.visitStatusWrapper.small-box .VisitBoxContent .VisitNumber .Number span{font-size:20px}.active{border:2px solid #fff!important}",
    map: undefined,
    media: undefined
  }), inject("data-v-ef19cb9c_1", {
    source: ".tooltip arrow:before{border-top-color:inherit;border-bottom-color:inherit}",
    map: undefined,
    media: undefined
  });
};
/* scoped */


var __vue_scope_id__ = undefined;
/* module identifier */

var __vue_module_identifier__ = "data-v-ef19cb9c";
/* functional template */

var __vue_is_functional_template__ = false;
/* style inject shadow dom */

var __vue_component__ = /*#__PURE__*/normalizeComponent({
  render: __vue_render__,
  staticRenderFns: __vue_staticRenderFns__
}, __vue_inject_styles__, __vue_script__, __vue_scope_id__, __vue_is_functional_template__, __vue_module_identifier__, false, undefined, createInjectorSSR, undefined);// Import vue component
// IIFE injects install function into component, allowing component
// to be registered via Vue.use() as well as Vue.component(),

var component = /*#__PURE__*/(function () {
  // Get component instance
  var installable = __vue_component__; // Attach install function executed by Vue.use()

  installable.install = function (Vue) {
    Vue.component('RemVisitStatusTest', installable);
  };

  return installable;
})(); // It's possible to expose named exports when writing components that can
// also be used as directives, etc. - eg. import { RollupDemoDirective } from 'rollup-demo';
// export const RollupDemoDirective = directive;
var namedExports=/*#__PURE__*/Object.freeze({__proto__:null,'default': component});// only expose one global var, with named exports exposed as properties of
// that global var (eg. plugin.namedExport)

Object.entries(namedExports).forEach(function (_ref) {
  var _ref2 = _slicedToArray(_ref, 2),
      exportName = _ref2[0],
      exported = _ref2[1];

  if (exportName !== 'default') component[exportName] = exported;
});module.exports=component;