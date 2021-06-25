import Vue from 'vue'
import * as VueGoogleMaps from 'vue2-google-maps'
import VueGoogleAutocomplete from 'vue-google-autocomplete'

Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyASyYRBZmULmrmw_P9kgr7_266OhFNinPA',
    libraries: 'places', // This is required if you use the Autocomplete plugin
  },
})

Vue.use(VueGoogleAutocomplete)
