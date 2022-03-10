import { Component, OnInit, Input} from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { PokeDex } from '../interfaces/pokedex';
import { DataService, Pokemon } from '../services/data.service';
import { Geolocation } from '@awesome-cordova-plugins/geolocation/ngx';
import * as mapboxgl from 'mapbox-gl';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.page.html',
  styleUrls: ['./modal.page.scss'],
})
export class ModalPage implements OnInit {

  @Input() id: string;
  poke: Pokemon = null;
  dex!: PokeDex;

  latitude: any = 0; 
  longitude: any = 0;
  zoom: any = 15;

  mapbox = (mapboxgl as typeof mapboxgl);
  map: mapboxgl.Map;
  mapa2: mapboxgl.Map;
  style = `mapbox://styles/mapbox/streets-v11`;



  constructor(private dataService: DataService, private modalCtrl: ModalController, private toastCtrl: ToastController,
    private geo:Geolocation) {
      this.mapbox.accessToken = environment.mapBoxToken;

     }

  ngOnInit() {
    this.dataService.getPokemonById(this.id).subscribe(res => {
      this.poke = res;
      this.dataService.getImagePokemon(this.poke.nombre).subscribe
    (res=>{
      this.dex=res
    })
    });


  }

  async deletePoke() {
    await this.dataService.deletePokemon(this.poke)
    this.modalCtrl.dismiss();
  }
 
  async updatePoke() {
    await this.dataService.updatePokemon(this.poke);
    const toast = await this.toastCtrl.create({
      message: 'Pokemon actualizado!.',
      duration: 2000
    });
    toast.present();
 
  }

  async updateCoord() {
    await this.dataService.updateCoord(this.poke, this.latitude, this.longitude);
    const toast = await this.toastCtrl.create({
      message: 'Coordenadas guardadas!.',
      duration: 2000
    });
    toast.present();
 
  }

  getCurrentCoordinates() {
    this.geo.getCurrentPosition().then((resp) => {
      this.latitude = resp.coords.latitude;
      this.longitude = resp.coords.longitude;
      this.buildMap(); 
     }).catch((error) => {
       console.log('Error getting location', error);
     });
  }

  buildMap() {
    this.map = new mapboxgl.Map({
      container: 'map',
      style: this.style,
      zoom: this.zoom,
      center: [this.longitude, this.latitude]
    });
    this.map.addControl(new mapboxgl.NavigationControl());
    }


  verMapa() {
    this.mapa2 = new mapboxgl.Map({
      container: 'map',
      style: this.style,
      zoom: this.zoom,
      center: [this.poke.longitud, this.poke.latitud]
    });
    this.mapa2.addControl(new mapboxgl.NavigationControl());
    }

   
    }

