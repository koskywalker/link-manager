<template>
  <div>
    <header-area
      @search-value-event="searchValueUpdate"
    ></header-area>
    <v-content>
      <v-layout
        align-centter
        justify-center
      >
        <v-flex>
          <item-list
            v-bind:search="parentSearchValue"
          ></item-list>
        </v-flex>
      </v-layout>
    </v-content>
  </div>
</template>

<script>
import HeaderArea from '@/components/HeaderArea'
import ItemList from '@/components/ItemList'

export default {
  name: 'index',
  components: {
    HeaderArea,
    ItemList,
  },

  data() {
    return {
      parentSearchValue: ''
    }
  },

  methods: {
    searchValueUpdate(v) {
      this.parentSearchValue = v
    }
  }
}
</script>
