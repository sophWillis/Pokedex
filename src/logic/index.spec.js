import { expect } from "@jest/globals";
import logic from ".";

describe("logic", () => {
    describe("getPokemonByName", () => {
        it("Should retrieve pokémon by name", done => {
            logic.getPokemonByName("pikachu").then(res => {

                expect(res).toBeDefined();
                expect(res.id).toBeDefined();
                expect(res.name).toBeDefined();
                expect(res.sprites.other["official-artwork"]).toBeDefined();

                done();
            });
        });
        it("Should fail when pokémon is undefined", done => {
            logic.getPokemonByName("nonexistingpokemon").then(() => {
                throw Error("Should not reach this point");
            }).catch(res => {
                expect(res.message).toEqual("Error: Not found");

                done();
            });
        });
    });
});
