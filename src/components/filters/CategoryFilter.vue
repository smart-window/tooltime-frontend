<template>
  <div>
    <a-collapse accordion>
      <a-collapse-panel key="1" header="Categories">
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
      </a-collapse-panel>
      <a-collapse-panel key="2" header="Search" :disabled="false"> </a-collapse-panel>
      <a-collapse-panel key="3" header="Order By"> </a-collapse-panel>
    </a-collapse>
  </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex'
import * as Types from '../../store/types'

export default {
  name: 'CategoryFilter',
  data() {
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
      addSectionToFilter: Types.ADD_SECTION_TO_FILTER,
      removeSectionFromFilter: Types.REMOVE_SECTION_FROM_FILTER,
    }),

    onChangeSelectBox(e) {
      // console.log(this.categories)
      const categoryId = e.target.value
      const value = e.target.checked

      if (value) {
        this.addCategoryToFilter(categoryId)
      } else {
        this.removeCategoryFromFilter(categoryId)
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
    },
  },
}
</script>

<style scoped lang="scss">
.ant-collapse {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  color: rgba(0, 0, 0, 0.65);
  font-size: 14px;
  font-variant: tabular-nums;
  line-height: 1.5;
  list-style: none;
  font-feature-settings: 'tnum';
  background-color: #fafafa;
  border: 1px solid #d9d9d9;
  border-bottom: 0;
  border-radius: 4px;
  .ant-collapse-item {
    border-bottom: 1px solid #d9d9d9;
    .ant-collapse-header {
      padding: 12px 16px 12px 40px !important;
      color: rgba(0, 0, 0, 0.85);
      line-height: 22px;
      cursor: pointer;
      transition: all 0.3s;
    }
  }
}
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
