var opcselected = "0";
var preElement = document.getElementById("resultado");
var input = document.getElementById("userPointsInput");
input.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    event.preventDefault();
    document.getElementById("btn").click();
  }
});

var porcentajes = {
  '1': {
    fuerza: 0.4,
    agilidad: 0.3,
    vitalidad: 0.1,
    energia: 0.2,
  },

  '2': {
    fuerza: 0.24,
    agilidad: 0.64,
    vitalidad: 0.1,
    energia: 0.02,
  },

  '3': {
    fuerza: 0.02,
    agilidad: 0.28,
    vitalidad: 0.1,
    energia: 0.6,
  },

  '4': {
    fuerza: 0.02,
    agilidad: 0.4,
    vitalidad: 0.08,
    energia: 0.5,
  },

  '5': {
    fuerza: 0.07,
    agilidad: 0.43,
    vitalidad: 0.07,
    energia: 0.43,
  },

  '6': {
    fuerza: 0.12,
    agilidad: 0.18,
    vitalidad: 0.06,
    energia: 0.24,
    comando: 0.39,
  },
};

function flag(value) {
  opcselected = value;
}

function calcular() {
  if (opcselected == '0') {
    preElement.innerHTML = "No ha seleccionado una clase.";
  } else {
    let puntosCalculados = calcularPuntos(input.value, opcselected);

    if (opcselected != '6') {
        preElement.innerHTML = `    Fuerza: ${puntosCalculados.fuerza}
    Agilidad: ${puntosCalculados.agilidad}
    Vitalidad: ${puntosCalculados.vitalidad}
    Energia: ${puntosCalculados.energia}`;
    }

    else {
        preElement.innerHTML = `        Fuerza: ${puntosCalculados.fuerza}
        Agilidad: ${puntosCalculados.agilidad}
        Vitalidad: ${puntosCalculados.vitalidad}
        Energia: ${puntosCalculados.energia}
        Comando: ${puntosCalculados.comando}`;
        
    }

  }
}

function calcularPuntos(puntos, raza) {
    let maximo = 62000;
    let fuerza = Math.round(puntos * porcentajes[raza].fuerza);
    let agilidad = Math.round(puntos * porcentajes[raza].agilidad);
    let vitalidad = Math.round(puntos * porcentajes[raza].vitalidad);
    let energia = Math.round(puntos * porcentajes[raza].energia);
    let comando = Math.round(puntos * porcentajes[raza].comando);


    let sobrante = 0;
    while (true) {
        if (fuerza > maximo) {
            sobrante += fuerza - maximo;
            fuerza = maximo;
        }
        if (agilidad > maximo) {
            sobrante += agilidad - maximo;
            agilidad = maximo;
        }
        if (vitalidad > maximo) {
            sobrante += vitalidad - maximo;
            vitalidad = maximo;
        }
        if (energia > maximo) {
            sobrante += energia - maximo;
            energia = maximo;
        }

        if (comando > maximo) {
            sobrante += comando - maximo;
            comando = maximo;
        }

        if (sobrante === 0 || (fuerza === maximo && agilidad === maximo && vitalidad === maximo && energia === maximo)) {
            break;
        }

        let puntosSobrantes = sobrante;
        sobrante = 0;

        let totalPorcentaje = 0;
        if (fuerza < maximo) {
            totalPorcentaje += porcentajes[raza].fuerza;
        }
        if (agilidad < maximo) {
            totalPorcentaje += porcentajes[raza].agilidad;
        }
        if (vitalidad < maximo) {
            totalPorcentaje += porcentajes[raza].vitalidad;
        }
        if (energia < maximo) {
            totalPorcentaje += porcentajes[raza].energia;
        }

        if (comando < maximo) {
            totalPorcentaje += porcentajes[raza].comando;
        }

        if (fuerza < maximo) {
            fuerza += Math.round(puntosSobrantes * (porcentajes[raza].fuerza / totalPorcentaje));
        }
        if (agilidad < maximo) {
            agilidad += Math.round(puntosSobrantes * (porcentajes[raza].agilidad / totalPorcentaje));
        }
        if (vitalidad < maximo) {
            vitalidad += Math.round(puntosSobrantes * (porcentajes[raza].vitalidad / totalPorcentaje));
        }
        if (energia < maximo) {
            energia += Math.round(puntosSobrantes * (porcentajes[raza].energia / totalPorcentaje));
        }

        if (comando < maximo) {
            comando += Math.round(puntosSobrantes * (porcentajes[raza].comando / totalPorcentaje));
        }
    }

    return {fuerza, agilidad, vitalidad, energia, comando};
}
