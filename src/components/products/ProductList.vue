<template>
  <div class="row">
    <div class="col-3 d-none d-lg-block d-xl-block">
      <!-- <div v-for="(category, index) in categories" :key="category.id">
        <b-form-group>
          <template #label>
            <b-form-checkbox
              v-model="allSelected[index]"
              :indeterminate="indeterminate[index]"
              aria-describedby="flavours"
              aria-controls="flavours"
              @change="toggleAll(index)"
            >
              {{ category.name }}
            </b-form-checkbox>
          </template>

          <template v-slot="{ ariaDescribedby }">
            <b-form-checkbox-group
              id="flavors"
              v-model="selected[index]"
              :options="categories[index].sections.map((section) => section.name)"
              :aria-describedby="ariaDescribedby"
              name="flavors"
              class="ml-4"
              aria-label="Individual flavours"
              @change="changeSection(index)"
              stacked
            ></b-form-checkbox-group>
          </template>
        </b-form-group>
      </div> -->
      <a-collapse :activeKey="['1', '2', '3']">
        <a-collapse-panel key="1" header="Search" :disabled="false">
          <div style="padding: 10px">
            <b-input placeholder="Search" @keyup="onSearch" />
          </div>
        </a-collapse-panel>
        <a-collapse-panel key="2" header="Categories">
          <ul class="list-group flex-row flex-wrap">
            <li
              style="padding-top: 10px; padding-bottom: 0"
              class="list-group-item flex-50"
              v-for="category in categories"
              :key="category.id"
            >
              <label class="custom-checkbox text-capitalize">
                {{ category.name }}
                <input
                  type="checkbox"
                  :name="category.name"
                  :value="category.id"
                  class="custom-checkbox__input"
                  @input="onChangeSelectBox($event)"
                />
                <span class="custom-checkbox__span"></span>
              </label>
              <ul class="list-group flex-row flex-wrap">
                <li
                  class="list-group-item flex-50"
                  v-for="section in category.sections"
                  :key="section.id"
                  style="border: 0; padding-top: 0; padding-bottom: 0"
                >
                  <label class="custom-checkbox text-capitalize">
                    {{ section.name }}

                    <input
                      type="checkbox"
                      :name="section.name"
                      :value="section.id"
                      class="custom-checkbox__input"
                      @input="onChangeSection($event)"
                    />
                    <span class="custom-checkbox__span"></span>
                  </label>
                </li>
              </ul>
            </li>
          </ul>
        </a-collapse-panel>

        <a-collapse-panel key="3" header="Order By">
          <div style="padding: 10px">
            <b-form-select v-model="sortType">
              <b-form-select-option value="newest"> Newest </b-form-select-option>
              <!-- <b-form-select-option value="price"> Price </b-form-select-option> -->
            </b-form-select>
          </div>
        </a-collapse-panel>
      </a-collapse>
    </div>

    <div class="col-9 d-none d-lg-block d-xl-block">
      <b-row class="mb-3">
        <div class="col-12 d-none d-lg-block d-xl-block">
          <b-card no-body>
            <b-card-header class="d-flex">
              {{ topLabel }} {{ pageProducts.length }} Items</b-card-header
            >
          </b-card>
        </div>
      </b-row>
      <div class="row">
        <div v-for="product in pageProducts" :key="product.id" class="col-md-6 col-lg-4 mb-4">
          <Product :product="product"></Product>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapGetters, mapState } from 'vuex'
import * as Types from '../../store/types'
import Product from './Product'
import './CategoryFilter.css'

