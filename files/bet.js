let multiplicador = 1.0;
let interval;
let apostado = false;

function iniciar() {
    multiplicador = 1.0;
    document.getElementById("mult").innerText = multiplicador.toFixed(2) + "x";
    document.getElementById("progressBar").style.width = "0%";
    document.getElementById("pararBtn").disabled = false;
    document.getElementById("apostarBtn").disabled = true;

    interval = setInterval(() => {
        multiplicador += Math.random() * 0.1;
        document.getElementById("mult").innerText = multiplicador.toFixed(2) + "x";
        document.getElementById("progressBar").style.width = Math.min(multiplicador * 10, 100) + "%";

        if (Math.random() < 0.01) {
            crash();
        }
    }, 100);
}

function apostar() {
    apostado = true;
    iniciar();
}

function parar() {
    if (apostado) {
        clearInterval(interval);
        alert(`Você parou com o multiplicador de ${multiplicador.toFixed(2)}x.`);
        resetar();
    }
}

function crash() {
    clearInterval(interval);
    alert(`Crashou! O multiplicador foi de ${multiplicador.toFixed(2)}x.`);
    resetar();
}

function resetar() {
    multiplicador = 1.0;
    apostado = false;
    document.getElementById("apostarBtn").disabled = false;
    document.getElementById("pararBtn").disabled = true;
    document.getElementById("mult").innerText = "1.00x";
    document.getElementById("progressBar").style.width = "0%";
}
