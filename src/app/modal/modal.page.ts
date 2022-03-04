import { Component, OnInit, Input} from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { PokeDex } from '../interfaces/pokedex';
import { DataService, Pokemon } from '../services/data.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.page.html',
  styleUrls: ['./modal.page.scss'],
})
export class ModalPage implements OnInit {

  @Input() id: string;
  poke: Pokemon = null;
  dex!: PokeDex;

  constructor(private dataService: DataService, private modalCtrl: ModalController, private toastCtrl: ToastController) { }

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

}
