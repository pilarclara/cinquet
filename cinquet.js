const numAleatorio = (min, max) =>{
    return Math.trunc(Math.random() * (max - min + 1));
}

class Mano_Cartas{
    constructor(cartasElegidas){
        this._cartas= cartasElegidas;
    }
    get cartas(){ return this._cartas}
    numero_cartas(){ return this._cartas.length}
    eliminar_carta(carta){ 
        this._cartas.splice(this._cartas.indexOf(carta) ,1);
        return (this._cartas.length);
    }
}

class Mano_Cartas_Ordenador extends Mano_Cartas{
    constructor(cartasElegidas){
        super(cartasElegidas);
    }
    jugar(posicionesDisponibles){
        console.log('Posiciiones disponibles ',posicionesDisponibles);
        let coincidencia=[];
        posicionesDisponibles.forEach(e =>{
            if (this._cartas.includes(e)) coincidencia.push(e);
        });
        let cartaAJugar;
        coincidencia.length? cartaAJugar = coincidencia[numAleatorio(0, coincidencia.length-1)]: cartaAJugar= -1;
        return cartaAJugar;
    }
}

class Mano_Cartas_Persona extends Mano_Cartas{
    jugar(posicionesDisponibles){
        let carta = posicionesDisponibles.pop();
        if (posicionesDisponibles.indexOf(carta)==-1) carta =-1;
        return carta; 
    }
}

class Partida{
    constructor(cant_jugadores,dificultad){
        this._cantidad_jugadores = cant_jugadores;
        let cartas_Repartidas = this.repartirCartas();
        this._jugadores=[];
        this._jugadores.push(new Mano_Cartas_Persona(cartas_Repartidas[0]));
        for (let i=1; i<cant_jugadores; i++){
            this._jugadores.push(new Mano_Cartas_Ordenador(cartas_Repartidas[i]));
        }
        this._posiblesJugadas = [4];
        this._turno = 0;
        console.log("Reparto inicial de cartas", this._jugadores);
        this._ganador = -1;
    }
    pasarTurno(){
        this._turno = (this.turno +1)% this._cantidad_jugadores;
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
    cartaJugada(carta){
        let cantCartas = this._jugadores[this._turno].eliminar_carta(carta);
        if (!cantCartas) return true;
        this._posiblesJugadas.splice(this._posiblesJugadas.indexOf(carta),1);
        if (carta == 4){
            for (let i=1; i<4;i++) this._posiblesJugadas.push(i*10+4);
        }
        if (carta%10 == 4){
            this._posiblesJugadas.push(carta-1);
            this._posiblesJugadas.push(carta+1);
        }
        if (carta%10>0 && carta%10<4) this._posiblesJugadas.push(carta-1);
        if (carta%10<9 && carta%10>4) this._posiblesJugadas.push(carta+1);
        this._posiblesJugadas.sort((a,b)=>a-b);
        return false
    }
    devolverManoJugador(num_jugador){
        return this._jugadores[num_jugador];
    }
    hayGanador(){
        return !this._jugadores[this._turno].numero_cartas();
    }
    movimientoCPU(){
        let jugadaActual;
        jugadaActual = this._jugadores[this._turno].jugar(this._posiblesJugadas);
        if (jugadaActual!=-1) 
            if (this.cartaJugada(jugadaActual)) this._ganador = this._turno;
        this.pasarTurno();
        return jugadaActual;
    }

    movimientoJugador(carta){
        let jugadaActual;
        this._posiblesJugadas.push(carta);
        jugadaActual = this._jugadores[this._turno].jugar(this._posiblesJugadas);
        if (jugadaActual!=-1) {
            if (this.cartaJugada(jugadaActual)) this._ganador = this._turno;
            this.pasarTurno();
        }
        return jugadaActual;
    }
    get turno(){ return this._turno;}
    get ganador(){ return this._ganador;}
}

export {Partida, Mano_Cartas}