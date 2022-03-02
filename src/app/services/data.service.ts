import { Injectable } from '@angular/core';
import { Firestore, collectionData,collection,doc,docData, addDoc, deleteDoc, updateDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

export interface Pokemon {
  Nombre: string;
  Tipo: string;
  Generacion: string;
}

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private firestore: Firestore) { }

  getPokemon(): Observable<Pokemon[]> {
    const notesRef = collection(this.firestore, 'Pokemon');
    return collectionData(notesRef, { idField: 'id'}) as Observable<Pokemon[]>;
  }
 
  getPokemonByNombre(nombre:string): Observable<Pokemon> {
    const noteDocRef = doc(this.firestore, `Pokemon/${nombre}`);
    return docData(noteDocRef, { idField: 'nombre' }) as Observable<Pokemon>;
  }
 
  addPokemon(poke: Pokemon) {
    const notesRef = collection(this.firestore, 'Pokemon');
    return addDoc(notesRef, poke);
  }
 
  deletePokemon(poke: Pokemon) {
    const noteDocRef = doc(this.firestore, `Pokemon/${poke.Nombre}`);
    return deleteDoc(noteDocRef);
  }
 
  updatePokemon(poke: Pokemon) {
    const noteDocRef = doc(this.firestore, `Pokemon/${poke.Nombre}`);
    return updateDoc(noteDocRef, { tipò: poke.Tipo, generacion: poke.Generacion });
  }
}
