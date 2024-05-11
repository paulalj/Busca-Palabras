let contadorErrores = 0; //Inicializamos los errores a 0
let imagen = '<img src=\"./Assets/IMG/file_0.png\">'; //Inicializamos la imagen de los errores con la primera
let secretsWords = ['coche', 'gato', 'pollo', 'garbanzos', 'pizarra']; //Creamos la array de palabras
let secretsWord = secretsWords[Math.floor(Math.random()*secretsWords.length)]; //Seleccionamos una palabra al azar
let currentWord = secretsWord.replace(/./g,"_ "); //Reemplazamos la palabra seleccionada por "_ "

document.getElementById('current_word').innerHTML = currentWord; //Mostramos la palabra escrita con _ en pantalla

//Inicializamos la hora, minutos y segundos
let fecha = new Date();
let hora_inicio = fecha.getHours();
let min_inicio = fecha.getMinutes();
let sec_inicio = fecha.getSeconds();

//Función para reemplazar la letra dicha por el jugador en la palabra secreta
function replaceAt(string, index, replacement){
    if(index >= string.length){
        return string.valueOf();
    }
    return string.substring(0, index) + replacement + string.substring(index + 1);
}

//Función para guardar el nombre del jugador
function ObtenerNombre(){
    let nombre = document.getElementById('input1').value;
    document.querySelector('#inicio').innerHTML = '<h1> Bienvenido/a, '+nombre+' al juego.</h1>';
    document.getElementById('seleccion').style.display='block';
}

//Función para hacer aparecer el bloque de juego
function Jugar(){
    document.getElementById('seleccion').style.display='none';
    document.getElementById('container').style.display='block';
    document.querySelector('#contador').innerHTML = imagen;

    //Actualiza la hora de empezar a jugar
    fecha = new Date();
    hora_inicio = fecha.getHours();
    min_inicio = fecha.getMinutes();
    sec_inicio = fecha.getSeconds();
}

//Función para guardar hacer aparecer el bloque de introducir la palabra del compañero
function ModoPersona(){
    document.getElementById('seleccion').style.display='none';
    document.getElementById('seleccion2').style.display='block';
}

//Función para guardar la palabra introducida por el compañero y hacer aparecer el bloque de juego
function GuardarPalabra(){
    let palabra = document.getElementById('input2').value;
    secretsWord = palabra;
    
    currentWord = secretsWord.replace(/./g,"_ ");
    document.getElementById('current_word').innerHTML = currentWord;

    document.getElementById('seleccion2').style.display='none';
    document.getElementById('container').style.display='block';
    document.querySelector('#contador').innerHTML = imagen;
    
    //Actualiza la hora de empezar a jugar
    fecha = new Date();
    hora_inicio = fecha.getHours();
    min_inicio = fecha.getMinutes();
    sec_inicio = fecha.getSeconds();
}

//Función para jugar
function evaluarLetra(){
    let letra = document.querySelector('#letra').value;
    let posicionCoincidencia = secretsWord.indexOf(letra);
    if(posicionCoincidencia >= 0){
        for(let i=0; i<secretsWord.length; i++){
            if(letra == secretsWord[i]){
                currentWord = replaceAt(currentWord, i*2, letra); //Hacemos i*2 porque tenemos el guión bajo y el espacio
            }
        }
        document.querySelector('#current_word').innerHTML=currentWord;
        document.querySelector('#letra').value='';
    }else{
        contadorErrores++;
        console.log(contadorErrores);
        let nombrefile = 'file_'+contadorErrores+'.png';
        imagen = '<img src=\"./Assets/IMG/'+nombrefile+'\">';
        if(contadorErrores>=3){
            document.querySelector('.message').style.display='block';
            document.querySelector('#juego').style.display='none';
        }
    }
    if(currentWord.indexOf('_')<0 && contadorErrores < 3){
        //Guardamos la hora de finalizar el juego
        let fecha_fin = new Date();
        let hora_fin = fecha_fin.getHours();
        let min_fin = fecha_fin.getMinutes();
        let sec_fin = fecha_fin.getSeconds();
        let resta_hora = Math.abs(hora_inicio- hora_fin);
        let resta_min = Math.abs(min_inicio - min_fin);
        let resta_sec = Math.abs(sec_inicio - sec_fin);

        //Mostramos el mensaje de victoria por pantalla junto con el timepo tardado
        document.querySelector('#juego').innerHTML='<span class="ganar">YUPIIII HAS GANADO!!</span><br><span class="tiempo">Has tardado:'+ resta_hora+ ' horas, '+resta_min+' minutos, '+resta_sec+' segundos</span>';
    }
    document.querySelector('#contador').innerHTML = imagen;
}