import "./style.css";


// funcion encargada de crear la sala de cine, la matriz que muestra filas y columnas, esta es dinamica, puedes crear la sala
// de forma dinamica con el numero que se desee de filas y columnas.
const crearSalaDeCine = (filas: number, columnas: number): number[][] => {
  const salaDeCine: number[][] = [];
  const libre: number = 0;
  const ocupado: number = 1;
  for(let fila:number = 0; fila < filas; fila++) {
     let filaActual: number[] = [];
     for(let columna:number = 0; columna < columnas; columna++){
      filaActual.push(libre);
     }
     salaDeCine.push(filaActual)
  };
  return salaDeCine;
};
// funcion que nos permite asignar el asiento, por default en la funcion anterior, si es libre le ponemos valor de 0, pero si se ocupa
//  se pondra aqui el valor de 1, hacemos un log donde decimos que recervamos el asiento  tal en la fila tal, si este ya tiene un valor te
// avisa que ya esta ocupado.
const reservarLugares = (sala: number[][], fila: number, asiento: number) => {
  if (sala[fila][asiento] === 0) {
    sala[fila][asiento] = 1;
    console.log(`Reservaste en la fila ${fila}, asiento ${asiento}`);  
  } else {
    console.log(`Error: El asiento en la fila ${fila}, asiento ${asiento} ya está ocupado.`);
  }
};
// esta funcion ayuda a enseñarnos la sala con los lugares ya ocupados o no, usando 
// L para los asientos libres, que est como 0, o x si ya esta ocupado,
// al infinal nos muestra los valores de si esta ocupado o no, por fila.
const imprimirEstadoDeSala = (sala: number[][]) => {
  for (let fila = 0; fila < sala.length; fila++) {
    let estadoFila = ""; 
    for (let asiento = 0; asiento < sala[fila].length; asiento++) {
      if (sala[fila][asiento] === 0) {
        estadoFila = estadoFila + "L"; 
      } else {
        estadoFila = estadoFila + "X"; 
      }
    }
    console.log(`Fila no. ${fila + 1}: ${estadoFila}`)  
  }
};

// esta funcion nos ayuda a hacer un conteo de cuantos asientos estan ocupados, y cuantos estan libres.
const conteoDeAsientos = (sala: number[][]) => {
  let asientosReservados = 0;
  let asientosLibres = 0; 
  for (let fila = 0; fila < sala.length; fila++) {
    for (let asiento = 0; asiento < sala[fila].length; asiento++) {
      if (sala[fila][asiento] === 1) {
        asientosReservados++; 
      } else {
        asientosLibres++;
      }
    }
  }
  let estadoSala = {
    reservados: asientosReservados,
    libres: asientosLibres
  };
  console.log('estadoSala', estadoSala);
  return estadoSala;
};

//  esta funcion nos ayuda a encontrar los asientos en la misma fila que esten libres uno alado del otro, 
// encuentra las opciones posibles, si no hay opciones manda un mensaje de que no hay disponibilidad.
const buscarAsientosJuntos = (sala: number[][]) => {
  for (let fila = 0; fila < sala.length; fila++) {
    for (let asiento = 0; asiento < sala[fila].length - 1; asiento++) {
      if (sala[fila][asiento] === 0 && sala[fila][asiento + 1] === 0) {
        console.log(`Asientos juntos para ti!: Fila ${fila}, asientos ${asiento} y ${asiento + 1}`);
        return;
      }
    }
  }
  console.log("Lo sentimos, no hay asientos juntos disponibles en la sala :(");
};

const renderizarSala = (sala: number[][]) => {
  if (typeof document === "undefined") {
    return;
  }

  const app = document.querySelector<HTMLDivElement>("#app");
  if (!app) {
    return;
  }

  app.innerHTML = "";

  const cabecera = document.createElement("div");
  cabecera.className = "mb-4 flex items-center justify-between text-sm text-slate-700";
  cabecera.innerHTML = '<span>L = libre</span><span>X = ocupado</span>';
  app.appendChild(cabecera);

  const cuadricula = document.createElement("div");
  cuadricula.className = "grid gap-2";
  cuadricula.style.gridTemplateColumns = `repeat(${sala[0].length}, minmax(0, 1fr))`;

  for (let fila = 0; fila < sala.length; fila++) {
    for (let asiento = 0; asiento < sala[fila].length; asiento++) {
      const estaLibre = sala[fila][asiento] === 0;
      const boton = document.createElement("button");
      boton.type = "button";
      boton.textContent = estaLibre ? "L" : "X";
      boton.className = `rounded-md px-2 py-2 text-sm font-bold text-white transition ${
        estaLibre ? "bg-emerald-500 hover:bg-emerald-600" : "bg-slate-500"
      }`;

      if (estaLibre) {
        boton.addEventListener("click", () => {
          reservarLugares(sala, fila, asiento);
          imprimirEstadoDeSala(sala);
          conteoDeAsientos(sala);
          buscarAsientosJuntos(sala);
          renderizarSala(sala);
        });
      } else {
        boton.disabled = true;
      }

      cuadricula.appendChild(boton);
    }
  }

  app.appendChild(cuadricula);
};

const miSalaCine = crearSalaDeCine(8, 10);

reservarLugares(miSalaCine, 2, 2); 
reservarLugares(miSalaCine, 4, 4);
reservarLugares(miSalaCine, 4, 2);
reservarLugares(miSalaCine, 3, 10);
reservarLugares(miSalaCine, 5, 5);
reservarLugares(miSalaCine, 5, 6);
imprimirEstadoDeSala(miSalaCine);
conteoDeAsientos(miSalaCine);
buscarAsientosJuntos(miSalaCine);
renderizarSala(miSalaCine);

export {};
