<template>
    <button>
        <span v-if="iconClass && iconClass.length > 0" class="fa" :class="iconClass"></span>
        {{text}}
     </button>
</template>

<script>
export default {
  name: 'VueButton',
  props: {
    text: String,
    iconClass: String
  },
  mounted() {
      console.log(this.iconClass)
  }
}
</script>