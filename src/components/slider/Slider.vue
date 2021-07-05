<template>
  <div>
    <b-carousel
      id="carousel-1"
      v-model="slide"
      :interval="4000"
      controls
      indicators
      background="#ababab"
      img-width="1024"
      img-height="480"
      :fade="true"
      :no-animation="false"
      style="text-shadow: 1px 1px 2px #333"
      @sliding-start="onSlideStart"
      @sliding-end="onSlideEnd"
    >
      <!-- Text slides with image -->
      <b-carousel-slide img-src="https://www.orklahousecare.com/app/uploads/2020/03/anza.jpeg">
      </b-carousel-slide>

      <!-- Slides with custom text -->
      <b-carousel-slide
        img-src="https://www.securens.in/wp-content/uploads/2020/02/Inventory_Theft_Main_Banner.jpg"
      >
      </b-carousel-slide>

      <b-carousel-slide
        img-src="https://www.rhenus.com/fileadmin/user_upload/rhenus_au/Services/Services_Warehouse_Header.jpg"
      >
      </b-carousel-slide>

      <b-carousel-slide>
        <template #img>
          <img
            class="d-block img-fluid w-100"
            width="1024"
            height="480"
            src="https://www.wealthmanagement.com/sites/wealthmanagement.com/files/warehouse-GettyImages-840241576-1540_0.jpg"
            alt="image slot"
          />
        </template>
      </b-carousel-slide>
    </b-carousel>
    <br />
  </div>
</template>

<script>
export default {
  name: 'Slider',
  data() {
    return {
      slide: 0,
      sliding: null,
    }
  },
  methods: {
    onSlideStart() {
      this.sliding = true
    },
    onSlideEnd() {
      this.sliding = false
    },
  },
}
</script>
<style scoped>
/* .carousel-item { */
  /* height: 600px; */
/* } */
</style>