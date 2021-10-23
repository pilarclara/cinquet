function numAleatorio(min, max){
    return Math.trunc(Math.random() * (max - min + 1));
}

class Carta{
    constructor(palo, valor){
        this._palo = palo;
        this._valor = valor;
    }
    get palo(){ return this._palo}
    get valor(){ return this._valor}
    nombre_Carta(){ return `${this._palo}_${this._valor}`}
}

class Mano_Cartas{
    constructor(cartasElegidas){
        this._cartas= [];
        for (let i=0; i<4; i++){
            this._cartas[i]=[];
            for (let k=0; k<10; k++){
                cartasElegidas.includes(i*4+k)?this._cartas[i][k]= true: this._cartas[i][k]= false;
            } 
        }
        //cartasElegidas.forEach(el => {this._cartas[el/10][el%10] = true }) esto no funciona, inicialmente todo a false y aquí a true pero me daba error, no sé porqué
    }
    get cartas(){ return this._cartas}
}

const nombre_palo = ['oro', 'copa', 'espada', 'basto'];
const valor_carta = ['1','2','3','4','5','6','7','sota', 'caballo','rey'];

const baraja= [];

nombre_palo.forEach((palo, indexPalo) => {
    baraja[indexPalo]=[];
    valor_carta.forEach((valor, indexValor) => {
        baraja[indexPalo][indexValor] = new Carta(palo, valor)
    });
});
console.log(baraja);

let distribucion_cartas = [];
let cant_jugadores = 3;

for(let i= 0; i< cant_jugadores; i++){ distribucion_cartas[i]= []}

cartasARepartir = [];
for (let i = 0; i<40; i++){ cartasARepartir[i]=i}

jugadorInicial = numAleatorio(1, cant_jugadores);

for (let i=0; i<40; i++){
    distribucion_cartas[(i+jugadorInicial)%cant_jugadores].push(cartasARepartir.splice(numAleatorio(0,39-i), 1)[0]);
}
console.log(distribucion_cartas);

let jugadores = [];
for (let i=0; i<cant_jugadores; i++){
    jugadores[i]= new Mano_Cartas(distribucion_cartas[i]);
}
console.log(jugadores);