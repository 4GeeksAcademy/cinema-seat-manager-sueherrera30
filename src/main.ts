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
  const libre = 0;
  const ocupado = 1;

  for(let fila:number = 0; fila < filas; fila++) {
     let filaActual: number[] = [];
     for(let columna:number = 0; columna < columnas; columna++){
      filaActual.push(libre);
     }
     salaDeCine.push(filaActual)
  };
  return salaDeCine;
};

console.log(crearSalaDeCine(8,10));
console.log(crearSalaDeCine(5,20));
console.log(crearSalaDeCine(10,5));
export {};
