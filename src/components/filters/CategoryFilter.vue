<template>
  <b-card no-body class="mb-3">
    <b-card-header>
      <h3 class="text-primary">Categories</h3>
    </b-card-header>
    <b-card-body>
      <!-- <b-menu
        style="width: 256px"
        :default-selected-keys="['1']"
        mode="inline"
      > -->
        <!-- <b-sub-menu key="sub1">
          <span slot="title"><b-icon type="mail" /><span>Navigation One</span></span>
          <b-menu-item-group key="g1">
            <template slot="title"> <b-icon type="qq" /><span>Item 1</span> </template>
            <b-menu-item key="1"> Option 1 </b-menu-item>
            <b-menu-item key="2"> Option 2 </b-menu-item>
          </b-menu-item-group>
          <b-menu-item-group key="g2" title="Item 2">
            <b-menu-item key="3"> Option 3 </b-menu-item>
            <b-menu-item key="4"> Option 4 </b-menu-item>
          </b-menu-item-group>
        </b-sub-menu>
        <b-sub-menu key="sub2">
          <span slot="title"><b-icon type="appstore" /><span>Navigation Two</span></span>
          <b-menu-item key="5"> Option 5 </b-menu-item>
          <b-menu-item key="6"> Option 6 </b-menu-item>
          <b-sub-menu key="sub3" title="Submenu">
            <b-menu-item key="7"> Option 7 </b-menu-item>
            <b-menu-item key="8"> Option 8 </b-menu-item>
          </b-sub-menu>
        </b-sub-menu>
        <b-sub-menu key="sub4">
          <span slot="title"><b-icon type="setting" /><span>Navigation Three</span></span>
          <b-menu-item key="9"> Option 9 </b-menu-item>
          <b-menu-item key="10"> Option 10 </b-menu-item>
          <b-menu-item key="11"> Option 11 </b-menu-item>
          <b-menu-item key="12"> Option 12 </b-menu-item>
        </b-sub-menu>
      </b-menu> -->

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
