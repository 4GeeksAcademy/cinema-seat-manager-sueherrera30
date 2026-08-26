if (typeof document !== "undefined") {
  import("./style.css").then(() => {
    const app = document.querySelector<HTMLParagraphElement>("#app");
    if (app) {
      app.textContent = "If you can see this, Tailwind is working.";
    }
  });
}

console.log("Hello from src/main.ts");
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

const reservarLugares = (sala: number[][], fila: number, asiento: number) => {
  if (sala[fila][asiento] === 0) {
    sala[fila][asiento] = 1;
    console.log(`Reservaste en la fila ${fila}, asiento ${asiento}`);  
  } else {
    console.log(`Error: El asiento en la fila ${fila}, asiento ${asiento} ya está ocupado.`);
  }
};
let sala = crearSalaDeCine(8,10);
console.log(reservarLugares(sala, 5,4));

export {};
