const dev = false
// const dev = false

const tubos = document.querySelector(".tubos")
const tubo = document.querySelector(".tubo")
const bird = document.querySelector(".bird")
bird.src = "assets/imgs/passaro.png"

const flappy = document.querySelector("[wm-flappy]")
const infotext = document.querySelector(".infoPlay")
const score = document.querySelector(".score")
const background = document.querySelector("#animatedBackground")
const title = document.querySelector(".title")
const buttonFullscreen = document.getElementById("fullscreen")

let cima = document.querySelector(".cima")
let baixo = document.querySelector(".baixo")

const sfxPoint = new Audio("assets/audio/Everything/sfx_point.wav")
const sfxDie = new Audio("assets/audio/Everything/sfx_die.wav")
const sfxBackground = new Audio("assets/audio/background.ogg")
const sfxThunder = new Audio("assets/audio/thunder.mp3")
sfxBackground.loop = true
sfxBackground.volume = 0.2
sfxPoint.volume = 0.2


tubo.children[0].style.height = Math.floor(Math.random() * (415 - 0)) + 0 + "px"

var birdpos = 300
var rising = false
var running = false
var gameover = false

var moverTubo
var moveTuboY

var hell = false
var halloween = false

var velocidadeTubo = 1
var birdVelMultiplier = 1

var fullscreen = false

var recorde = Number(localStorage.getItem("recorde")) ? localStorage.getItem("recorde") : 0

score.innerHTML = "Recorde: " + recorde

buttonFullscreen.onclick = () => {
    !document.fullscreenElement ? (flappy.requestFullscreen(), fullscreenOn()) : (parent.indexfullscreen = false, document.exitFullscreen(), parent.reload())
}



const fullscreenOn = () => {
    flappy.style.top = "0px"
    flappy.style.margin = "0px"
    title.style.display = "none"
    flappy.style.width = "100%"
    flappy.style.height = "100%"
    parent.indexfullscreen = true
    fullscreen = true
    tubo.style.width = "160px"
    velocidadeTubo = 1.33
    score.style.fontSize = "5.3em"
    infotext.style.fontSize = "3.5em"
}

// if (parent.firsttime) {fullscreenOn(), parent.firsttime = false}

if (parent.indexfullscreen == true) {fullscreenOn()}

