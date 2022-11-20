//Variables globales
var limiteComida = 0;
var juego = document.getElementById("juego");
var loginv = document.getElementById("login");
var infov = document.getElementById("info");
var huevov = document.getElementById("huevo");
var hu1 = document.getElementById("m1");
var hu2 = document.getElementById("m2");
var hu3 = document.getElementById("m3");
var HS = "";
var imapet = document.getElementById("imam");
var musica = document.getElementById("audio");

//AUDIO

document.addEventListener("keydown", function (e) {
  var p = document.getElementById("Mus");
  var tecla = e.keyCode;

  var elem = document.getElementById("audio");

  switch (tecla) {
    case 77:
      if (elem.paused) {
        elem.play();
        p.innerHTML = "Presiona 'M' para desactivar música";
      } else {
        elem.pause();
        p.innerHTML = "Presiona 'M' para activar música";
      }
      break;

    default:
      break;
  }
});

//Inicio sesion
function Login() {
  var usuario = document.getElementById("usuario").value;
  var password = document.getElementById("contr").value;
  var usguardado = localStorage.getItem("usuario");
  var conguardada = localStorage.getItem("contran");

  if (usuario == usguardado && password == conguardada) {
    Load();
    OpenGame();
  } else {
    alert(
      "Porfavor ingrese, nombre de usuario y contraseña correctos. O puedes crear un usuario nuevo"
    );
  }
}

function LoginBack() {
  loginv.style.display = "block";
  huevov.style.display = "none";
}

function OpenGame() {
  juego.style.display = "flex";
  infov.style.display = "flex";
  loginv.style.display = "none";
  huevov.style.display = "none";
}

function Register() {
  loginv.style.display = "none";
  juego.style.display = "none";
  infov.style.display = "none";
  huevov.style.display = "block";
}

function SaveUser() {
  var nombremas = document.getElementById("nomm").value;
  localStorage.setItem("nombremascota", nombremas);
  mascota1.nombre = nombremas;
  document.getElementById("NombreM").innerHTML = nombremas;

  var usuarion = document.getElementById("usuarion").value;
  localStorage.setItem("usuario", usuarion);
  document.getElementById("UsuM").innerHTML = usuarion;

  var contran = document.getElementById("contrn").value;
  localStorage.setItem("contran", contran);

  mascota1.habilidad = 0;
  localStorage.removeItem("habm");

  Select(HS);
  OpenGame();
}

hu1.addEventListener("click", function () {
  hu1.style.border = "3px dotted sandybrown";
  hu2.style.border = "none";
  hu3.style.border = "none";

  HS = "Conejo";
});

hu2.addEventListener("click", function () {
  hu2.style.border = "3px dotted sandybrown";
  hu1.style.border = "none";
  hu3.style.border = "none";

  HS = "Gato";
});

hu3.addEventListener("click", function () {
  hu3.style.border = "3px dotted sandybrown";
  hu2.style.border = "none";
  hu1.style.border = "none";

  HS = "Lobo";
});

function Select(huevoselect) {
  var imac = "pets/bunny.gif";
  var imag = "pets/cat.gif";
  var imal = "pets/wolf.gif";

  switch (huevoselect) {
    case "Conejo":
      localStorage.setItem("imaguard", imac);
      Load();
      break;

    case "Gato":
      localStorage.setItem("imaguard", imag);
      Load();
      break;

    case "Lobo":
      localStorage.setItem("imaguard", imal);
      Load();

      break;

    default:
      break;
  }
}

function Load() {
  var imgp = localStorage.getItem("imaguard");
  imapet.src = imgp;

  var habg = localStorage.getItem("habm");
  mascota1.habilidad = habg;
//   var hamg = localStorage.getItem("hambrem")
//   mascota1.hambre = hamg
//   var amorg = localStorage.getItem("amorm")
//   mascota1.amor = amorg
//   var divg = localStorage.getItem("diverm")
//   mascota1.diversion = divg
//   var salg = localStorage.getItem("hambrem")
//   mascota1.salud = salg
//   var pesg = localStorage.getItem("hambrem")
//   mascota1.peso = pesg
}
// --------------- JUEGO -----------------

//Mascotas//

var nombrem = localStorage.getItem("nombremascota");
var t1 = document.getElementById("m1");

function Mascota() {
  (this.tipo = HS),
    (this.nombre = nombrem),
    (this.hambre = 100),
    (this.amor = 100),
    (this.diversion = 100),
    (this.salud = 100),
    (this.peso = 25.6),
    (this.habilidad = 0),
    (this.vivo = true);
}

var mascota1 = new Mascota();

//Atributos Imprimir
document.getElementById("NombreM").innerHTML = mascota1.nombre;
document.getElementById("HambreM").innerHTML = mascota1.hambre;
document.getElementById("AmorM").innerHTML = mascota1.amor;
document.getElementById("DiversionM").innerHTML = mascota1.diversion;
document.getElementById("SaludM").innerHTML = mascota1.salud;
document.getElementById("PesoM").innerHTML = mascota1.peso;
document.getElementById("UsuM").innerHTML = localStorage.getItem("usuario");

