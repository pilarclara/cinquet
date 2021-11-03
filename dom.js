import {Partida, Mano_Cartas} from "./cinquet.js";

const nombre_palo = ['oro', 'copa', 'espada', 'basto'];
const valor_carta = ['1','2','3','4','5','6','7','10_sota', '11_caballo','12_rey'];

let partida;

const mostrarCarta = carta=>{
    let nueva_carta = document.createElement('img');
    nueva_carta.src = `/public/images/baraja_espanyola/${nombre_palo[Math.trunc(carta/10)]}_${valor_carta[carta%10]}.png`;
    nueva_carta.id = carta;
    nueva_carta.classList.toggle("carta");
    document.querySelector('#cartas_jugador') .appendChild(nueva_carta)
}

const mostrarCartaJugada= (carta)=>{
    let nueva_carta = document.createElement('img');
    nueva_carta.src = `/public/images/baraja_espanyola/${nombre_palo[Math.trunc(carta/10)]}_${valor_carta[carta%10]}.png`;
    nueva_carta.id = carta;
    colocarCartaJugada(nueva_carta);
}

const colocarCartaJugada = e => {
    if (e.id <=9) document.querySelector("#zona_oro").appendChild(e);
    if (e.id >=10 && e.id <=19) document.querySelector("#zona_copa").appendChild(e);
    if (e.id >=20 && e.id <=29) document.querySelector("#zona_espada").appendChild(e);
    if (e.id >=30 && e.id <=39) document.querySelector("#zona_basto").appendChild(e);
}


const mostrarCartasJugador= ()=>{
    let mano = partida.devolverManoJugador(0);
    console.log(mano);
    for (let i= 0; i<mano.cartas.length; i++) mostrarCarta(mano.cartas[i]);
}

const iniciar_juego= ()=>{
    partida = new Partida(3,2);
    let jugadaActual;
    while (!partida.hayGanador()){
        jugadaActual = partida.movimientos();
        if (jugadaActual!=-1) mostrarCartaJugada(jugadaActual);
    }
    mostrarCartasJugador();
    document.querySelectorAll(".carta").forEach(c =>c.addEventListener('click', mover_Carta));
}

const mover_Carta = e =>{
    console.log(e.target.id);
    document.querySelector("#cartas_jugador").removeChild(e.target);
    e.target.removeEventListener('click', mover_Carta);
    colocarCartaJugada(e.target.id);
}

document.addEventListener('keyup', iniciar_juego);