<template>
  <div class="visitStatusWrapper" :class="{'small-box': SmallBox}">
    <div class="VisitBoxContent" :style="defaultBoxColor" :class="{'active': active}">
      <div class="text-center" style="text-align: center;">
        <div class="VisitTitle" :style="{paddingTop: progress != null ? '20px' : '30px'}">
          <span v-html="name"></span>
        </div>
        <div class="VisitNumber" :style="{top: progress != null ? '-7px' : '6px'}">
          <h1 class="Number" :style="{ 'font-size': fontSize ?  fontSize : null, fontSize: FontSizeValue}" :class="{'text-3d': !SmallBox, 'DummyFontSize': DummyFontSize}">
            {{ completedValue  }}
            <span v-if="totalValue">/ {{ totalValue }}</span>
          </h1>
        </div>
      </div>
      <div style="clear: both"></div>
      <slot></slot>
      <div class="VisitProgress col-sm-12" v-if="progress != null">
        <div class="left">
          <progress :max="100" :value="progress" style="width: 100%;"></progress>
          <b-progress :max="100" height="1.5rem">
            <b-progress-bar :style="{backgroundColor: progressBarColor}" :value="progress" />
          </b-progress>
        </div>
        <div class="right">{{ progress }}%</div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "VisitBoxProgress",
  data() {
    return {};
  },
  props: {
    name: {
      type: String,
      required: true
    },
    completedValue: {
      type: String,
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
      type: Object,
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
    defaultBoxColor () {
      if (!this.boxColor) {
        return {
          backgroundColor: 'rgb(238,91,77)',
          backgroundImage:
              '-moz-linear-gradient( 108deg, rgb(247,157,154) 0%, rgb(243,124,116) 62%, rgb(238,91,77) 100%)',
          backgroundImage: // eslint-disable-line
              '-webkit-linear-gradient( 108deg, rgb(247,157,154) 0%, rgb(243,124,116) 62%, rgb(238,91,77) 100%)',
          backgroundImage: // eslint-disable-line
              '-ms-linear-gradient( 108deg, rgb(247,157,154) 0%, rgb(243,124,116) 62%, rgb(238,91,77) 100%)',
          backgroundImage: // eslint-disable-line
              'linear-gradient( 108deg, rgb(247,157,154) 0%, rgb(243,124,116) 62%, rgb(238,91,77) 100%)'
        };
      } else {
        return this.boxColor
      }
    }
  },
  mounted () {
    let vm = this
    this.$root.$on('bv::tooltip::show', bvEvent => {
      vm.$nextTick(function () {
        jQuery('.b-tooltip-' + vm._uid +' > .tooltip-inner').css('background-color', vm.defaultBoxColor.backgroundColor)
        jQuery('.b-tooltip-' + vm._uid +' > .arrow').css('border-top-color', vm.defaultBoxColor.backgroundColor)
        jQuery('.b-tooltip-' + vm._uid +' > .arrow').css('border-bottom-color', vm.defaultBoxColor.backgroundColor)
      })

    })
  }
};
</script>
<style >
.visitStatusWrapper {
  position: relative;
}
.visitStatusWrapper .VisitBoxContent {
  position: relative;
  border-radius: 3px;
  min-height: 150px;
  box-shadow: 0px 0px 14px 0px rgba(0, 0, 0, 0.25);
  color: #fff;
  padding: 0 10px 25px 10px;
  font-family: "Avenir-Black";
}
.visitStatusWrapper .VisitBoxContent .VisitTitle {
  justify-content: flex-start;
  /* Horizontal center alignment */
}
.visitStatusWrapper .VisitBoxContent .VisitNumber {
  text-align: center;
}
.visitStatusWrapper .VisitBoxContent .VisitTitle {
  padding: 20px 0px 0px 0px;
  min-height: 50px;
  font-size: 13px;
  opacity: 0.7;
}
.visitStatusWrapper .VisitBoxContent .VisitTitle span {
  font-family: inherit;
}
.visitStatusWrapper .VisitBoxContent .VisitNumber {
  position: relative;
  top: -7px;
  margin-bottom: 15px;
}
.visitStatusWrapper .VisitBoxContent .VisitNumber .Number {
  font-family: "Avenir-Black";
  color: #fff;
  font-size: 50px;
}
.visitStatusWrapper .VisitBoxContent .VisitNumber .Number span {
  font-size: 26px;
  color: #fff;
  opacity: 0.7;
  font-family: Avenir-Black;
}
.visitStatusWrapper .VisitBoxContent .VisitNumber .Number.DummyFontSize {
  margin-bottom: 25px;
  font-size: 25px !important;
}
.visitStatusWrapper .VisitBoxContent .text-3d {
  text-shadow: 0 1px 0 #c9cfce, 0 2px 0 #bcc2c2, 0 3px 0 #afb6b6, 0 4px 0 #a4adac, 0 5px 0 #9fa8a7, 0 6px 0 #99a3a2, 0 7px 0 #97a1a0, 0 8px 0 #949e9d, 0 0 5px rgba(0, 0, 0, 0.05), 0 1px 3px rgba(0, 0, 0, 0.2), 0 3px 5px rgba(0, 0, 0, 0.2), 0 5px 10px rgba(0, 0, 0, 0.2), 0 10px 10px rgba(0, 0, 0, 0.2), 0 20px 20px rgba(0, 0, 0, 0.3);
}
.visitStatusWrapper .VisitBoxContent .VisitProgress {
  width: 100%;
}
.visitStatusWrapper .VisitBoxContent .VisitProgress .progress {
  height: 6px !important;
  border-radius: 5px;
  background: rgba(0, 0, 0, 0.2);
  overflow: visible;
}
.visitStatusWrapper .VisitBoxContent .VisitProgress .progress .progress-bar {
  box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 0.25);
  margin-top: -1px;
  height: 7px;
  border-radius: 5px;
}
.visitStatusWrapper .VisitBoxContent .VisitProgress .left {
  float: left;
  width: calc(100% - 55px);
}
.visitStatusWrapper .VisitBoxContent .VisitProgress .right {
  font-size: 12px;
  font-family: "Avenir-Black";
  float: right;
  width: 55px;
  text-align: right;
  position: relative;
  top: -5px;
}
.visitStatusWrapper .VisitBoxContent.BluePass {
  background: transparent !important;
  box-shadow: inset 0px 0px 10px 0px #9c9ef1;
  border: 2px solid rgba(255, 255, 255, 0.19);
  border-radius: 3px;
}
.visitStatusWrapper .VisitBoxContent.BluePass .TwoNumber {
  color: #508eba !important;
}
.visitStatusWrapper .tooltip-inner span strong {
  font-family: 'Avenir-Black !important;';
}
.visitStatusWrapper .tooltip-text {
  position: absolute;
  right: 5px;
  top: 0;
  z-index: 1;
  display: block;
  padding: 10px;
}
.visitStatusWrapper .tooltip-text i {
  color: rgba(255, 255, 255, 0.6);
  font-size: 18px;
}
.visitStatusWrapper .tooltip-text i:hover {
  color: rgba(255, 255, 255, 1);
}
.visitStatusWrapper.small-box .VisitBoxContent {
  min-height: 110px !important;
  padding-bottom: 0px !important;
}
.visitStatusWrapper.small-box .VisitBoxContent .VisitTitle {
  padding-top: 10px !important;
}
.visitStatusWrapper.small-box .VisitBoxContent .VisitNumber {
  margin-bottom: 10px;
}
.visitStatusWrapper.small-box .VisitBoxContent .VisitNumber .Number {
  font-size: 36px;
  margin-bottom: 0px !important;
  line-height: 0.8em;
}
.visitStatusWrapper.small-box .VisitBoxContent .VisitNumber .Number span {
  font-size: 20px;
}


.active {
  border:2px solid #fff !important;
}
</style>
<style >
.tooltip arrow:before {
    border-top-color: inherit;
    border-bottom-color: inherit;
}
</style>
