<template>
  <div class="vue-grid-container" :style="gridStyles">
    <div v-for="column in gridColumns" :key="column.id">
      <span class="column-header">{{column.header.text}}</span>
    </div>
  </div>
</template>
<script>
import Column from '../classes/Column'
import Header from '../classes/Header'

export default {
  name: 'VueGrid',
  data() {
    return {
      gridStyles: {},
      gridColumns: [],
    }
  },
  props: {
    styles: Object,
    columns: Array
  },
  mounted() {
    console.log(this.styles, this.columns)
    this.gridStyles = this.styles;

    for(let i = 0; i < this.columns.length; i += 1) {
      const _column = this.columns[i]
      const column = new Column({
        id: _column.id,
        header: new Header(_column.header)
      })
      this.gridColumns.push(column)
    }
  },
  methods: {
  }
}
</script>
<style scoped>
  .vue-grid-container {
    display: inline-flex;
  }
  .column-header {
    background-color: #ff0000;
  }
</style>