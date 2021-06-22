<template>
  <div>
    <a-collapse accordion>
      <a-collapse-panel key="1" header="Categories">
        <!-- <div>
          <div :style="{ borderBottom: '1px solid #E9E9E9' }">
            <a-checkbox
              :indeterminate="indeterminate"
              :checked="checkAll"
              @change="onCheckAllChange"
            >
              Check all
            </a-checkbox>
          </div>
          <br />
          <a-checkbox-group v-model="checkedList" :options="plainOptions" @change="onChange" />
        </div> -->

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
      <a-collapse-panel key="2" header="Search" :disabled="false"> </a-collapse-panel>
      <a-collapse-panel key="3" header="Order By"> </a-collapse-panel>
    </a-collapse>
  </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex'
import * as Types from '../../store/types'
import './CategoryFilter.css'
const plainOptions = ['Apple', 'Pear', 'Orange']
const defaultCheckedList = ['Apple', 'Orange']

export default {
  name: 'CategoryFilter',
  data() {
    return {
      brandsCount: this.$store.getters.brandsCount,
      checkedList: defaultCheckedList,
      indeterminate: true,
      checkAll: false,
      plainOptions,
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
    onChange(checkedList) {
      this.indeterminate = !!checkedList.length && checkedList.length < plainOptions.length
      this.checkAll = checkedList.length === plainOptions.length
    },
    onCheckAllChange(e) {
      Object.assign(this, {
        checkedList: e.target.checked ? plainOptions : [],
        indeterminate: false,
        checkAll: e.target.checked,
      })
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
