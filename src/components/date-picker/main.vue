<template>
  <div class="lemon-date-picker">
    <input class="lemon-date-picker-input" :class="{ active: visiable }" type="text" v-model="dateStr" readonly @focus="popup">
    <div class="calendar" v-if="visiable">
      <div class="calendar-header">
        <a href="javascript:;" @click="prevMonth">上个月</a>
        <span class="calendar-info" @click="selectType">
          <template v-if="currentType == 'date'">
            {{ currentDate.format('YYYY-MM') }}
          </template>

          <template v-if="currentType == 'month'">
            {{ currentDate.format('YYYY') }}
          </template>
        </span>
        <a href="javascript:;" @click="nextMonth">下个月</a>
      </div>
      <div class="calendar-body">
        <table v-if="currentType == 'date'">
          <thead>
            <tr>
              <td v-for="(name, index) in dayNames" :key="index">
                {{ name }}
              </td>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in details" :key="index">
              <td v-for="(date, n2) in item" :key="n2" @click="selectDate(date)" :class="currentDate.month() == date.month() ? 'current' : 'not-current'">
                <div class="inner" :class="{ selected: selectedDate.format('YYYY-MM-DD')  == date.format('YYYY-MM-DD') }">
                  {{ date.date() }}
                </div>
              </td>
            </tr>
          </tbody>
        </table>

        <table v-if="currentType == 'month'">
          <tbody>
            <tr v-for="n in monthNames.length / 4">
              <td v-for="n2 in 4">
                <div style="padding: 5px; margin: 10px 0;" :class="{ selected: selectedDate.month() == (n - 1) * 4 + (n2 - 1) }" @click="selectMonth((n - 1) * 4 + (n2 - 1))">
                  {{ monthNames[ (n - 1) * 4 + (n2 - 1) ] }}
                </div>
              </td>
            </tr>
          </tbody>
        </table>

        <table v-if="currentType == 'year'">

        </table>
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment';
import { addEvent } from '@/utils';

export default {
  name: 'LemonDatePicker',
  props: {
    disabled: {
      type: Boolean,
      default: false
    },
    value: {
      type: String,
      default: ''
    },
    type: {
      type: String,
      default: 'date'
    }
  },
  data() {
    return {
      dateStr: this.value,
      visiable: false,
      dayNames: ['日', '一', '二', '三', '四', '五', '六'],
      monthNames: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
      currentType: 'date',
      details: [],
      currentDate: null,
      selectedDate: null // 选择的日期
    }
  },
  computed: {
  },
  mounted() {
    this.installEvent();
  },
  beforeDestory() {
    // 卸载事件
    this.uninstallEvent();
  },
  methods: {
    show() {
      this.visiable = true;
    },
    hide() {
      this.visiable = false;
    },

    // 弹出
    popup() {
      if (!this.disabled && !this.visiable) {
        this.currentType = this.type;

        this.selectedDate = moment(this.value);
        this.currentDate = moment(this.value);
        this.details = this.getDetails(this.currentDate);

        this.show();
      }
    },

    // 获取详情
    getDetails(date) {
      date = moment(date);
      date.date(1);

      // console.log(date.date());
      // 开始的星期位置
      let start = date.day();
      date.add(-start, 'day');

      const details = [];
      // 纵向
      for (let i = 0; i < 6; i++) {
        let item = [];

        details.push(item);

        // 横向
        for (let j = 0; j < 7; j++) {
          item.push(moment(date));
          date.add(1, 'day');
        }
      }

      return details;
    },

    // 选择日期
    selectDate(date) {
      this.selectedDate = date;
      this.dateStr = date.format('YYYY-MM-DD');
      // this.dateStr = date.format('YYYY-MM-DD');
      this.$emit('input', this.dateStr);
      this.hide();
      this.$emit('change', this.dateStr, date);
    },

    // 选择月
    selectMonth(month) {
      this.currentDate.month(month);
      this.details = this.getDetails(this.currentDate);
      this.currentType = 'date';
    },

    // 上个月
    prevMonth() {
      this.currentDate.add(-1, 'month');
      this.details = this.getDetails(this.currentDate);
    },

    // 下个月
    nextMonth() {
      this.currentDate.add(1, 'month');
      this.details = this.getDetails(this.currentDate);
    },

    // 日期选择类型
    selectType() {
      this.currentType = 'month';
    },

    // 安装事件
    installEvent() {
      this.unbindFn = addEvent(document, 'click', (e) => {
        if (e.path.indexOf(this.$el) == -1) {
          this.hide();
        }
      })
    },

    // 卸载事件
    uninstallEvent() {
      this.unbindFn();
    }
  }
}
</script>
