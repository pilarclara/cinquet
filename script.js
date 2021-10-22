function numAleatorio(min, max){
    return Math.trunc(Math.random() * (max - min + 1) + 1);
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

const nombre_palo = ['oro', 'copa', 'espada', 'basto'];
const valor_carta = ['1','2','3','4','5','6','7','sota', 'caballo','rey'];

const baraja= [];

nombre_palo.forEach((palo, indexPalo) => {
    valor_carta.forEach((valor, indexValor) => {
        baraja[indexPalo*10+indexValor] = new Carta(palo, valor)
    });
});

baraja.forEach(e => console.log(e.nombre_Carta()));

jugadores = [];
cant_jugadores = 3;

for(let i= 0; i< cant_jugadores; i++){ jugadores[i]= []}

cartasARepartir = [];
for (let i = 0; i<40; i++){ cartasARepartir[i]=i}

jugadorInicial = numAleatorio(1, cant_jugadores);

for (let i=0; i<40; i++){
    jugadores[(i+jugadorInicial)%cant_jugadores].push(cartasARepartir.splice(numAleatorio(1,40-i)-1, 1));
}
console.log(jugadores);
console.log(cartasARepartir);