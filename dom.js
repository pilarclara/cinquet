import {Partida, Mano_Cartas} from "./cinquet.js";

const nombre_palo = ['oro', 'copa', 'espada', 'basto'];
const valor_carta = ['1','2','3','4','5','6','7','10_sota', '11_caballo','12_rey'];

let partida;

function mostrarCarta(carta){
    let nueva_carta = document.createElement('img');
    nueva_carta.src = `/public/images/baraja_espanyola/${nombre_palo[Math.trunc(carta/10)]}_${valor_carta[carta%10]}.png`;
    nueva_carta.id = carta;
    nueva_carta.classList.toggle("carta");
    document.querySelector('#cartas_jugador') .appendChild(nueva_carta)
}

const mostrarCartasJugador= ()=>{
    let mano = partida.devolverManoJugador(0);
    console.log(mano);
    for (let i= 0; i<mano.cartas.length; i++) mostrarCarta(mano.cartas[i]);
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