<template>
  <div class="grain" v-if="grain">
    <img class="grain__icon" :src="grain.src" />
    <span class="grain__name">{{ grain.title }}</span>
  </div>
</template>

<script lang="ts">
// Заглушка для данных
interface Grain {
  src: string;
  title: string;
}
const GrainData: Grain[] = [
  {
    src: require("@/assets/img/CropWheat.svg"),
    title: "Пшеница озимая",
  },
];

import Vue from "vue";
export default Vue.extend({
  name: "GrainItem",
  props: {
    value: Number,
  },
  data(): {
    grain: Grain | null;
  } {
    return {
      grain: null,
    };
  },
  created() {
    this.grain = GrainData[this.value];
  },
});
</script>

<style lang="stylus">
.grain {
  display: flex;
  align-items: center;

  &__icon {
    margin-right: 10px;
  }
}
</style>
