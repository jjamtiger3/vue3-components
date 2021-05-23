<template>
  <div :class="direction === 'right' ? 'right' : ''">
      <input type="checkbox" :checked="dataChecked">
      <label v-on:click="onLabelClicked">{{text}}</label>
  </div>
</template>

<script>
export default {
  name: 'VueCheckBox',
  data() {
    return {
      dataChecked: false
    }
  },
  props: {
    checked: Boolean,
    text: String,
    direction: String
  },
  mounted() {
      this.dataChecked = this.checked;
      this.$emit('onAfterMounted', {
        target: this
      })
  },
  methods: {
    setChecked(checked) {
      this.dataChecked = checked
    },
    onLabelClicked () {
      const oldValue = this.dataChecked
      this.setChecked(!this.dataChecked)
      const newValue = this.dataChecked

      this.$emit('onCheckedValueChanged', {
        oldValue, 
        newValue
      })
    }
  }
}
</script>
<style scoped>
div {
  display: inline-flex;
  align-items: center;
}
div.right {
  flex-direction: row-reverse;
}
div label {
  user-select: none;
}
</style>