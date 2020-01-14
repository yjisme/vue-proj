<template>
    <div
        class="pager"
        v-if="total>0"
    >
        <ul>
            <template v-if="current>1">
                <li @click="toPage(1)">
                    |&lt;&lt;
                </li>
                <li @click="toPage(current-1)">
                    &lt;&lt;
                </li>
            </template>

            <li
                v-for="i in numbers"
                :key="i"
                :class="i===current?'current':''"
                @click="toPage(i)"
            >
                {{i}}
            </li>

            <template v-if="current<pageNumber">
                <li @click="toPage(current+1)">
                    &gt;&gt;
                </li>
                <li @click="toPage(pageNumber)">
                    &gt;&gt;|
                </li>
            </template>

        </ul>
    </div>
</template>

<script>
    export default {
      props: {
        total: {
          type: Number,
          default: 0
        },
        current: {
          type: Number,
          default: 1
        },
        limit: {
          type: Number,
          default: 10
        },
        panelNumber: {
          type: Number,
          default: 10
        }
      },
      computed: {
        pageNumber() {
          return Math.ceil(this.total / this.limit);
        },
        minNumber() {
          var min = Math.floor(this.current - this.panelNumber / 2);
          if (min < 1) {
            min = 1;
          }
          return min;
        },
        maxNumber() {
          var max = this.minNumber + this.panelNumber - 1;
          if (max > this.pageNumber) {
            max = this.pageNumber;
          }
          return max;
        },
        numbers() {
          var arr = [];
          for (let i = this.minNumber; i <= this.maxNumber; i++) {
            arr.push(i);
          }
          return arr;
        }
      },
      methods: {
        toPage(index) {
          if (index === this.current) {
            return;
          }
          this.$emit("page-change", index);
        }
      }
    };
</script>

<style scoped>
    .pager {
      width: 100%;
      display: flex;
      justify-content: center;
      color: #333;
    }

    .pager ul {
      display: flex;
    }
    .pager ul li {
      padding: 10px;
      cursor: pointer;
      margin: 0 5px;
    }
    .pager ul li:hover {
      color: rgb(223, 145, 117);
    }

    .pager ul li.current {
      color: #f40;
      cursor: auto;
    }
</style>
