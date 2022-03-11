import { Component, Input, OnInit } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import { PokeDex } from '../interfaces/pokedex';
import { DataService, Pokemon } from '../services/data.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.page.html',
  styleUrls: ['./map.page.scss'],
})
export class MapPage implements OnInit {

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

  constructor(private dataService:DataService) { }

  ngOnInit() {
    this.dataService.getPokemonById(this.id).subscribe(res => {
      this.poke = res;
      this.dataService.getImagePokemon(this.poke.nombre).subscribe
    (res=>{
      this.dex=res
    })
    });
  }

  verMapa() {
    this.mapa2 = new mapboxgl.Map({
      container: 'mapa2',
      style: this.style,
      zoom: this.zoom,
      center: [this.poke.longitud, this.poke.latitud]
    });
    this.mapa2.addControl(new mapboxgl.NavigationControl());
    }

}
