<template>
  <div class="root-input">
      <input :value="maskedValue">
      <svg class="fas fa-times"></svg>
  </div>
</template>

<script>
export default {
  name: 'VueInput',
  data() {
    return {
      dataValue: '',
      classList: [],
    }
  },
  props: {
      value: String,
      mask: String
  },
  computed: {
      maskedValue () {
          return this.dataValue
      },
      iconClass () {
          return this.classList.join('')
      }
  },
  mounted() {
      this.dataValue = this.value;
  },
  methods: {
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
    div.root-input svg {
        position: relative;
        display: none;
        right: 20px;
    }
    div.root-input:hover svg {
        display: inline-block;
    }
    div.root-input input:focus + svg {
        display: inline-block;
    }
</style>