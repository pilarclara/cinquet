function numAleatorio(min, max){
    return Math.trunc(Math.random() * (max - min + 1));
}

class Mano_Cartas{
    constructor(cartasElegidas){
        this._cartas= cartasElegidas;
    }
    get cartas(){ return this._cartas}
    numero_cartas(){ return this._cartas.length}
    eliminar_carta(carta){ this._cartas.splice(this._cartas.indexOf(carta),1); }
}

class Mano_Cartas_Ordenador extends Mano_Cartas{
}

class Mano_Cartas_Jugador extends Mano_Cartas{
}

class Partida{
    constructor(cant_jugadores,dificultad){
        this._cantidad_jugadores = cant_jugadores;
        let cartas_Repartidas = this.repartirCartas();
        this._jugadores=[];
        this._jugadores.push(new Mano_Cartas_Jugador(cartas_Repartidas[0]));
        for (let i=1; i<cant_jugadores; i++){
            this._jugadores.push(new Mano_Cartas_Ordenador(cartas_Repartidas[i]));
        }
        this._posiblesJugadas = [4];
        this._turno = this.buscar5oro();
        if (this._turno) this.jugado(4);
        console.log(this._posiblesJugadas);
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
        return cartas_Repartidas;
    }    
    buscar5oro(){
        let inicial = 0;
        for (let i = 0; i<3; i++){ this._jugadores[i].cartas.includes(4) }
        this._jugadores.forEach((element, index) => {if (element.cartas.includes(4)) inicial = index});
        return inicial
    }
    jugado(carta){
        this._jugadores[this._turno].eliminar_carta(carta);
        this._posiblesJugadas.splice(this._posiblesJugadas.indexOf(carta));
        if (carta%10>0 && carta%10<5) this._posiblesJugadas.push(carta-1);
        if (carta%10<9 && carta%10>3) this._posiblesJugadas.push(carta+1);
    }
    devolverManoJugador(num_jugador){
        return this._jugadores[num_jugador];
    }
    //cartasJugadas
}

export {Partida, Mano_Cartas}