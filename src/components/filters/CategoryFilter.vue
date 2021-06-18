<template>
  <b-card no-body class="mb-3">
    <b-card-header>
      <h3 class="text-primary">Categories</h3>
    </b-card-header>
    <b-card-body>
      <ul class="list-group flex-row flex-wrap">
        <li class="list-group-item flex-50" v-for="category in categories" :key="category.id">
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
    </b-card-body>
  </b-card>
</template>

<script>
import { mapMutations, mapState } from 'vuex'
import * as Types from '../../store/types'
export default {
  name: 'CategoryFilter',
  data() {
    window.console.log(this.$store.getters.brandsCount, this.$store.brands)
    return {
      brandsCount: this.$store.getters.brandsCount,
    }
  },
  computed: {
    ...mapState(['categories']),
  },
  methods: {
    ...mapMutations({
      addCategoryToFilter: Types.ADD_CATEGORY_TO_FILTER,
      removeCategoryFromFilter: Types.REMOVE_CATEGORY_FROM_FILTER,
    }),

    onChangeSelectBox(e) {
      const categoryId = e.target.value
      const value = e.target.checked
      console.log('categoryId => ', categoryId)

      if (value) {
        this.addCategoryToFilter(categoryId)
      } else {
        this.removeCategoryFromFilter(categoryId)
      }
    },
    onChangeSection(sectionId) {
      console.log(sectionId)
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

.flex-50 {
  flex: 0 0 100%;
}

@media only screen and (max-width: 768px) {
  .flex-50 {
    flex: 0 0 50%;
  }
}
</style>
