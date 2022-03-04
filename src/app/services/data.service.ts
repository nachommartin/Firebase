import { Injectable } from '@angular/core';
import { Firestore, collectionData,collection,doc,docData, addDoc, deleteDoc, updateDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

export interface Pokemon {
  id?: string;
  nombre: string;
  tipo: string;
  generacion: string;
}

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private firestore: Firestore) { }

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
    return addDoc(notesRef, poke);
  }
 
  deletePokemon(poke: Pokemon) {
    const noteDocRef = doc(this.firestore, `pokemon/${poke.id}`);
    return deleteDoc(noteDocRef);
  }
 
  updatePokemon(poke: Pokemon) {
    const noteDocRef = doc(this.firestore, `pokemon/${poke.id}`);
    return updateDoc(noteDocRef, { tipo: poke.tipo, generacion: poke.generacion });
  }
}