//Descenso de necesidades

var dh = setInterval(DescensoHambre, 20000);
var da = setInterval(DescensoAmor, 15000);
var dd = setInterval(DescensoDiversion, 23000);
var ds = setInterval(DescensoSalud, 25000);
setInterval(ReinGiro, 3000);

function DescensoHambre() {
  mascota1.hambre -= 2;
  localStorage.setItem("hambrem", mascota1.hambre);
  document.getElementById("HambreM").innerHTML = mascota1.hambre;

  if (mascota1.hambre == 30) {
    alert(mascota1.nombre + " tiene hambre! Alimentalo");
  }

  if (mascota1.hambre <= 0) {
    clearInterval(dh);
    mascota1.hambre == 0;
    alert(
      mascota1.nombre + " murió de hambre, se fue al cielito de los tamagotchi"
    );
    GameOver();
  }
}

function DescensoAmor() {
  mascota1.amor -= 1;
  localStorage.setItem("amorm", mascota1.amor);
  document.getElementById("AmorM").innerHTML = mascota1.amor;

  if (mascota1.amor < 30) {
    alert(mascota1.nombre + " se siente triste! Hazle un poco de caso");
  }

  if (mascota1.amor <= 0) {
    clearInterval(da);
    mascota1.amor == 0;
    alert(
      mascota1.nombre +
        " murió de tristeza, se fue al cielito de los tamagotchi"
    );
    GameOver();
  }
}

function DescensoDiversion() {
  mascota1.diversion -= 5;
  localStorage.setItem("diverm", mascota1.diversion);
  document.getElementById("DiversionM").innerHTML = mascota1.diversion;

  if (mascota1.diversion < 30) {
    alert(mascota1.nombre + " esta aburrido! Juega con el");
  }

  if (mascota1.diversion <= 0) {
    clearInterval(dd);
    mascota1.diversion == 0;
    alert(
      mascota1.nombre +
        " murió de aburrimiento, se fue al cielito de los tamagotchi"
    );
    GameOver();
  }
}

function DescensoSalud() {
  mascota1.salud -= 3;
  localStorage.setItem("saludm", mascota1.salud);
  document.getElementById("SaludM").innerHTML = mascota1.salud;

  if (mascota1.salud < 30) {
    alert(mascota1.nombre + " se siente mal! Dale un paseo");
  }

  if (mascota1.salud <= 0) {
    clearInterval(ds);
    mascota1.salud == 0;
    alert(
      mascota1.nombre + " murió enfermito, se fue al cielito de los tamagotchi"
    );
    GameOver();
  }
}

// if (mascota1.hambre == 0 || mascota1.amor == 0 || mascota1.diversion == 0 || mascota1.salud == 0) {
//     alert(mascota1.nombre + " se fue al cielito de los tamagotchi")
//     mascota1.vivo = false
// }

// if (mascota1.vivo == false) {
//     alert("Tu mascota ya no vive! Fin del juego")
// }

//Cuidados

function Alimentar() {
  let suma = mascota1.hambre + 10;
  if (limiteComida != 5) {
    if (mascota1.hambre < 100) {
      if (suma >= 100) {
        let dif = 100 - mascota1.hambre;
        mascota1.hambre += dif;
        mascota1.peso += 5;
        document.getElementById("HambreM").innerHTML = mascota1.hambre;
        document.getElementById("PesoM").innerHTML = mascota1.peso;

        alert(mascota1.nombre + " está satisfecho.");
      } else {
        mascota1.hambre += 10;
        mascota1.peso += 5;
        document.getElementById("HambreM").innerHTML = mascota1.hambre;
        document.getElementById("PesoM").innerHTML = mascota1.peso;

        alert(mascota1.nombre + " ha sido alimentado.");
      }
      limiteComida++;
    } else {
      alert(mascota1.nombre + " está lleno.");
    }
  } else {
    alert(
      "Ya alimentaste demasiado a " + mascota1.nombre + ", ejercitalo un poco."
    );
    mascota1.amor--;
    document.getElementById("AmorM").innerHTML = mascota1.amor;
  }
}

function Acariciar() {
  let suma = mascota1.amor + 5;
  let numR = Math.floor(Math.random() * 2) + 1;

  switch (numR) {
    case 1:
      if (mascota1.amor < 100) {
        if (suma >= 100) {
          let dif = 100 - mascota1.amor;
          mascota1.amor += dif;
          mascota1.diversion += 2;
          document.getElementById("AmorM").innerHTML = mascota1.amor;

          alert(mascota1.nombre + " ahora te quiere mucho");
        } else {
          mascota1.amor += 5;
          mascota1.diversion += 2;
          document.getElementById("AmorM").innerHTML = mascota1.amor;

          alert(mascota1.nombre + " ha subido su amor");
        }
      } else {
        alert(mascota1.nombre + " ya te quiere mucho");
      }
      break;

    case 2:
      alert(mascota1.nombre + " no quiere ser acariciado");
      mascota1.amor--;
      document.getElementById("AmorM").innerHTML = mascota1.amor;
      break;

    default:
      break;
  }
}

