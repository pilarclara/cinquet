import {Partida, Mano_Cartas} from "./cinquet.js";

let partida;

function mostrarCarta(carta){
    let nueva_carta = document.createElement('img');
    nueva_carta.src = `/public/images/baraja_espanyola/${carta}.png`;
    nueva_carta.id = carta;
    nueva_carta.classList.toggle("carta");
    document.querySelector('#cartas_jugador') .appendChild(nueva_carta)
}

const mostrarCartasJugador= ()=>{
    let mano = partida.devolverManoJugador(0);
    console.log(mano);
    for (let i= 0; i<mano.cartas.length; i++) mostrarCarta(mano.cartas[i].nombre_Carta());
}

const iniciar_juego= ()=>{
    partida = new Partida(3,2);

    mostrarCartasJugador();
    document.querySelectorAll(".carta").forEach(c =>c.addEventListener('click', mover_Carta));
}

const mover_Carta = e =>{
    console.log(e.target.id);
    document.querySelector("#cartas_jugador").removeChild(e.target);
    e.target.removeEventListener('click', mover_Carta);
    document.querySelector("#cartas_jugadas").appendChild(e.target);
}

document.addEventListener('keyup', iniciar_juego);