import { ChangeDetectorRef, Component } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { ModalPage } from '../modal/modal.page';
import { DataService, Pokemon } from '../services/data.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  pokes: Pokemon[] = [];

  constructor(private dataService: DataService,  private cd: ChangeDetectorRef, 
    private alertCtrl: AlertController, private modalCtrl: ModalController) {
      this.dataService.getPokemon().subscribe(res => {
        this.pokes = res;
        this.cd.detectChanges();
      });
    }
    
    async addPoke() {
      const alert = await this.alertCtrl.create({
        header: 'Incluir Pokemon',
        inputs: [
          {
            name: 'nombre',
            placeholder: 'Nombre',
            type: 'text'
          },
          {
            name: 'tipo',
            placeholder: 'Tipo',
            type: 'text'
          },
          {
            name: 'generacion',
            placeholder: 'Generacion',
            type: 'text'
          }
        ],
        buttons: [
          {
            text: 'Cancelar',
            role: 'cancel'
          }, {
            text: 'Incluir',
            handler: res => {
              this.dataService.addPokemon({ nombre: res.nombre, tipo: res.tipo, generacion: res.generacion });
            }
          }
        ]
      });
  
      await alert.present();
    }
   
    async openPoke(poke: Pokemon) {
      const modal = await this.modalCtrl.create({
        component: ModalPage,
        componentProps: { id:poke.id},
        breakpoints: [0, 0.5, 0.8],
        initialBreakpoint: 0.8
      });
   
      await modal.present();
    }

}
