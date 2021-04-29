<template>
  <table class="operations__table">
    <tr>
      <th v-for="(head, key) in thead" :key="key" :class="'operations__th operations__th_' + key">
        <div
          class="operations__label"
          :class="{
            operations__sort: 'grain' !== key,
            operations__sort_active: sortActive === key,
            operations__sort_reverse: sortActive === key && sortReverse,
          }"
          @click="sortBy(key)"
        >
          {{ head }}
        </div>
      </th>
    </tr>
    <tbody v-if="operations && operations.length">
      <tr v-for="operation in operationsLocal" :key="operation.id">
        <td class="operations__td operations__date">
          {{ operation.date | dateFormat }}
        </td>
        <td class="operations__td operations__type">
          {{ $t(OperationType[operation.type]) }}
        </td>
        <td class="operations__td">
          <GrainItem :value="0" />
        </td>
        <td class="operations__td">
          <AssessmentItem :value="operation.assessment" />
        </td>
      </tr>
    </tbody>
    <tbody v-else>
      <tr>
        <td colspan="4">
          <h4>Операций нет</h4>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script lang="ts">
import Vue from "vue";
import moment from "@/boot/moment";
import GrainItem from "@/components/GrainItem.vue";
import AssessmentItem from "@/components/AssessmentItem.vue";
import Operation, { OperationType } from "@/models/Operation";

export default Vue.extend({
  name: "TableOperations",
  components: {
    GrainItem,
    AssessmentItem,
  },
  props: {
    operations: Array as () => Operation[],
  },
  data(): {
    thead: Record<string, string>;
    sortReverse: boolean;
    sortActive: string | null;
    OperationType: Record<string, unknown>;
  } {
    return {
      thead: {
        date: "Дата",
        type: "Операция",
        grain: "Культура",
        assessment: "Качество",
      },
      sortReverse: false,
      sortActive: null,
      OperationType,
    };
  },
  methods: {
    sortBy(column: string): void {
      if (column === "grain") return;
      if (this.sortActive !== column) {
        this.sortReverse = false;
        this.sortActive = column;
        return;
      }
      if (!this.sortReverse && this.sortActive === column) {
        this.sortReverse = true;
        return;
      }
      if (this.sortReverse) {
        this.sortReverse = false;
        this.sortActive = null;
        return;
      }
    },
  },
  computed: {
    operationsLocal(): Operation[] {
      const copy = this.operations.map((item: Operation) => item);
      if (this.sortActive) {
        copy.sort((a: Operation, b: Operation): number => {
          switch (this.sortActive) {
            case "date":
              // Сортировка по дате
              return moment(a.date).isAfter(b.date) ? 1 : -1;
            case "type":
              // Сортировка по алфавиту, по переведенному слову
              if (a.type === b.type) return 0;
              return this.$t(OperationType[a.type]) > this.$t(OperationType[b.type]) ? 1 : -1;
            case "assessment":
              // Сортировка по значению enum Отлично (0) -> Плохо (2)
              if (a.assessment === undefined || a.assessment === null) return 1;
              if (b.assessment === undefined || b.assessment === null) return -1;
              if (a.assessment === b.assessment) return 0;
              return a.assessment > b.assessment ? 1 : -1;
            default:
              return 0;
          }
        });
        if (this.sortReverse) copy.reverse();
      }
      return copy;
    },
  },
});
</script>

<style lang="stylus">
.operations {
  &__table {
    width: 100%;
    border-collapse: collapse;
  }
  &__label {
    min-height: 40px;
    padding: 0 9px;
    display: flex;
    font-weight: 500;
    align-items: center;
  }
  &__sort {
    position: relative;
    user-select: none;
    &:after {
      content: "";
      margin: 0 0 -7px 5px;
      border: 5px solid transparent;
      border-top: 5px solid #A7A9AC;
    }
    &:hover {
      color: #000;
      cursor: pointer;
      &:after {
        border-top: 5px solid #acc5de;
      }
    }
    &_active {
      &:after, &:hover:after {
        border-top: 5px solid #3399FF;
      }
    }
    &_reverse {
      &:after, &:hover:after {
        margin: 0 0 3px 5px;
        border-top-color: transparent;
        border-bottom: 5px solid #3399FF;
      }
    }
  }
  &__th {
    background: #EDEEEE;
    font-size: 11px;
    font-weight: 500;
    &_date {
      width: 12%;
    }
    &_type {
      width: 42%;
    }
    &_grain {
      width: 23%;
    }
    &_assessment {
      width: 23%;
    }
  }
  &__td {
    padding: 11px 9px 9px;
    border-bottom: 1px solid #EDEEEE;
  }
  &__date {
    font-size: 11px;
    font-weight: 500;
    white-space: nowrap;
    text-transform: uppercase;
    color: rgba(51, 51, 51, 0.8);
  }
  &__type {
    font-weight: 500;
  }
}
</style>
