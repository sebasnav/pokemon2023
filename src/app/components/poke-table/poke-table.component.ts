import { Component, OnInit } from '@angular/core';
import { PokemonService } from 'src/app/services/pokemon.service';

@Component({
  selector: 'app-poke-table',
  templateUrl: './poke-table.component.html',
  styleUrls: ['./poke-table.component.scss'],
})
export class PokeTableComponent implements OnInit {
  constructor(private pokeService: PokemonService) {}

  pokemonList: any[] = [];
  pokemonListFiltered: any[] = [];
  searchPokemonByName: any;
  page: any;
  pokemonSelected = false;
  lastPokemon: any;
  alphabet = [
    'A',
    'B',
    'C',
    'D',
    'E',
    'F',
    'H',
    'H',
    'I',
    'J',
    'K',
    'L',
    'M',
    'N',
    'Ñ',
    'O',
    'P',
    'Q',
    'R',
    'S',
    'T',
    'U',
    'V',
    'W',
    'X',
    'Y',
    'Z',
  ];
  pokemonQuantity: any = null;

  ngOnInit(): void {
    this.getPokemons();
  }

  getPokemons() {
    this.pokemonList = [];

    for (let i = 1; i <= 150; i++) {
      this.pokeService.getPokemon(i).subscribe(
        (res) => {
          this.pokemonList.push(res);
        },
        (err) => {
          console.log(err);
        }
      );
    }
  }

  getPokemonsFiltered(pokemonList: any[]) {
    if (this.searchPokemonByName) {
      this.pokemonListFiltered = pokemonList.filter((element) =>
        element.name
          .toLowerCase()
          .includes(this.searchPokemonByName.toLowerCase())
      );
    } else {
      this.pokemonListFiltered = pokemonList;
    }
    return this.pokemonListFiltered;
  }

  removeFilterPokemonByName() {
    this.searchPokemonByName = null;
  }

  openPokemonDetails(pokemon: any) {
    if (this.pokemonSelected && pokemon == this.lastPokemon) {
      this.pokemonSelected = false;
    } else {
      this.pokemonSelected = true;
    }
    this.lastPokemon = pokemon;
    this.pokeService.savePokemonData(pokemon);
  }

  numberOfPokemons(letter: string) {
    this.pokemonQuantity = 0;

    this.pokemonListFiltered.forEach((element) => {
      if (
        element.name.toLocaleLowerCase().startsWith(letter.toLocaleLowerCase())
      ) {
        this.pokemonQuantity++;
      }
    });
  }
}
