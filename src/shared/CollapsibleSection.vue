<template>
  <div>
    <div class="header">
      <span v-if="open" @click="open = !open">&#x25B2; Collapse</span>
      <span v-if="!open" @click="open = !open">&#x25BC; Expand</span>
    </div>
    <!----Toggleable Content---->
    <slot v-if="open">
    </slot>
  </div>
</template>

<script>
export default {
  name: 'CollapsibleSection',
  data() {
    return {
      open: true,
    };
  },
};
</script>

<style scoped>
    .header {
        z-index: 1;
        width: 200px;
        right: 5px;
        background-color: #bbb;
        padding: 5px;
        cursor: pointer;
    }
</style>
