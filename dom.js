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
const mostrarCarta = carta=>{
    let nueva_carta = crearImagenCarta(carta);
    nueva_carta.classList.toggle("carta");
    document.querySelector('#cartas_jugador') .appendChild(nueva_carta)
}

const mostrarCartaJugada= (carta)=>{
    colocarCartaJugada(crearImagenCarta(carta)); 
}

const colocarCartaJugada = e => {
    e.classList.toggle(`carta_${e.id%10}`);
    e.classList.toggle(`carta_${nombre_palo[parseInt(e.id/10)]}`);
    document.querySelector("#cartas_jugadas").appendChild(e);
}

const mostrarCartasJugador= ()=>{
    let mano = partida.devolverManoJugador(0);
    for (let i= 0; i<mano.cartas.length; i++) mostrarCarta(mano.cartas[i]);
}

const mostrarReverso = zona =>{
    let nueva_carta = document.createElement('img');
    nueva_carta.src = `/public/images/baraja_espanyola/carta_reverso.png`;
    nueva_carta.classList.toggle("derecha");
    let cad = `zona_carta_reverso`;
    cad.concat(zona.toString());
    console.log(cad);
    document.getElementById(cad).appendChild(nueva_carta)
}

const mostrarCartasCPUs = () =>{
    let mano;
    for (let j = 0; j<cantidadJugadores-1; j++){
        mano = partida.jugadores[j];
        for (let i= 0; i<mano.cartas.length; i++) mostrarReverso(j);    
    }
}

const iniciar_juego= ()=>{
    partida = new Partida(cantidadJugadores,2);
    mostrarCartasJugador();
    mostrarCartasCPUs();
    document.querySelectorAll(".carta").forEach(c =>c.addEventListener('click', juegaPersona));
}

const juegaPersona =  e =>{
   if (partida.movimientoJugador(parseInt(e.target.id))!=-1) {
        mover_Carta(e);
      //  wait(1000);
        jueganCPUs()
        // setTimeout(jueganCPUs(), 3000); probé con esto pero no logré que se viera la jugada del otro
    }
}

const jueganCPUs = () =>{
    let jugadaActual;
    while (partida.turno && partida.ganador==-1){
        jugadaActual = partida.movimientoCPU();
        wait(500);
    //    setTimeout(function(){}, 5000)
        console.log("ha esperado");
        if (jugadaActual!=-1) mostrarCartaJugada(jugadaActual);
    }
    if (partida.ganador!=-1) partidaFinalizada();
}

const partidaFinalizada = () =>{
    partida.ganador? alert(`Ganó , ${partida.ganador}`) : alert("Has ganado"); // eliminar todos los addeventlistener
    document.querySelectorAll(".carta").forEach(c =>c.removeEventListener('click', juegaPersona));
    document.querySelector("#btn_jugar").removeEventListener('click', iniciar_juego);
    document.querySelector("#saltarTurno").removeEventListener('click', saltarTurno);
}

const mover_Carta = e =>{
    document.querySelector("#cartas_jugador").removeChild(e.target);
    e.target.removeEventListener('click', juegaPersona);
    colocarCartaJugada(e.target);
}

const saltarTurno = () =>{
    partida.pasarTurno();
    jueganCPUs()
    //setTimeout(jueganCPUs(), 10000);
}

document.querySelector("#btn_jugar").addEventListener('click', iniciar_juego);

document.querySelector("#saltarTurno").addEventListener('click', saltarTurno);