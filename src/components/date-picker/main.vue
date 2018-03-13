<template>
  <div class="lemon-date-picker">
    <input type="text" v-model="dateStr" readonly @focus="popup">
    <div class="calendar" v-if="visiable">
      <div class="calendar-header">
        <a href="javascript:;" @click="prevMonth">上个月</a>
        <span class="calendar-info">
          {{ currentDate.format('YYYY-MM-DD') }}
        </span>
        <a href="javascript:;" @click="nextMonth">下个月</a>
      </div>
      <div class="calendar-body">
        <table>
          <thead>
            <tr>
              <th v-for="(name, index) in dayNames" :key="index">
                {{ name }}
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in details" :key="index">
              <td v-for="(date, n2) in item" :key="n2" @click="selectDate(date)" :class="currentDate.month() == date.month() ? 'current' : 'not-current'">
                {{ date.date() }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment';
import './main.scss';
import { addEvent } from '@/utils';

export default {
  data() {
    return {
      dateStr: '',
      visiable: false,
      dayNames: ['日', '一', '二', '三', '四', '五', '六'],
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
      if (!this.visiable) {
        this.currentDate = this.selectedDate ? moment(this.selectedDate) : moment();
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
      this.selectedDate = date.format('YYYY-MM-DD');
      this.dateStr = date.format('YYYY-MM-DD');
      this.hide();
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
