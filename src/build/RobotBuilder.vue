<template>
  <div v-if="availableParts" class="content">
    <div style="upper-menu">
      <CollapsibleSection>
        <RobotPreview :robot="selectedRobot" />
      </CollapsibleSection>

      <button class="add-to-cart" @click="addToCart()">Add to Cart</button>
    </div>

    <div class="part-selectors">
      <div class="top-row">
        <PartSelector
          :position="'top'"
          :parts="availableParts.heads"
          @togglePart="(part) => (selectedRobot.head = part)"
        />
      </div>
      <div class="middle-row">
        <PartSelector
          :position="'left'"
          :parts="availableParts.arms"
          @togglePart="(part) => (selectedRobot.leftArm = part)"
        />

        <PartSelector
          :position="'center'"
          :parts="availableParts.torsos"
          @togglePart="(part) => (selectedRobot.torsos = part)"
        />
        <PartSelector
          :position="'right'"
          :parts="availableParts.arms"
          @togglePart="(part) => (selectedRobot.rightArm = part)"
        />
      </div>
      <div class="bottom-row">
        <PartSelector
          :position="'bottom'"
          :parts="availableParts.bases"
          @togglePart="(part) => (selectedRobot.base = part)"
        />
      </div>
    </div>

  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import CreatedHookMixin from './createdHook-mixin';
import PartSelector from './PartSelector.vue';
import RobotPreview from './RobotPreview.vue';
import CollapsibleSection from '../shared/CollapsibleSection.vue';

export default {
  name: 'RobotBuilder',
  created() {
    this.getParts();
  },
  beforeRouteLeave(to, from, next) {
    if (!this.isAnyUnSavedRobotChange) {
      next(true);
      return;
    }

    // eslint-disable-next-line no-alert
    const response = window.confirm('You have to add robot to your cart, Are you sure you want to leave?');
    next(response);
  },
  components: { PartSelector, RobotPreview, CollapsibleSection },
  data() {
    return {
      isAnyUnSavedRobotChange: false,
      selectedRobot: {
        head: {},
        leftArm: {},
        rightArm: {},
        torsos: {},
        base: {},
      },
    };
  },
  watch: {
    selectedRobot: {
      handler() {
        this.isAnyUnSavedRobotChange = true;
      },
      deep: true,
    },
  },
  mounted() {
    // eslint-disable-next-line func-names
    this.$nextTick(function () {
    // Code that will run only after the
    // entire view has been rendered
      this.isAnyUnSavedRobotChange = false;
    });
  },
  mixins: [CreatedHookMixin],
  computed: {
    ...mapState({
      availableParts: (state) => state.robot.parts,
    }),

  },
  methods: {
    ...mapActions('robot', ['getParts', 'addRobotToCart']),
    addToCart() {
      this.isAnyUnSavedRobotChange = false;
      const robot = this.selectedRobot;
      const cost = robot.head.cost
        + robot.leftArm.cost
        + robot.rightArm.cost
        + robot.torsos.cost
        + robot.base.cost;
      this.addRobotToCart({ ...robot, cost })
        .then(() => this.$router.push('cart'))
        .catch((err) => console.log(err));
    },
  },
};
</script>

<style lang="scss" scoped>
.top-row {
  display: flex;
  justify-content: space-around;
}
.middle-row {
  display: flex;
  justify-content: center;
}
.bottom-row {
  display: flex;
  justify-content: space-around;
  border-top: none;
}

.content {
  position: relative;
}

.add-to-cart {
  // position: absolute;
  width: 210px;
  padding: 3px;
  font-size: 16px;
  right: 5px;
  top: 140px;
}

td,
th {
  text-align: left;
  padding: 5px;
  padding-right: 20px;
}
.cost {
  text-align: right;
}
.upper-menu {
  position: absolute;
  top: 20px;
}
.part-selectors {
  top:400px
}
</style>
