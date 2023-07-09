function mostrarOla() {
    var nome = document.getElementById('nome').value;
    var resposta = document.getElementById("resposta");
    resposta.innerHTML = `Olá, <strong>${nome}</strong>!`;
}

var mostrar = document.getElementById("mostrar");
mostrar.addEventListener("click", mostrarOla);

var limpar = document.getElementById("limpar");
limpar.addEventListener("click", function() {
    document.getElementById("nome").focus();
});

document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("nome").focus();
});

var campoNome = document.getElementById("nome");
campoNome.addEventListener("keydown", function(event) {
    if (event.keyCode === 13) {
        event.preventDefault();
        mostrarOla();
    }
});