const play = () => {
    Number(score.innerHTML) ? null : score.innerHTML = 0
    flappy.style.cursor = "none"
    window.getComputedStyle(flappy).width == "1920px" ? (tuboposition = -533, fullscreen = true) : (tuboposition = -400, fullscreen = false)
    // console.log(window.getComputedStyle(background).getPropertyValue("height"));
    buttonFullscreen.style.visibility = "hidden"
    sfxBackground.play()
    let pos = 0
    let horaDoTubo = 400
    let horaDeSumir = -1200
    
    if (fullscreen) {
        horaDoTubo = 533
        horaDeSumir = -1600
    }

    let tuboslide = setInterval(() => {
        tubos.style.right = pos + "px"
        pos = pos + velocidadeTubo
        horaDoTubo = horaDoTubo + velocidadeTubo
        horaDeSumir = horaDeSumir + velocidadeTubo
        if (!fullscreen) {
            if (horaDoTubo > 400) {
                horaDoTubo = 0
                addTubo()
            }
            if (horaDeSumir > 400) {
                horaDeSumir = 0
                tubos.children[0].remove()
            }
        } else {
            if (horaDoTubo > 533) {
                horaDoTubo = 0
                addTubo()
            }
            if (horaDeSumir > 533) {
                horaDeSumir = 0
                tubos.children[0].remove()
            }
        }
    }, 1)

    let birdmove = setInterval(() => {
        bird.style.bottom = birdpos + "px"
        !fullscreen ? birdpos > 0 && rising == false ? birdpos = birdpos - (1.5 * birdVelMultiplier) : null : birdpos > 0 && rising == false ? birdpos = birdpos - (2.4 * birdVelMultiplier) : null
        if (!fullscreen) {
            birdpos < 645 && rising == true ? birdpos = birdpos + (1.25 * birdVelMultiplier) : null
        } else {
            birdpos < 1030 && rising == true ? birdpos = birdpos + (2 * birdVelMultiplier) : null
        }
    }, 1)

    moveTuboY = (tubo, y, ytemp, tuborising = false) => {
        moverTubo = setInterval(() => {
            if (!fullscreen) {tuborising == false && ytemp < (y + 70) ? ytemp += 1 : tuborising = true
            tuborising == true && ytemp > (y - 70) ? ytemp -= 1 : tuborising = false}
            else {tuborising == false && ytemp < (y + 112) ? ytemp += 1.6 : tuborising = true
                tuborising == true && ytemp > (y - 112) ? ytemp -= 1.6 : tuborising = false
            }
            tubo.style.height = ytemp + "px"
        }, 10)
    }

    moveTuboX = (tubo, x, xtemp, tuboright = false) => {
        moverTubo = setInterval(() => {
            if (!fullscreen) {tuboright == false && xtemp < (x + 35) ? xtemp += 0.5 : tuboright = true
            tuboright == true && xtemp > (x - 70) ? xtemp -= 1 : tuboright = false}
            else {tuboright == false && xtemp < (x + 46.5) ? xtemp += 0.6 : tuboright = true
                tuboright == true && xtemp > (x - 93) ? xtemp -= 1.3 : tuboright = false
            }
            tubo.style.right = xtemp + "px"
        }, 10)
    }

    const fimDeJogo = () => {
        sfxBackground.pause()
        snapEffect()
        sfxDie.play()
        background.style["animation-play-state"] = "paused"
        clearInterval(tuboslide);
        clearInterval(birdmove);
        for (var i = 1; i < 1000; i++)
            window.clearInterval(i);
        gameover = true
        flappy.style.filter = "grayscale(100%)"
        // infotext.innerHTML = "Aperte espaço para jogar de novo"
        Number(score.innerHTML) > localStorage.getItem("recorde") ? localStorage.setItem("recorde", Number(score.innerHTML)) : null
    }

    const changeHell = () => {
        document.querySelector(".flashhit").style.animation = "flash ease-out 1s normal"
        sfxThunder.play()
        setTimeout(() => {
            sfxBackground.src = "assets/audio/doomtheme.ogg"
            sfxBackground.volume = 0.6
            sfxPoint.volume = 0.2
            sfxBackground.play()
            let tubosToHell = document.querySelectorAll(".tubo")
            title.style.color = "white"
            title.innerHTML = "Flappy Hell"
            bird.src = "assets/imgs/birdmonster.png"
            Array.from(tubosToHell).map((tubin) => Array.from(tubin.children).forEach(x => !x.classList.contains("passagem") ? x.style.background = "linear-gradient(90deg, #3f0d12 0%, #a71d31 74%)" : null))
            document.body.style.backgroundColor = "black"
            background.style.backgroundImage = "url('assets/imgs/hell.png')"
            hell = true
            velocidadeTubo *= 1.25
            birdVelMultiplier *= 1.3
        }, 200)
    }

    const changeHalloween = () => {
        document.querySelector(".flashhit").style.animation = "none"
        document.querySelector(".flashhit").offsetHeight
        document.querySelector(".flashhit").style.animation = "flash ease-out 1s normal"
        sfxThunder.play()
        setTimeout(() => {
            sfxBackground.src = "assets/audio/spookyscary.ogg"
            sfxBackground.volume = 0.6
            sfxPoint.volume = 0.2
            sfxBackground.play()
            let tubosToHell = document.querySelectorAll(".tubo")
            title.style.color = "white"
            title.innerHTML = "Flappy Halloween"
            bird.src = "assets/imgs/ghost.png"
            bird.style.height = "6.4%"
            Array.from(tubosToHell).map((tubin) => Array.from(tubin.children).forEach(x => !x.classList.contains("passagem") ? x.style.background = "none" : null))
            document.body.style.backgroundColor = "black"
            background.style.backgroundImage = "url('assets/imgs/halloweenTheme.png')"
            hell = false
            halloween = true
            birdVelMultiplier *= 1.2
        }, 200)
    }

    let collision = setInterval(() => {
        if (cima) var {
            x,
            y,
            width,
            height
        } = cima.getBoundingClientRect()
        if (baixo) var {
            x: x2,
            y: y2,
            width: width2,
            height: height2
        } = baixo.getBoundingClientRect()

        x -= 5
        width += 15
        height += 30

        x2 -= 5
        width2 += 15
        y2 -= 30

        if ((bird.x < x + width &&
                bird.x + bird.width > x &&
                bird.y < y + height &&
                bird.y + bird.height > y)) {
            fimDeJogo()
        }
        if ((bird.x < x2 + width2 &&
                bird.x + bird.width > x2 &&
                bird.y < y2 + height2 &&
                bird.y + bird.height > y2)) {
            fimDeJogo()
        }

        if (bird.x > x + (width / 3)) {
            sfxPoint.play()
            cima.classList.remove("activeup")
            baixo.classList.remove("activedown")
            cima = document.querySelector(".activeup")
            baixo = document.querySelector(".activedown")
            score.innerHTML = Number(score.innerHTML) + 1
            hell == false && Number(score.innerHTML) == 15 ? changeHell() : null
            halloween == false && Number(score.innerHTML) == 45 ? changeHalloween() : null
        }
    }, 10)
}

