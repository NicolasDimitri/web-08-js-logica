function calcular(event) {
    event.preventDefault();

let nome = document.getElementById("nome").value;
let altura = parseFloat(document.getElementById("altura").value);
let peso = parseFloat(document.getElementById("peso").value);
let sexo = document.getElementById("sexo");
var imc = peso / (altura * altura);

document.getElementById("resultado").innerHTML = "IMC de " + nome + " é: <b> " + imc.toFixed(2) +"</b>";
}