function Jugar() {
  let suma = mascota1.diversion + 15;
  let numR = Math.floor(Math.random() * 2) + 1;

  switch (numR) {
    case 1:
      if (mascota1.diversion < 100) {
        if (suma >= 100) {
          let dif = 100 - mascota1.diversion;
          mascota1.salud += 3;
          mascota1.diversion += dif;
          mascota1.hambre += 1;
          document.getElementById("HambreM").innerHTML = mascota1.hambre;
          document.getElementById("DiversionM").innerHTML = mascota1.diversion;
          document.getElementById("PesoM").innerHTML = mascota1.peso;
        } else {
          mascota1.salud += 3;
          mascota1.diversion += 15;
          mascota1.hambre += 1;
          document.getElementById("HambreM").innerHTML = mascota1.hambre;
          document.getElementById("DiversionM").innerHTML = mascota1.diversion;
          document.getElementById("PesoM").innerHTML = mascota1.peso;
        }
        alert(mascota1.nombre + " ya no está aburrido.");
        limiteComida--;
      } else {
        alert(mascota1.nombre + " no está aburrido");
      }
      break;

    case 2:
      alert(mascota1.nombre + " no quiere jugar");
      mascota1.amor--;
      document.getElementById("AmorM").innerHTML = mascota1.amor;
      break;

    default:
      break;
  }
}

function Pasear() {
  let suma = mascota1.salud + 10;
  let numR = Math.floor(Math.random() * 2) + 1;

  switch (numR) {
    case 1:
      if (mascota1.salud < 100) {
        if (suma >= 100) {
          let dif = 100 - mascota1.salud;
          mascota1.salud += dif;
          mascota1.peso -= 5;
          mascota1.hambre += 1;
          document.getElementById("HambreM").innerHTML = mascota1.hambre;
          document.getElementById("SaludM").innerHTML = mascota1.salud;
          document.getElementById("PesoM").innerHTML = mascota1.peso;
        } else {
          mascota1.salud += 10;
          mascota1.peso -= 5;
          mascota1.hambre -= 1;
          document.getElementById("HambreM").innerHTML = mascota1.hambre;
          document.getElementById("SaludM").innerHTML = mascota1.salud;
          document.getElementById("PesoM").innerHTML = mascota1.peso;
        }
        alert(mascota1.nombre + " quedó en buena forma.");
        limiteComida--;
      } else {
        alert(mascota1.nombre + " ya está en forma");
      }
      break;

    case 2:
      alert(mascota1.nombre + " no quiere pasear");
      mascota1.amor--;
      document.getElementById("AmorM").innerHTML = mascota1.amor;
      break;

    default:
      break;
  }

  limiteComida--;
}

function Aprender() {
  var hab = mascota1.habilidad;
  let numR = Math.floor(Math.random() * 2) + 1;

  if (hab == 50) {
    alert(mascota1.nombre + " ha dado la vuelta!");
    Giro();
  } else {
    switch (numR) {
      case 1:
        alert(mascota1.nombre + " no te ha atendido, pero te presta atención");
        mascota1.habilidad += 10;
        localStorage.setItem("habm", mascota1.habilidad);
        console.log(mascota1.habilidad);
        break;

      case 2:
        alert(mascota1.nombre + " no te ha atendido y se ha distraido");
        mascota1.amor--;
        document.getElementById("AmorM").innerHTML = mascota1.amor;
        break;
      default:
        break;
    }
  }
}

function Giro() {
  document.getElementById("imam").style.animation =
    "rotate-vert-center 0.5s cubic-bezier(0.455, 0.030, 0.515, 0.955) both";
  document.getElementById("aprender").disabled = true;
  document.getElementById("aprender").innerHTML = "cooldown...";
}

function ReinGiro() {
  document.getElementById("imam").style.animation = "none";
  document.getElementById("aprender").disabled = false;
  document.getElementById("aprender").innerHTML = "¡Da la vuelta!";
}

function GameOver() {
  var resp = confirm("¿Quieres iniciar una nueva partida?");
  if (resp) {
    Register();
    mascota1.amor = 100;
    mascota1.diversion = 100;
    mascota1.hambre = 100;
    mascota1.salud = 100;
    mascota1.habilidad = 0;
    setInterval(DescensoHambre, 20000);
    setInterval(DescensoAmor, 15000);
    setInterval(DescensoDiversion, 23000);
    setInterval(DescensoSalud, 25000);
  } else {
    window.close();
  }
}
