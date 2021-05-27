import { mapState } from 'vuex';

const emptyRobot = {
  heads: [],
  arms: [],
  torsos: [],
  bases: [],
};

export default {
  created() {
    this.$store.dispatch('robot/getParts');
  },
  computed: {
    ...mapState({
      parts: (state) => state.robot.parts ?? emptyRobot,
    }),

  },
};
