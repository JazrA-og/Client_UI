import { Component, OnInit, ViewChild } from '@angular/core'
import { MapInfoWindow, MapMarker, GoogleMap } from '@angular/google-maps'

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

  @ViewChild(GoogleMap, { static: false })
  map!: GoogleMap
  @ViewChild(MapInfoWindow, { static: false })
  info!: MapInfoWindow

  zoom = 12
  center!: google.maps.LatLngLiteral
  options: google.maps.MapOptions = {
    zoomControl: false,
    scrollwheel: false,
    disableDoubleClickZoom: true,
    mapTypeId: 'hybrid',
    maxZoom: 15,
    minZoom: 8,
  }
  markers: any[] = [];
  // marker = {
  //   position: {
  //     lat: this.center.lat,
  //     lng: this.center.lng,
  //   },
  //   label: {
  //     color: 'red',
  //     text: 'Marker label ' + (this.markers.length + 1),
  //   },
  //   title: 'Marker title ' + (this.markers.length + 1),
  //   info: 'Marker info ' + (this.markers.length + 1),
  //   options: {
  //     animation: google.maps.Animation.BOUNCE,
  //   }
  // };
  infoContent = ''

  ngOnInit() {
    navigator.geolocation.getCurrentPosition((position) => {
      this.center = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      }
    })
  }

  zoomIn() {
    // if (this.zoom < this.options.maxZoom)
    this.zoom++
  }

  zoomOut() {
    // if (this.zoom > this.options.minZoom)
    this.zoom--
  }

  click(event: any) {
    console.log(event)
  }

  logCenter() {
    console.log(JSON.stringify(this.map.getCenter()))
  }

  // addMarkers() {
  //   // this.marker.position.lat
  //   // this.marker.position.lng
  // }
  addMarker() {
    this.markers.push({
      position: {
        // lat: this.map.centerChanged,
        // lng: this.map.centerChanged,
        // lat: this.center.lat,
        // lng: this.center.lng,
        lat: this.center.lat + ((Math.random() - 0.5) * 2) / 10,
        lng: this.center.lng + ((Math.random() - 0.5) * 2) / 10,
      },
      label: {
        color: 'red',
        text: 'Marker label ' + (this.markers.length + 1),
      },
      title: 'Marker title ' + (this.markers.length + 1),
      info: 'Marker info ' + (this.markers.length + 1),
      options: {
        animation: google.maps.Animation.BOUNCE,
      },
    })
  }

  openInfo(marker: MapMarker, content: string) {
    this.infoContent = content
    this.info.open(marker)


  }
}
