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
      <b-carousel-slide
        caption="Our Company"
        text="Provide Best Service."
        img-src="https://base.imgix.net/files/base/ebm/machinedesign/image/2021/02/MD_ResourceCenterHeader_630x354.6019d3f1708a1.png?auto=format&fit=crop&h=354&w=630"
      ></b-carousel-slide>

      <!-- Slides with custom text -->
      <b-carousel-slide
        img-src="https://media.istockphoto.com/photos/production-line-of-plastic-industry-picture-id510162486?k=6&m=510162486&s=612x612&w=0&h=BcECtLxFTWjm_dSZ9GCy5KftmXAuddew1Ium-pCOeYk="
      >
        <h1>Hello world!</h1>
      </b-carousel-slide>

      <!-- Slides with image only -->
      <b-carousel-slide
        img-src="https://techcrunch.com/wp-content/uploads/2018/10/GettyImages-818593144.jpg?w=730&crop=1"
      >
      </b-carousel-slide>

      <!-- Slides with img slot -->
      <!-- Note the classes .d-block and .img-fluid to prevent browser default image alignment -->
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

      <!-- Slide with blank fluid image to maintain slide aspect ratio -->
      <!-- <b-carousel-slide caption="Blank Image" img-blank img-alt="Blank image">
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse eros felis, tincidunt
          a tincidunt eget, convallis vel est. Ut pellentesque ut lacus vel interdum.
        </p>
      </b-carousel-slide> -->
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