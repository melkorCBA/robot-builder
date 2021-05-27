<template>
    <div>
        <h1>{{part.title}}</h1>
        <div>
            {{ part.description}}
        </div>
    </div>
</template>

<script>
import getPartsMixin from './get-parts-mixin';

export default {
  name: 'PartInfo',
  mixins: [getPartsMixin],
  props: {
    type: {
      type: String,
    },
    id: {
      type: [Number, String],
      validator(value) {
        return Number.isInteger(Number(value));
      },
    },
  },

  computed: {
    part() {
      return this.parts[this.type].find((p) => p.id === +this.id);
    },
  },
};
</script>
