import { Injectable } from '@angular/core';
import { Firestore, collectionData,collection,doc,docData, addDoc, deleteDoc, updateDoc } from '@angular/fire/firestore';
import {HttpClient} from "@angular/common/http";import { Observable } from 'rxjs';
import { PokeDex } from '../interfaces/pokedex';
import Swal from 'sweetalert2/dist/sweetalert2.js';  

export interface Pokemon {
  id?: string;
  nombre: string;
  tipo: string;
  generacion: string;
  latitud?:any;
  longitud?:any;
}

@Injectable({
  providedIn: 'root'
})
export class DataService {
  url : string= "";

  constructor(private firestore: Firestore, private http:HttpClient) { }

  getPokemon(): Observable<Pokemon[]> {
    const notesRef = collection(this.firestore, 'pokemon');
    return collectionData(notesRef, { idField: 'id'}) as Observable<Pokemon[]>;
  }
 
  getPokemonById(id:string): Observable<Pokemon> {
    const noteDocRef = doc(this.firestore, `pokemon/${id}`);
    return docData(noteDocRef, { idField: 'id' }) as Observable<Pokemon>;
  }
 
  addPokemon(poke: Pokemon) {
    const notesRef = collection(this.firestore, 'pokemon');
    this.url="https://pokeapi.co/api/v2/pokemon/"+poke.nombre.toLowerCase()+"";
    this.http.get<PokeDex>(this.url).subscribe({
      next: (res => {    
      return addDoc(notesRef, poke)
    }),
    error:resp=> {
         
    this.openmodal();
  }
})
};
  
 
  deletePokemon(poke: Pokemon) {
    const noteDocRef = doc(this.firestore, `pokemon/${poke.id}`);
    return deleteDoc(noteDocRef);
  }
 
  updatePokemon(poke: Pokemon) {
    const noteDocRef = doc(this.firestore, `pokemon/${poke.id}`);
    return updateDoc(noteDocRef, { tipo: poke.tipo, generacion: poke.generacion });
  }

  updateCoord(poke: Pokemon, latitude:any, longitude:any) {
    const noteDocRef = doc(this.firestore, `pokemon/${poke.id}`);
    return updateDoc(noteDocRef, { latitud: latitude, longitud: longitude });
  }

  getImagePokemon(nombre:string){
    this.url="https://pokeapi.co/api/v2/pokemon/"+nombre.toLowerCase()+"";
    return this.http.get<PokeDex>(this.url)

  }

  openmodal()
  {
    Swal.fire({
      title: '¡Error!',
      text:   "Ese Pokémon no existe",
      icon: 'error'
    });
  }
}
