<template>
  <b-row>
    <b-pagination v-model="currentPage" pill :total-rows="filteredItemsCount" :per-page="perPage">
    </b-pagination>
  </b-row>
</template>

<script>
import { mapGetters, mapMutations, mapState } from 'vuex'
import * as Types from '../../store/types'
export default {
  name: 'Pagination',
  mounted() {
    console.log('asdfasdfasdf')
  },
  computed: {
    ...mapState(['perPage', 'pagesToShow']),
    ...mapGetters(['filterProducts']),
    filteredItemsCount() {
      console.log('filteredProducts =>', this.filterProducts)
      return this.filterProducts.length
    },
    currentPage: {
      get() {
        return this.$store.state.currentPage
      },
      set(page) {
        this.setCurrentPage(page)
      },
    },
  },

  methods: {
    ...mapMutations({
      setCurrentPage: Types.SET_CURRENT_PAGE,
    }),
  },
}
</script>

<style scoped>
</style>
