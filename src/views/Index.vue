<template>
  <div>
    <header-area v-on:search-value-event="searchValueUpdate"></header-area>
    <v-content>
      <v-layout align-centter justify-center>
        <v-flex>
          <create-item></create-item>
          <item-list v-bind:search="parentSearchValue"></item-list>
        </v-flex>
      </v-layout>
    </v-content>
  </div>
</template>

<script>
import HeaderArea from '@/components/HeaderArea'
import ItemList from '@/components/ItemList'
import CreateItem from '@/components/CreateItem'

export default {
  name: 'index',
  components: {
    HeaderArea,
    ItemList,
    CreateItem,
  },
  data() {
    return {
      parentSearchValue: ''
    }
  },
  methods: {
    searchValueUpdate(v) {
      this.parentSearchValue = v
    },
  }
}
</script>
