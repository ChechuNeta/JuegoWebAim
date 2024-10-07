function mostrarInstrucciones() 
{
    document.querySelectorAll('.contenedor button, .contenedor select').forEach(element => {
        element.style.display = 'none';});

    document.getElementById('instrucciones').style.display = 'block';
    document.getElementById('instruccionesVolver').style.display = 'block';


}

function ocultarInstrucciones() 
{
    puntuacion = 0;
    clicks = 0;
    document.querySelector('.contenedor').style.display = 'grid';
    document.querySelector('.contenedor h1').style.display = 'block';
    document.querySelectorAll('.contenedor button, .contenedor select').forEach(element => {
        element.style.display = 'block';});

 

    document.getElementById('pantallafinal').style.display = 'none';
    document.getElementById('instrucciones').style.display = 'none';
    document.getElementById('instruccionesVolver').style.display = 'none';
    document.getElementById('pantallafinal').removeChild(document.getElementById("puntosa"));
    document.getElementById('pantallafinal').removeChild(document.getElementById("puntosb"));
    document.getElementById('pantallafinal').removeChild(document.getElementById("puntosc"));
}

//////////////////////////////////////////////////////////////////////////////////////////

var intervalodesaparecer;
var target = document.getElementById("target");
var fondo = document.getElementById("fondo");
var juegoIniciado = false;
var puntuacion = 0;
var clicks = 0;
var listapuntuaciones =[];


// var cuentaRegresiva = 3; // Inicializa con el número de segundos deseados
// var cuentaRegresivaInterval;



// function actualizarCuentaRegresiva() {

//     document.querySelector('.contenedor').style.display = 'none';
//     var cuentaRegresivaElement = document.createElement("div");
//     cuentaRegresivaElement.id = "cuentaRegresiva";
//     cuentaRegresivaElement.textContent = cuentaRegresiva;
//     document.body.appendChild(cuentaRegresivaElement);
//     cuentaRegresiva--;

//    setTimeout(function () {
//         document.body.removeChild(cuentaRegresivaElement);
//         cuentaRegresiva--;

//         if (cuentaRegresiva < 0) {
//             clearInterval(cuentaRegresivaInterval);
//             Empezarjuego(document.getElementById('tiempo').value);
//         } else {
//             actualizarCuentaRegresiva();
//         }
//     }, 1000);
    
// }
// function iniciarCuentaRegresiva() {
//     cuentaRegresivaInterval = setInterval(actualizarCuentaRegresiva, 1000);
// }

var cuentaRegresiva = 3;
var cuentaRegresivaElement;
var cuentaRegresivaInterval;

function actualizarCuentaRegresiva() {
    if (cuentaRegresivaElement) {
        cuentaRegresivaElement.textContent = cuentaRegresiva;
    }

    cuentaRegresiva--;

    if (cuentaRegresiva < 0) {
        clearInterval(cuentaRegresivaInterval);
        document.body.removeChild(cuentaRegresivaElement);
        cuentaRegresivaElement = null;  // Limpiar la referencia al elemento
        Empezarjuego(document.getElementById('tiempo').value);
    }
}

function iniciarCuentaRegresiva() {
    document.querySelector('.contenedor').style.display = 'none';

    // Limpiar elementos antiguos si existen
    if (cuentaRegresivaElement) {
        document.body.removeChild(cuentaRegresivaElement);
        cuentaRegresivaElement = null;
    }

    cuentaRegresivaElement = document.createElement("div");
    cuentaRegresivaElement.id = "cuentaRegresiva";
    document.body.appendChild(cuentaRegresivaElement);

    cuentaRegresiva = 3;  // Reiniciar cuenta regresiva
    cuentaRegresivaInterval = setInterval(actualizarCuentaRegresiva, 1000);
}

// Resto del código...





