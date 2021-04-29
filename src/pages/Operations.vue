<template>
  <div class="page">
    <h1>Операции на поле 112</h1>
    <nav class="operations__nav">
      <div class="operations__tabs tabs">
        <router-link
          class="tabs__item"
          active-class="tabs__item_active"
          :to="{ name: 'Operations', params: { type: 'scheduled' } }"
          >Запланированные операции</router-link
        >
        <router-link
          class="tabs__item"
          active-class="tabs__item_active"
          :to="{ name: 'Operations', params: { type: 'completed' } }"
          >Выполненные операции</router-link
        >
      </div>
      <button class="operations__add">
        <img src="@/assets/img/+green.svg" class="operations__add-icon" />
        <span>Добавить операцию</span>
      </button>
    </nav>

    <TableOperations :operations="operations" />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import moment from "moment";
import TableOperations from "@/components/TableOperations.vue";
import FieldService from "@/FieldService";
import Operation from "@/models/Operation";

const fieldService = new FieldService();

export default Vue.extend({
  name: "Operations",
  components: {
    TableOperations,
  },
  data(): {
    operationsAll: Operation[];
    type: string | null;
  } {
    return {
      operationsAll: [],
      type: null,
    };
  },
  created() {
    this.setTab(this.$route);
    this.getOperations();
  },
  beforeRouteUpdate(to, from, next) {
    this.setTab(to);
    next();
  },
  methods: {
    async getOperations() {
      this.operationsAll = await fieldService.getOperations();
    },
    setTab(to: { params: { type?: string } }): void {
      if (!to.params.type) {
        this.$router.push({
          name: "Operations",
          params: { type: "scheduled" },
        });
        return;
      }
      this.type = to.params.type;
    },
  },
  computed: {
    operations(): Operation[] {
      return this.operationsAll.filter((operation) =>
        this.type === "scheduled"
          ? moment(operation.date).isAfter(new Date())
          : moment(operation.date).isBefore(new Date())
      );
    },
  },
});
</script>

<style lang="stylus">
.operations {
  &__nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 24px;
  }
  &__add {
    display: flex;
    align-items: center;
    cursor: pointer;
    font-size: 13px;
    border: none;
    background: #fff;
    height: 40px;
    vertical-align: middle;
    border-radius: 20px;
    padding: 0 15px;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
    transition: box-shadow 0.15s, background 0.15s;
    &-icon {
      margin-right: 7px;
    }
    &:hover {
      background: #fcfcfc;
      box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.2);
    }
    &:active {
      background: #f6f6f6;
      box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.1);
    }
  }
}

.tabs {
  text-transform: uppercase;

  &__item {
    font-size: 11px;
    margin-right: 18px;
    color: #3399FF;
    text-decoration: none;

    &:hover, &_active {
      color: #333;
    }
    &_active {
      cursor: default;
    }
  }
}
</style>
