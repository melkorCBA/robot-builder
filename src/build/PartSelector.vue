<template>
  <div class="part" :class="[position,
  {'sale-border': selectedPart.onSale && isHeadPart}]">
      <div v-if="isHeadPart" class="robot-name">
        {{ selectedPart.title }}
      </div>
      <img @click="showPartInfo()" :src="selectedPart.src" title="left arm" />
      <button @click="toggleParts('pre')" class="prev-selector">&#9668;</button>
      <button @click="toggleParts('next')" class="next-selector">
        &#9658;
      </button>
      <span v-pin v-if="showOnSalePart"
        class="sale"
        >on sale</span
      >

  </div>
</template>

<script>

const getNextValidIndex = (index, array) => {
  const value = array[index + 1];
  return value ? index + 1 : 0;
};
const getPreviousValidIndex = (index, array) => {
  const value = array[index - 1];
  return value ? index - 1 : array.length - 1;
};

export default {
  name: 'PartSelector',
  props: {
    parts: { type: Array, requried: true },
    position: {
      type: String,
      requried: true,
      validator: (value) => ['left', 'right', 'top', 'bottom', 'center'].includes(value),
    },
  },

  data() {
    return {
      selectedPartIndex: 0,
    };
  },
  watch: {
    selectedPartIndex: {
      handler: 'emitPartToggle',
    },
  },
  created() {
    this.emitPartToggle();
  },
  computed: {
    selectedPart() {
      return this.parts[this.selectedPartIndex];
    },

    isHeadPart() {
      return this.parts[this.selectedPartIndex].type === 'heads';
    },

    showOnSalePart() {
      return this.selectedPart.onSale && this.selectedPart.type === 'heads';
    },
  },
  methods: {
    toggleParts(direction) {
      switch (direction) {
        case 'next':
          this.selectedPartIndex = getNextValidIndex(
            this.selectedPartIndex,
            this.parts,
          );

          break;

        case 'pre':
          this.selectedPartIndex = getPreviousValidIndex(
            this.selectedPartIndex,
            this.parts,
          );

          break;
        default:
          break;
      }
    },

    emitPartToggle() {
      this.$emit('togglePart', this.selectedPart);
    },

    showPartInfo() {
      this.$router.push({
        name: 'Part',
        params: {
          id: this.selectedPart.id, type: this.selectedPart.type,
        },
      });
    },
  },
};
</script>

<style scoped>
.part {
  position: relative;
  width: 165px;
  height: 165px;
  border: 3px solid #aaa;
}
.sale {

  color: white;
  background-color: red;
  padding: 3px;
}

.sale-border {
  border: 3px solid red;
}
.part-title {
  position: absolute;
  width: 100%;
  text-align: center;
  font-size: 18px;
  color: red;
  padding-top: 5px;
  top: -25px;
}
.part img {
  width: 165px;
  cursor: pointer;
}
.top {
  border-bottom: none;
}
.left {
  border-right: none;
}
.right {
  border-left: none;
}
.bottom {
  border-top: none;
}
.left img {
  transform: rotate(-90deg);
}
.right img {
  transform: rotate(90deg);
}
.prev-selector {
  position: absolute;
  z-index: 1;
  top: -3px;
  left: -28px;
  width: 25px;
  height: 171px;
}
.next-selector {
  position: absolute;
  z-index: 1;
  top: -3px;
  right: -28px;
  width: 25px;
  height: 171px;
}

.left .prev-selector {
  top: -28px;
  left: -3px;
  width: 144px;
  height: 25px;
}
.left .next-selector {
  top: auto;
  bottom: -28px;
  left: -3px;
  width: 144px;
  height: 25px;
}
.right .prev-selector {
  top: -28px;
  left: 24px;
  width: 144px;
  height: 25px;
}
.right .next-selector {
  top: auto;
  bottom: -28px;
  left: 24px;
  width: 144px;
  height: 25px;
}
.highlight {
  border: 1px solid red;
}

.robot-name {
  position: absolute;
  top: -25px;
  text-align: center;
  width: 100%;
}
</style>
