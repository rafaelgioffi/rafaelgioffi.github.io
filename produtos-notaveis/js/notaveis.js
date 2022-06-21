const valA = document.getElementById('valA');
const valB = document.getElementById('valB');
const result = document.getElementById('result');

function soma() {
    let valorA = valA.value;
    let valorB = valB.value;
    console.log(valorA + " - " + valorB);
    let resultado = (valorA * valorA) + (2 * valorA * valorB) + (valorB * valorB);
    console.log(resultado);
    result.innerHTML = "Resultado: " + resultado;
}

function menos() {
    let valorA = valA.value;
    let valorB = valB.value;
    let resultado = (valorA * valorA) - (2 * valorA * valorB) + (valorB * valorB);
    result.innerHTML = "Resultado: " + resultado;
}