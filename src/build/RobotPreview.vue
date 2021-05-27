 <template>
  <div class="preview">
    <div class="preview-content">
      <div class="top-row">
        <img :src="robot.head.src" />
      </div>
      <div class="middle-row">
        <img :src="robot.leftArm.src" class="rotate-left" />
        <img :src="robot.torsos.src" />
        <img :src="robot.rightArm.src" class="rotate-right" />
      </div>
      <div class="bottom-row">
        <img :src="robot.base.src" />
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'RobotPreview',
  props: {
    robot: { type: Object, requried: true },
  },
};
</script>

<style scoped>

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
.preview {
  /* position: absolute; */
  top: -20px;
  right: 0;
  width: 210px;
}
.preview-content {
  border: 1px solid #999;
}
.preview img {
  width: 50px;
  height: 50px;
}
.rotate-right {
  transform: rotate(90deg);
}
.rotate-left {
  transform: rotate(-90deg);
}

</style>