// const plainOptions = ['Apple', 'Pear', 'Orange']
// const defaultCheckedList = ['Apple', 'Orange']
export default {
  name: 'ProductList',
  components: { Product },
  data() {
    return {
      flavours: ['Orange', 'Grape', 'Apple', 'Lime', 'Very Berry'],
      selected: [[]],
      allSelected: [false],
      indeterminate: [false],
      // checkedList: defaultCheckedList,
      // indeterminate: true,
      // checkAll: false,
      // plainOptions,
      // gridValue: 3,
      sortType: 'newest',
      searchProducts: [],
      labels: ['Search Result: ', 'Featured Items: '],
      topLabel: 'Featured Items: ',
    }
  },

  mounted() {
    this.searchProducts = this.filterProducts
    this.selected = this.categories.map(() => {
      return []
    })
    this.allSelected = this.categories.map(() => {
      return false
    })
    this.indeterminate = this.categories.map(() => {
      return false
    })
  },

  computed: {
    ...mapState(['currentPage', 'perPage', 'categories', 'categoryFilter', 'sectionFilter']),
    ...mapGetters(['filterProducts']),
    pageProducts() {
      return this.searchProducts.slice(
        (this.currentPage - 1) * this.perPage,
        Math.min(this.currentPage * this.perPage, this.searchProducts.length),
      )
    },
  },

  methods: {
    toggleAll(index) {
      console.log(this.allSelected[index])
      this.selected[index] = this.allSelected[index]
        ? this.categories[index].sections.map((section) => section.name)
        : []
    },
    ...mapMutations({
      addCategoryToFilter: Types.ADD_CATEGORY_TO_FILTER,
      removeCategoryFromFilter: Types.REMOVE_CATEGORY_FROM_FILTER,
      addSectionToFilter: Types.ADD_SECTION_TO_FILTER,
      removeSectionFromFilter: Types.REMOVE_SECTION_FROM_FILTER,
    }),

    onChangeSelectBox(e) {
      const categoryId = e.target.value
      const value = e.target.checked

      if (value) {
        this.addCategoryToFilter(categoryId)
      } else {
        this.removeCategoryFromFilter(categoryId)
      }
      if (this.categoryFilter.length) {
        this.topLabel = this.labels[0]
      } else {
        this.topLabel = this.labels[1]
      }
    },
    onChangeSection(e) {
      const sectionId = e.target.value
      const value = e.target.checked

      if (value) {
        this.addSectionToFilter(sectionId)
      } else {
        this.removeSectionFromFilter(sectionId)
      }
      if (this.sectionFilter.length) {
        this.topLabel = this.labels[0]
      } else {
        this.topLabel = this.labels[1]
      }
    },

    onSearch(e) {
      if (e.target.value) {
        this.topLabel = this.labels[0]
      } else {
        this.topLabel = this.labels[1]
      }
      this.searchProducts = this.filterProducts.filter((product) => {
        return product.name.toLowerCase().includes(e.target.value.toLowerCase())
      })
    },

    changeSection(index) {
      const newValue = this.selected[index]
      console.log(newValue)
      if (newValue.length === 0) {
        this.indeterminate[index] = false
        this.allSelected[index] = false
      } else if (newValue.length === this.categories[index].sections.length) {
        this.indeterminate[index] = false
        this.allSelected[index] = true
      } else {
        this.indeterminate[index] = true
        this.allSelected[index] = false
      }
      console.log(this.indeterminate)
      console.log(this.allSelected)
    },
  },

  watch: {
    filterProducts(filterProducts) {
      this.searchProducts = filterProducts
    },
  },
}
</script>

<style scoped lang="scss">
.custom-checkbox {
  display: block;
  position: relative;
  padding-left: 2rem;
  cursor: pointer;
  user-select: none;
  text-align: left;

  &__input {
    position: absolute;
    opacity: 0;
    height: 0;
    width: 0;
  }

  &__span {
    position: absolute;
    top: 50%;
    left: 0;
    transform: translateY(-50%);
    height: 1.2rem;
    width: 1.2rem;
    background-color: white;
    border: 2px solid gray;

    &::after {
      content: '';
      opacity: 0;
      position: absolute;
      top: 50%;
      left: 50%;
      width: 0.6rem;
      height: 0.6rem;
      background-color: dodgerblue;
      transform: translate(-50%, -50%);
    }
  }

  &:hover &__span {
    background-color: #eeeeee;
  }

  &__input:checked + &__span::after {
    opacity: 1;
  }
}
</style>
