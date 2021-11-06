import {Partida, Mano_Cartas} from "./cinquet.js";

const nombre_palo = ['oro', 'copa', 'espada', 'basto'];
const valor_carta = ['1','2','3','4','5','6','7','10_sota', '11_caballo','12_rey'];

let partida;

const crearImagenCarta = carta =>{
    let nueva_carta = document.createElement('img');
    nueva_carta.src = `/public/images/baraja_espanyola/${nombre_palo[Math.trunc(carta/10)]}_${valor_carta[carta%10]}.png`;
    nueva_carta.id = carta;
    return nueva_carta;
}
const mostrarCarta = carta=>{
    let nueva_carta = crearImagenCarta(carta);
    nueva_carta.classList.toggle("carta");
    document.querySelector('#cartas_jugador') .appendChild(nueva_carta)
}

const mostrarCartaJugada= (carta)=>{
    colocarCartaJugada(crearImagenCarta(carta)); //valorar si eliminar mostrarCartaJugada
}

const colocarCartaJugada = e => {
    if (e.id <=9) document.querySelector("#zona_oro").appendChild(e);
    if (e.id >=10 && e.id <=19) document.querySelector("#zona_copa").appendChild(e);
    if (e.id >=20 && e.id <=29) document.querySelector("#zona_espada").appendChild(e);
    if (e.id >=30 && e.id <=39) document.querySelector("#zona_basto").appendChild(e);
}


const mostrarCartasJugador= ()=>{
    let mano = partida.devolverManoJugador(0);
    for (let i= 0; i<mano.cartas.length; i++) mostrarCarta(mano.cartas[i]);
}

const iniciar_juego= ()=>{
    partida = new Partida(3,2);
    mostrarCartasJugador();
    document.querySelectorAll(".carta").forEach(c =>c.addEventListener('click', juegaPersona));
    jueganCPUs();
}

const juegaPersona =  e =>{
   if (partida.movimientoJugador(parseInt(e.target.id))!=-1) {
        mover_Carta(e);
        jueganCPUs();
    }
}

const jueganCPUs = () =>{
    let jugadaActual;
    while (partida.turno && partida.ganador==-1){
        jugadaActual = partida.movimientoCPU();
        if (jugadaActual!=-1) mostrarCartaJugada(jugadaActual);
    }
    if (partida._ganador!=-1) partidaFinalizada();
}

const partidaFinalizada = () =>{
    partida.ganador? alert(`Ganó , ${partida.ganador}`) : alert("Has ganado"); // eliminar todos los addeventlistener
    document.querySelectorAll(".carta").forEach(c =>c.removeEventListener('click', juegaPersona));
    document.removeEventListener('keyup', iniciar_juego);
    document.querySelector("#saltarTurno").removeEventListener('click', saltarTurno);
}

const mover_Carta = e =>{
    document.querySelector("#cartas_jugador").removeChild(e.target);
    e.target.removeEventListener('click', juegaPersona);
    colocarCartaJugada(e.target);
}

const saltarTurno = () =>{
    partida.pasarTurno();
    jueganCPUs();
}

document.addEventListener('keyup', iniciar_juego);

document.querySelector("#saltarTurno").addEventListener('click', saltarTurno);