function Empezarjuego(eltiempo)
{
    // document.querySelector('.contenedor').style.display = 'none';
    if(eltiempo == 1)
    {
        tiempo = 5000;
    }
    else
    {
        if(eltiempo == 2)
        {
            tiempo = 10000
        }
        else
        {
            tiempo= 15000;
        }
    }
    
    target.style.display = 'block';
    reposicionar();
    
    
    if (!juegoIniciado) {
        juegoIniciado = true;
        setTimeout(function () {
            var porcentajeacierto = (puntuacion / clicks) * 100;
            document.getElementById('pantallafinal').style.display = 'grid';

    
            puntos1 = document.createElement("p");
            puntos1.textContent= "Clicks Totales: " + clicks;
            puntos2 = document.createElement("p");
            puntos2.textContent= "Aciertos: "+puntuacion;
            puntos3 = document.createElement("p");
            puntos3.textContent= "Precisión: "+porcentajeacierto.toFixed(2)+"%";

            // decirGanador(puntuacion, tiempo);
          
            puntos1.id="puntosa";
            puntos2.id="puntosb";
            puntos3.id="puntosc";

            decirGanador(puntuacion, tiempo).then(data => alert(data)).catch(data=>alert(data));
    
            botonvolver = document.getElementById("pantallafinalvolver");
            document.getElementById("pantallafinal").insertBefore(puntos1, botonvolver);
            document.getElementById("pantallafinal").insertBefore(puntos2, botonvolver);
            document.getElementById("pantallafinal").insertBefore(puntos3, botonvolver);

            for(let i=0; listapuntuaciones.length;i++)
            {
                console.log(listapuntuaciones[i]);
            }

            target.style.display = 'none';
            juegoIniciado = false; 
            clearTimeout(intervalodesaparecer);
        }, tiempo); 
    }
    
}


function decirGanador(numero, tiempo) 
{
    if(tiempo == 5000)
    {
        return new Promise((resolve, reject) => {
            setTimeout(function () {
            if (numero > 7) {
            resolve("Mas de 7 aciertos,  ¡que locura!");
            } else {
            reject("Hay que espabilar!");
            }
            }, 1000);
            });
        
    }
    else
    {
        if(tiempo == 10000)
        {
            return new Promise((resolve, reject) => {
                setTimeout(function () {
                if (numero > 14) {
                resolve("Mas de 14 aciertos, ¡que locura!");
                } else {
                reject("Hay que espabilar!");
                }
                }, 1000);
                });
        }
        else
        {
            return new Promise((resolve, reject) => {
                setTimeout(function () {
                if (numero > 21) {
                resolve("Mas de 21 aciertos, ¡que locura!");
                } else {
                reject("Hay que espabilar!");
                }
                }, 1000);
                });
        }
    }
   }

function reposicionar() 
{
    let posicionx = Math.round(Math.random() * 95);
    let posiciony = Math.round(Math.random() * 95);
    let tamaño = randomIntFromInterval(40, 80);

    // Mostrar el target y establecer su posición y tamaño
    target.style.display = 'block';
    target.style.left = posicionx + "%";
    target.style.top = posiciony + "%";
    target.style.width = tamaño + "px";
    target.style.height = tamaño + "px";

    // Limpiar el temporizador anterior (si existe)
    clearTimeout(intervalodesaparecer);

    // Configurar el nuevo temporizador para reposicionar el target después de 2 segundos si no es pulsado
    intervalodesaparecer = setTimeout(function () {
        reposicionar();
    }, 1400);
   
}


function randomIntFromInterval(min,max)
{
    return Math.floor( Math.random()*  ( max - min + 1 ) + min );
}

target.onmousedown = function() 
{
    aciertoclick();
}

fondo.onmousedown = function() 
{
    falloclick();
}

function aciertoclick()
{
    if (juegoIniciado)
    {
        puntuacion +=1;
        // clicks +=1;
        reposicionar();  
    }        
}

function falloclick()
{
    if (juegoIniciado)
    {
        clicks +=1;     

        const posX = event.clientX - 40;  // Resta la mitad del ancho de la imagen
        const posY = event.clientY - 60;  // Resta la mitad de la altura de la imagen
        // Mostrar la imagen en la posición del clic
        const imagenClick = document.getElementById('imagenClick');
        imagenClick.style.left = posX + 'px';
        imagenClick.style.top = posY + 'px';
        imagenClick.style.display = 'block';

        // Ocultar la imagen después de un segundo
        setTimeout(function () {
            imagenClick.style.display = 'none';
        }, 1000);
    }        
}








