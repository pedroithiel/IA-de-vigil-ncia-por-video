var video = "";
var objetoDeterctor;
var carregar = false;
var velocidade;
var objeto = [];
function preload() {
    video = createVideo("video.mp4")
    video.hide()
}

function setup() {
    canvas = createCanvas(500, 500)
    canvas.center()

}
function iniciar() {

    objetoDeterctor = ml5.objectDetector("cocossd", modelLoad)
    document.getElementById("Status").innerHTML = "Status: objeto detectado"
}

function pausarVideo() {
    video.pause()
}

function pararVideo() {
    video.stop()
}

function draw() {
    image(video, 0, 0, 500, 500)

    if (carregar) {

        objetoDeterctor.detect(video, gotpose)
        for (i = 0; i < objeto.length; i++) {
            document.getElementById("NumeroDeObjetosDetectado").innerHTML = "Quantidadede objetos detectado: " + objeto.length;
            percent = floor(objeto[i].confidence * 100)
            fill("red")
            stroke("red")
            text(objeto[i].label + " " + percent + "%", objeto[i].x, objeto[i].y)

            noFill()
            stroke("red")
            rect(objeto[i].x, objeto[i].y, objeto[i].width, objeto[i].height)
            
        }

    }
}

function gotpose(error, result) {
    console.log(result)
    if (error) {
        console.log("algo deu errado, tente novamente.")
    } else {
        objeto = result


    }
}

function slide() {
    velocidade = document.getElementById("slides").value
    video.speed(velocidade)
}

function modelLoad() {
    console.log("model load!")
    carregar = true;
    video.loop();
    video.volume(1);
}