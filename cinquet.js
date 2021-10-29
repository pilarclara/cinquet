/*
class Carta{
    constructor(palo, valor){
        this._palo = palo;
        this._valor = valor;
    }
    get palo(){ return this._palo}
    get valor(){ return this._valor}
    nombre_Carta(){ return `${this._palo}_${this._valor}`}
}
*/
function numAleatorio(min, max){
    return Math.trunc(Math.random() * (max - min + 1));
}

class Mano_Cartas{
    constructor(cartasElegidas){
        this._cartas= cartasElegidas;
        //cartasElegidas.forEach(c =>{ this._cartas.push(new Carta(nombre_palo[Math.trunc(c/10)],valor_carta[c%10]))})
    }
    get cartas(){ return this._cartas}
}
class Partida{
    constructor(cant_jugadores,dificultad){
        this._jugadores = [];
        for (let i=0; i<cant_jugadores; i++){
            this._jugadores[i]= new Mano_Cartas(this.repartirCartas(cant_jugadores)[i]);
        }
        console.log(this._jugadores);
//        console.log(buscar5oro());
    }
    repartirCartas(cant_jugadores){
        let cartas_Repartidas = [];
        for(let i= 0; i< cant_jugadores; i++){ cartas_Repartidas[i]= []}
        let cartasARepartir = [];
        for (let i = 0; i<40; i++){ cartasARepartir[i]=i}
        const primeroARepartir = numAleatorio(1, cant_jugadores);
        for (let i=0; i<40; i++){
            cartas_Repartidas[(i+primeroARepartir)%cant_jugadores].push(cartasARepartir.splice(numAleatorio(0,39-i), 1)[0]);
        }
        cartas_Repartidas.forEach(e=>e.sort((a,b)=>a-b));
        console.log(cartas_Repartidas);
        return cartas_Repartidas;
    }    
    buscar5oro(){
        let jugadorInicial;
        this._jugadores.forEach((element, index) => {if (element.cartas[0][4]) jugadorInicial= index; }); // si pongo aquí el return devuelve undefined
        return jugadorInicial;
    }
    devolverManoJugador(num_jugador){
        return this._jugadores[num_jugador];
    }
}

export {Partida, Mano_Cartas}