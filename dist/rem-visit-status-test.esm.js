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
//
var script = {
  name: "VisitBoxProgress",

  data() {
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
    defaultBoxColor() {
      if (!this.boxColor) {
        return {
          backgroundColor: 'rgb(238,91,77)',
          backgroundImage: '-moz-linear-gradient( 108deg, rgb(247,157,154) 0%, rgb(243,124,116) 62%, rgb(238,91,77) 100%)',
          backgroundImage: // eslint-disable-line
          '-webkit-linear-gradient( 108deg, rgb(247,157,154) 0%, rgb(243,124,116) 62%, rgb(238,91,77) 100%)',
          backgroundImage: // eslint-disable-line
          '-ms-linear-gradient( 108deg, rgb(247,157,154) 0%, rgb(243,124,116) 62%, rgb(238,91,77) 100%)',
          backgroundImage: // eslint-disable-line
          'linear-gradient( 108deg, rgb(247,157,154) 0%, rgb(243,124,116) 62%, rgb(238,91,77) 100%)'
        };
      } else {
        return this.boxColor;
      }
    }

  },

  mounted() {
    let vm = this;
    this.$root.$on('bv::tooltip::show', bvEvent => {
      vm.$nextTick(function () {
        jQuery('.b-tooltip-' + vm._uid + ' > .tooltip-inner').css('background-color', vm.defaultBoxColor.backgroundColor);
        jQuery('.b-tooltip-' + vm._uid + ' > .arrow').css('border-top-color', vm.defaultBoxColor.backgroundColor);
        jQuery('.b-tooltip-' + vm._uid + ' > .arrow').css('border-bottom-color', vm.defaultBoxColor.backgroundColor);
      });
    });
  }

};

function normalizeComponent(template, style, script, scopeId, isFunctionalTemplate, moduleIdentifier /* server only */, shadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
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
}

const isOldIE = typeof navigator !== 'undefined' &&
    /msie [6-9]\\b/.test(navigator.userAgent.toLowerCase());
function createInjector(context) {
    return (id, style) => addStyle(id, style);
}
let HEAD;
const styles = {};
function addStyle(id, css) {
    const group = isOldIE ? css.media || 'default' : id;
    const style = styles[group] || (styles[group] = { ids: new Set(), styles: [] });
    if (!style.ids.has(id)) {
        style.ids.add(id);
        let code = css.source;
        if (css.map) {
            // https://developer.chrome.com/devtools/docs/javascript-debugging
            // this makes source maps inside style tags work properly in Chrome
            code += '\n/*# sourceURL=' + css.map.sources[0] + ' */';
            // http://stackoverflow.com/a/26603875
            code +=
                '\n/*# sourceMappingURL=data:application/json;base64,' +
                    btoa(unescape(encodeURIComponent(JSON.stringify(css.map)))) +
                    ' */';
        }
        if (!style.element) {
            style.element = document.createElement('style');
            style.element.type = 'text/css';
            if (css.media)
                style.element.setAttribute('media', css.media);
            if (HEAD === undefined) {
                HEAD = document.head || document.getElementsByTagName('head')[0];
            }
            HEAD.appendChild(style.element);
        }
        if ('styleSheet' in style.element) {
            style.styles.push(code);
            style.element.styleSheet.cssText = style.styles
                .filter(Boolean)
                .join('\n');
        }
        else {
            const index = style.ids.size - 1;
            const textNode = document.createTextNode(code);
            const nodes = style.element.childNodes;
            if (nodes[index])
                style.element.removeChild(nodes[index]);
            if (nodes.length)
                style.element.insertBefore(textNode, nodes[index]);
            else
                style.element.appendChild(textNode);
        }
    }
}

/* script */
const __vue_script__ = script;
/* template */

var __vue_render__ = function () {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('div', {
    staticClass: "visitStatusWrapper",
    class: {
      'small-box': _vm.SmallBox
    }
  }, [_c('div', {
    staticClass: "VisitBoxContent",
    class: {
      'active': _vm.active
    },
    style: _vm.defaultBoxColor
  }, [_c('div', {
    staticClass: "text-center"
  }, [_c('div', {
    staticClass: "VisitTitle",
    style: {
      paddingTop: _vm.progress != null ? '20px' : '30px'
    }
  }, [_c('span', {
    domProps: {
      "innerHTML": _vm._s(_vm.name)
    }
  })]), _vm._v(" "), _c('div', {
    staticClass: "VisitNumber",
    style: {
      top: _vm.progress != null ? '-7px' : '6px'
    }
  }, [_c('h1', {
    staticClass: "Number",
    class: {
      'text-3d': !_vm.SmallBox,
      'DummyFontSize': _vm.DummyFontSize
    },
    style: {
      'font-size': _vm.fontSize ? _vm.fontSize : null,
      fontSize: _vm.FontSizeValue
    }
  }, [_vm._v("\n          " + _vm._s(_vm.completedValue) + "\n          "), _vm.totalValue ? _c('span', [_vm._v("/ " + _vm._s(_vm.totalValue))]) : _vm._e()])])]), _vm._v(" "), _c('div', {
    staticStyle: {
      "clear": "both"
    }
  }), _vm._v(" "), _vm._t("default"), _vm._v(" "), _vm.progress != null ? _c('div', {
    staticClass: "VisitProgress col-sm-12"
  }, [_c('div', {
    staticClass: "left"
  }, [_c('b-progress', {
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
  })], 1)], 1), _vm._v(" "), _c('div', {
    staticClass: "right"
  }, [_vm._v(_vm._s(_vm.progress) + "%")])]) : _vm._e()], 2)]);
};

var __vue_staticRenderFns__ = [];
/* style */

const __vue_inject_styles__ = function (inject) {
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


const __vue_scope_id__ = undefined;
/* module identifier */

const __vue_module_identifier__ = undefined;
/* functional template */

const __vue_is_functional_template__ = false;
/* style inject SSR */

/* style inject shadow dom */

const __vue_component__ = /*#__PURE__*/normalizeComponent({
  render: __vue_render__,
  staticRenderFns: __vue_staticRenderFns__
}, __vue_inject_styles__, __vue_script__, __vue_scope_id__, __vue_is_functional_template__, __vue_module_identifier__, false, createInjector, undefined, undefined);

// Import vue component
// IIFE injects install function into component, allowing component
// to be registered via Vue.use() as well as Vue.component(),

var entry_esm = /*#__PURE__*/(() => {
  // Get component instance
  const installable = __vue_component__; // Attach install function executed by Vue.use()

  installable.install = Vue => {
    Vue.component('RemVisitStatusTest', installable);
  };

  return installable;
})(); // It's possible to expose named exports when writing components that can
// also be used as directives, etc. - eg. import { RollupDemoDirective } from 'rollup-demo';
// export const RollupDemoDirective = directive;

export default entry_esm;
