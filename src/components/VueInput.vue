<template>
  <div class="root-input" v-on:click="onClick" v-on:mouseover="onMouseOver" v-on:mouseleave="onMouseLeave">
      <input :value="dataValue">
      <span class="clear-button fa fa-times" :class="iconClass"></span>
  </div>
</template>

<script>
export default {
  name: 'VueInput',
  data() {
    return {
      dataValue: '',
      iconClass: ''
    }
  },
  props: {
      value: String
  },
  computed: {

  },
  mounted() {
      this.dataValue = this.value;
  },
  methods: {
    onClick () {
    },
    onMouseOver() {
        this.iconClass = 'mouseover'
    },
    onMouseLeave() {
        this.iconClass = ''
    }
  }
}
</script>
<style scoped>
    div.root-input {
        display: inline-flex;
        align-items: center;
    }
    div.root-input input {
        padding-right: 20px;
    }
    div.root-input span.clear-button {
        position: relative;
        display: none;
        right: 20px;
    }
    div.root-input span.clear-button.mouseover {
        display: inline-block;
    }
</style>