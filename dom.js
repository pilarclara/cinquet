import {Partida, Mano_Cartas} from "./cinquet.js";

const nombre_palo = ['oro', 'copa', 'espada', 'basto'];
const valor_carta = ['1','2','3','4','5','6','7','10_sota', '11_caballo','12_rey'];

const cantidadJugadores = 3;
let partida;

function wait(ms){
    var start = new Date().getTime();
    var end = start;
    while(end < start + ms) {
      end = new Date().getTime();
    }  
}

const crearImagenCarta = carta =>{
    let nueva_carta = document.createElement('img');
    nueva_carta.src = `/public/images/baraja_espanyola/${nombre_palo[Math.trunc(carta/10)]}_${valor_carta[carta%10]}.png`;
    nueva_carta.id = carta;
    return nueva_carta;
}

const mostrarCarta = (carta,i)=>{
    let nueva_carta = crearImagenCarta(carta);
    nueva_carta.classList.toggle("carta");
    nueva_carta.classList.toggle(`col${i}`);
    nueva_carta.classList.toggle("carta_0");
    document.querySelector('#cartas_jugador') .appendChild(nueva_carta);
}

const mostrarCartaJugada= (carta, i)=>{
    let list = document.getElementById(`zona_carta_reverso${i}`);
    list.removeChild(list.childNodes[0]);
    colocarCartaJugada(crearImagenCarta(carta),i); 
}

const colocarCartaJugada = (e,i) => {
    e.classList.toggle(`carta_${e.id%10}`);
    e.classList.toggle(`carta_${nombre_palo[parseInt(e.id/10)]}`);
    document.querySelector("#cartas_jugadas").appendChild(e);
    if (i == 2) e.classList.toggle('animacion-slide-left');
    if (i == 1) e.classList.toggle('animacion-slide-right');
}

const mostrarCartasJugador= ()=>{
    let mano = partida.devolverManoJugador(0);
    for (let i= 0; i<mano.cartas.length; i++) mostrarCarta(mano.cartas[i],i);
}

const mostrarReverso = (zona, num )=>{
    let nueva_carta = document.createElement('img');
    nueva_carta.src = `/public/images/baraja_espanyola/carta_reverso.png`;
    nueva_carta.classList.toggle(`carta_${num}`);
    nueva_carta.classList.toggle(`col0`);
    document.getElementById(zona).appendChild(nueva_carta)
}

const mostrarCartasCPUs = () =>{
    let mano;
    for (let j = 1; j<cantidadJugadores; j++){
        mano = partida.jugadores[j];
        for (let i= 1; i<mano.cartas.length; i++) mostrarReverso(`zona_carta_reverso${j}`,i);    
    }
}

const iniciar_juego= ()=>{
    document.querySelector("#btn_jugar").removeEventListener('click', iniciar_juego);
    partida = new Partida(cantidadJugadores);
    mostrarCartasJugador();
    mostrarCartasCPUs();
    document.querySelectorAll(".carta").forEach(c =>c.addEventListener('click', juegaPersona));
}

const juegaPersona =  e =>{
   if (partida.movimientoJugador(parseInt(e.target.id))!=-1) {
        mover_Carta(e);
        jueganCPUs()
    }
}

const jueganCPUs = () =>{
    let jugadaActual;
    for (let i = 1; i< cantidadJugadores && partida.ganador==-1; i++){
        jugadaActual = partida.movimientoCPU();
        wait(300);
        if (jugadaActual!=-1) mostrarCartaJugada(jugadaActual,i);
    }
    if (partida.ganador!=-1) partidaFinalizada();
}

const partidaFinalizada = () =>{
    const popup = document.querySelector('.popup-wrapper');
    const popup_txt = document.querySelector('.popup-text').textContent = `Ha ganado el jugador: CPU ${partida.ganador}`;
    if (partida.ganador) {
        popup.style.display = 'block';
        popup_txt; }
    else {
        popup.style.display = 'block';
        document.querySelector('.popup-text').textContent = `??Has ganado!`; 
    }
    document.querySelectorAll(".carta").forEach(c =>c.removeEventListener('click', juegaPersona));
    document.querySelector("#saltarTurno").removeEventListener('click', saltarTurno);

    popup.addEventListener('click', e => {
        if(e.target.className === 'popup-wrapper' || 'popup-close' ) popup.style.display = 'none';
    });
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

document.querySelector("#btn_jugar").addEventListener('click', iniciar_juego);

document.querySelector("#saltarTurno").addEventListener('click', saltarTurno);