let tuboposition = -400

const addTubo = () => {
    let tubo2 = tubo.cloneNode(true)



    tubo2.children[0].classList.contains("activeup") ? null : tubo2.children[0].classList.add("activeup")
    tubo2.children[4].classList.contains("activedown") ? null : tubo2.children[4].classList.add("activedown")

    hell == true ? Array.from(tubo2.children).map(x => x.style.background = "linear-gradient(90deg, #3f0d12 0%, #a71d31 74%)") : null
    halloween == true ? Array.from(tubo2.children).map(x => x.style.background = "none") : null

    let random = !fullscreen ? Math.floor(Math.random() * (415 - 0)) + 0 : Math.floor(Math.random() * (740 - 0)) + 0
    tubo2.children[0].style.height = random + "px"

    Number(score.innerHTML) == 11 ? (tubo2.children[2].style.backgroundImage = "url('assets/imgs/portal.gif')", tubo2.children[2].style.opacity = "100%") : null
    Number(score.innerHTML) == 41 ? (tubo2.children[2].style.backgroundImage = "url('assets/imgs/portal.gif')", tubo2.children[2].style.opacity = "100%", tubo2.children[2].style.backgroundSize = "auto 100%", tubo2.children[2].style.backgroundPosition = "center", tubo2.children[2].style.filter = "hue-rotate(194deg)") : null

    Number(score.innerHTML) >= 3 && Number(score.innerHTML) < 8 && Math.random() > 0.8 ? tubo2.children[0].classList.add("movingtubo") : null
    Number(score.innerHTML) >= 8 && Number(score.innerHTML) < 20 && Math.random() > 0.65 ? tubo2.children[0].classList.add("movingtubo") : null
    Number(score.innerHTML) >= 20 && Number(score.innerHTML) < 30 && Math.random() > 0.5 ? tubo2.children[0].classList.add("movingtubo") : null
    Number(score.innerHTML) >= 30 && Math.random() > 0.35 ? tubo2.children[0].classList.add("movingtubo") : null

    tubo2.children[0].classList.contains("movingtubo") ? moveTuboY(tubo2.children[0], random, random) : null

    tubo2.style.right = tuboposition + "px"
    Number(score.innerHTML) >= 20 && Number(score.innerHTML) < 50 && Math.random() > 0.5 ? !tubo2.children[0].classList.contains("movingtubo") ? moveTuboX(tubo2, tuboposition, tuboposition) : null : null
    Number(score.innerHTML) >= 50 && Math.random() > 0.25 ? tubo2.children[0].classList.contains("movingtubo") ? moveTuboX(tubo2, tuboposition, tuboposition) : null : null
    
    !fullscreen ? tuboposition -= 400 : tuboposition -= 533

    tubos.appendChild(tubo2)
}


document.addEventListener("keydown", (event) => {
    if (rising == false) {
        var name = event.key
        if (name == "ArrowUp" && dev == true) {
            Number(score.innerHTML) || score.innerHTML == "0" ? score.innerHTML = Number(score.innerHTML) + 1 : score.innerHTML = 0
        }
        if (name == "ArrowDown" && dev == true) {
            Number(score.innerHTML) || score.innerHTML == "0" ? score.innerHTML = Number(score.innerHTML) - 1 : score.innerHTML = 0
        }
        if (name == "f" && running == false) {
            !document.fullscreenElement ? (flappy.requestFullscreen(), fullscreenOn()) : (parent.indexfullscreen = false, document.exitFullscreen(), parent.reload())
        }
        if (name == " ") {
            running == false ? (running = true, play(), infotext.innerHTML = "") : null
            gameover == true ? parent.reload() : null
            rising = true
            gameover == false ? bird.style.transform = "rotate(-10deg)" : null
        }
        if (name == "a") {
            // elecwin.fullscreen = false
        }
    }
})


document.addEventListener("keyup", (event) => {
    var name = event.key
    if (name == " ") {
        rising = false
        gameover == false ? bird.style.transform = "rotate(10deg)" : null
    }
})

flappy.addEventListener("mousedown", (e) => {
    if (e.target != buttonFullscreen) {
    running == false ? (running = true, play(), infotext.innerHTML = "") : null
    gameover == true ? parent.reload() : null
    rising = true
    gameover == false ? bird.style.transform = "rotate(-10deg)" : null}
})

flappy.addEventListener("mouseup", (event) => {
    rising = false
    gameover == false ? bird.style.transform = "rotate(10deg)" : null
})


function funcDev() {}

if (dev) funcDev()
