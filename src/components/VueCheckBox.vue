<template>
  <div :class="direction === 'right' ? 'right' : ''" v-on:click="onClick">
      <input type="checkbox" :checked="dataChecked">
      <label>{{dataText}}</label>
  </div>
</template>

<script>
export default {
  name: 'VueCheckBox',
  data() {
    return {
      dataChecked: false,
      dataText: ''
    }
  },
  props: {
    checked: Boolean,
    text: String,
    direction: String,
    uid: String
  },
  watch: {
    checked: function(newValue) {
      this.dataChecked = newValue
    },
    text: function(newValue) {
      this.dataText = newValue
    }
  },
  mounted() {
      this.dataChecked = this.checked;
      this.dataText = this.text
      console.log(this.dataChecked, this.dataText)
      this.$emit('onAfterMounted', {
        target: this.uid
      })
  },
  methods: {
    setChecked (checked) {
      this.dataChecked = checked
      return this.dataChecked
    },
    onClick () {
      const target = this.uid
      const oldValue = this.dataChecked
      const newValue = !this.dataChecked
      this.setChecked(newValue)

      this.$emit('onCheckedValueChanged', {
        target,
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