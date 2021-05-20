<template>
  <div :class="direction === 'right' ? 'right' : ''">
      <input type="checkbox" :checked="checked">
      <label>{{text}}</label>
  </div>
</template>

<script>
export default {
  name: 'VueCheckBox',
  props: {
    checked: Boolean,
    text: String,
    direction: String
  },
  mounted() {
      console.log(this.checked)
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
</style>