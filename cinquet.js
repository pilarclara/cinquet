function numAleatorio(min, max){
    return Math.trunc(Math.random() * (max - min + 1));
}

class Mano_Cartas{
    constructor(cartasElegidas){
        this._cartas= cartasElegidas;
    }
    get cartas(){ return this._cartas}
    numero_cartas(){ return this._cartas.length}
}
class Partida{
    constructor(cant_jugadores,dificultad){
        this._cantidad_jugadores = cant_jugadores;
        this._jugadores = [];
        for (let i=0; i<cant_jugadores; i++){
            this._jugadores[i]= new Mano_Cartas(this.repartirCartas()[i]);
        }
        console.log(this._jugadores);
        this._turno = this.buscar5oro();

        // _turno +=1%cantidad_jugadores
    }
    repartirCartas(){
        let cartas_Repartidas = [];
        for(let i= 0; i< this._cantidad_jugadores; i++){ cartas_Repartidas[i]= []}
        let cartasARepartir = [];
        for (let i = 0; i<40; i++){ cartasARepartir[i]=i}
        const primeroARepartir = numAleatorio(1, this._cantidad_jugadores);
        for (let i=0; i<40; i++){
            cartas_Repartidas[(i+primeroARepartir)%this._cantidad_jugadores].push(cartasARepartir.splice(numAleatorio(0,39-i), 1)[0]);
        }
        cartas_Repartidas.forEach(e=>e.sort((a,b)=>a-b));
        console.log(cartas_Repartidas);
        return cartas_Repartidas;
    }    
    buscar5oro(){
        let inicial = 0;
        for (let i = 0; i<3; i++){ this._jugadores[i].cartas.includes(4) }
        this._jugadores.forEach((element, index) => {if (element.cartas.includes(4)) inicial = index});
        return inicial
    }

    devolverManoJugador(num_jugador){
        return this._jugadores[num_jugador];
    }
}

export {Partida, Mano_Cartas}