<template>
  <div :id="mapName" class="google-map"/>
</template>
<script>
import { mapState } from 'vuex'

export default {
  name: 'GoogleMap',
  props: {
    name: {
      type: String,
      default: 'Honda of Downtown Chicago'
    },
    zoom: {
      type: Number,
      default: 16
    },
    center: {
      type: Object,
      default() {
        return {
          latitude: 41.9022635,
          longitude: -87.6330796
        }
      }
    }
  },

  data: function() {
    return {
      // mapName: this.dealer.dealerName + '-map',
      //   markerCoordinates: [{
      //     latitude: 41.8919274,
      //     longitude: -87.6258769
      //   }],
      map: null
    //   bounds: null,
    //   markers: []
    }
  },
  computed: {
    ...mapState('telleChat', ['dealer']),
    mapName() {
      return this.dealer.dealerName + '-map'
    }
  },
  mounted: function() {
    // eslint-disable-next-line no-undef
    this.bounds = new google.maps.LatLngBounds()
    const element = document.getElementById(this.mapName)
    const options = {
      // eslint-disable-next-line no-undef
      center: new google.maps.LatLng(this.dealer.latitude, this.dealer.longitude),
      zoom: this.zoom
    }
    // eslint-disable-next-line no-undef
    this.map = new google.maps.Map(element, options)
    // eslint-disable-next-line no-undef
    const position = new google.maps.LatLng(this.dealer.latitude, this.dealer.longitude)
    // eslint-disable-next-line no-undef
    const marker = new google.maps.Marker({
      position,
      map: this.map,
      title: this.name
    })
    marker.setMap(this.map)
  }
}
</script>
<style scoped>
.google-map {
  width: 100%;
  height: 400px;
  margin: 0 auto;
  background: gray;
}
</style>
