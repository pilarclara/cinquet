function mostrarCarta(carta){
    let nueva_carta = document.createElement('img');
    nueva_carta.src = `/public/images/baraja_espanyola/${carta}.png`;
    nueva_carta.id = carta;
    nueva_carta.classList.toggle("carta");
    document.querySelector('#cartas_jugador') .appendChild(nueva_carta)
}

const iniciar_juego= ()=>{
    mostrarCarta('oro_4')
    document.querySelectorAll(".carta").forEach(c =>c.addEventListener('click', mover_Carta));
}

const mover_Carta = e =>{
    console.log('hola');
    document.querySelector("#cartas_jugador").removeChild(e.target);
    e.target.removeEventListener('click', mover_Carta);
    document.querySelector("#cartas_jugadas").appendChild(e.target);
}
document.addEventListener('keyup', iniciar_juego);
