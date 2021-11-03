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
    constructor(cartasElegidas){
        super(cartasElegidas);
    }
    jugar(posicionesDisponibles){
        let coincidencia=[];
        posicionesDisponibles.forEach(e =>{
            if (this._cartas.includes(e)) coincidencia.push(e);
        });
        let cartaAJugar;
        coincidencia.length? cartaAJugar = coincidencia[numAleatorio(0, coincidencia.length-1)]: cartaAJugar= -1;
        return cartaAJugar;
    }
    noQuedanCartas(){
        return this._cartas.length == 0;
    }
}

class Mano_Cartas_Jugador extends Mano_Cartas{
}

class Partida{
    constructor(cant_jugadores,dificultad){
        this._cantidad_jugadores = cant_jugadores;
        let cartas_Repartidas = this.repartirCartas();
        this._jugadores=[];
        //this._jugadores.push(new Mano_Cartas_Jugador(cartas_Repartidas[0]));
    //    for (let i=1; i<cant_jugadores; i++){  todos ordenadores para comprobar elección de cartas
        for (let i=0; i<cant_jugadores; i++){
            this._jugadores.push(new Mano_Cartas_Ordenador(cartas_Repartidas[i]));
        }
        this._posiblesJugadas = [];
        for (let i=0; i<4;i++) this._posiblesJugadas.push(i*10+4);
        this._turno = this.buscar5oro(); console.log(`el 5 de oro lo tenia ${this._turno}`)
        //if (this._turno) this.cartaJugada(4);
        this.cartaJugada(4);
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
        this._jugadores.forEach((element, index) => {if (element.cartas.includes(4)) inicial = index});
        return inicial;
    }
    cartaJugada(carta){
        this._jugadores[this._turno].eliminar_carta(carta);
        this._posiblesJugadas.splice(this._posiblesJugadas.indexOf(carta),1);
        if (carta%10>0 && carta%10<5) this._posiblesJugadas.push(carta-1);
        if (carta%10<9 && carta%10>3) this._posiblesJugadas.push(carta+1);
        this._posiblesJugadas.sort((a,b)=>a-b);
    }
    devolverManoJugador(num_jugador){
        return this._jugadores[num_jugador];
    }
    hayGanador(){
        return this._jugadores[this._turno].noQuedanCartas();
    }
    movimientos(){
        let jugadaActual;
        this._turno = (this._turno+1)%this._cantidad_jugadores;
        jugadaActual = this._jugadores[this._turno].jugar(this._posiblesJugadas);
        if (jugadaActual!=-1) this.cartaJugada(jugadaActual);
        return jugadaActual;
    }
    get turno(){return this._turno;}
    //cartasJugadas
}

export {Partida, Mano_Cartas}