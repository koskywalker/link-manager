<template>
  <div>
    <header-area @search-value-event="searchValueUpdate"></header-area>
    <v-content>
      <v-layout align-centter justify-center>
        <v-flex>
          <item-list v-bind:search="parentSearchValue"></item-list>
          <shortcut-area></shortcut-area>
        </v-flex>
      </v-layout>
    </v-content>
  </div>
</template>

<script>
import HeaderArea from '@/components/HeaderArea'
import ItemList from '@/components/ItemList'
import ShortcutArea from '@/components/ShortcutArea'

export default {
  components: {
    HeaderArea,
    ItemList,
    ShortcutArea
  },

  data () {
    return {
      parentSearchValue: ''
    }
  },

  methods: {
    searchValueUpdate (v) {
      this.parentSearchValue = v
    }
  }
}
</script>
