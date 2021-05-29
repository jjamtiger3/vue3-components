<template>
  <div class="vue-grid-container" :style="gridStyles">
    <div class="vue-grid-header">
      <div class="grid-column" v-for="column in gridColumns" :key="column.id" :style="column.style">
        <span class="column-header" :style="column.header.style">{{column.header.text}}</span>
      </div>
    </div>
    <div class="vue-grid-body"></div>
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
      console.log(_column.header)
      const column = new Column({
        id: _column.id,
        header: new Header(_column.header),
        style: _column.style
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
    overflow: auto;
  }
  .vue-grid-container .vue-grid-header {
    width: max-content;
  }
  .vue-grid-container .grid-column {
    display: inline-block;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .vue-grid-container .grid-column .column-header {
    width: 100%;
    display: block;
    border-bottom: 1px solid black;
    border-left: 1px solid black;
  }
  .vue-grid-container .grid-column:first-child .column-header {
    border-left: none;
  }
</style>