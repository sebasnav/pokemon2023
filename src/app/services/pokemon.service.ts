import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  url: string = environment.url;
  pokemonData: any;

  constructor(private http: HttpClient) {}

  getPokemon(index: number) {
    return this.http.get<any>(`${this.url}/pokemon/${index}`);
  }

  savePokemonData(pokemon: any) {
    this.pokemonData = pokemon;
  }
}
