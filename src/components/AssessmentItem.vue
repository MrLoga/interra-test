<template>
  <div>
    <span v-if="value !== null" :class="`assessment assessment__${Assessment[value]}`">
      {{ $t(Assessment[value]) }}
    </span>
    <span v-else class="assessment assessment__NULL">Нет оценки</span>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Assessment } from "@/models/Operation";
export default Vue.extend({
  name: "AssessmentItem",
  props: {
    value: Number,
  },
  data(): {
    Assessment: Record<string, unknown>;
  } {
    return {
      Assessment,
    };
  },
});
</script>

<style lang="stylus">

.assessment {
  white-space: nowrap;

  &:before {
    content: '';
    display: inline-block;
    margin-right: 10px;
    height: 10px;
    width: 20px;
    left: 0px;
    top: 5px;
    border-radius: 5px;
  }
  &__EXCELLENT:before {
    background: #66CC66;
  }
  &__SATISFACTORILY:before {
    background: #FFE06D;
  }
  &__BADLY:before {
    background: #FF7360;
  }
  &__NULL {
    color: rgba(51, 51, 51, 0.3);
    &:before {
      background: #EDEEEE;
    }
  }
}
</style>
