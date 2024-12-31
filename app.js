let play = document.getElementById("play")
let next = document.getElementById("next")
let prev = document.getElementById("prev")
let playhead = document.getElementById("playhead")
let seekbar = document.getElementById("seekbar")
let track = document.getElementById("music")
let art = document.getElementById("art")
let title = document.getElementById("title")
let artist = document.getElementById("artist")
let duration = document.getElementById("duration")
let time_elapsed = document.getElementById("time-elapsed")
let time_left = document.getElementById("time-left")
let shuffle = document.getElementById("shuffle")
var playing = false
var shuffled = false
let vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0)
let default_len = 9

let folder = "christmas-music"
let shuffle_index = 0
const fetchData = async (pathToFile) => {
    const response = await fetch(pathToFile);
    const text = await response.text();
    arr = text.split('\n');
};

async function loadFiles(){
    await fetchData('./data/filenames.txt')
    music = [...arr].slice(0,-1)
    shuffle_array = [...Array(music.length).keys()]
    await fetchData('./data/titles.txt')
    titles = [...arr].slice(0,-1)
    await fetchData('./data/artists.txt')
    artists = [...arr].slice(0,-1)
    await fetchData('./data/images.txt')
    images = [...arr].join()

    track.src = `./${folder}/${music[shuffle_array[shuffle_index]]}`
    title.innerHTML = titles[shuffle_array[shuffle_index]]
    artist.innerHTML = artists[shuffle_array[shuffle_index]]
    if (images[shuffle_array[shuffle_index]] == '1'){
        art.src = `./data/images/${music[shuffle_array[shuffle_index]].slice(0,-5)}.jpg`
    } else if (images[shuffle_array[shuffle_index]] == '2'){
        art.src = `./data/images/${music[shuffle_array[shuffle_index]].slice(0,-5)}.png`
    } else {
        art.src = `./data/images/default/${Math.floor(Math.random() * default_len + 1)}.png`
    }
}

loadFiles()

playClick = function(){
    if (!playing) {
        track.play()
        play.src = "./icons/pause.png"
        playhead.style.animationPlayState = "running"
        playhead.style.animationDuration = `${track.duration}s`
    } else {
        track.pause()
        play.src = "./icons/play.png"
        playhead.style.animationPlayState = "paused"
    }
    playing = !playing
}
play.onclick = playClick;

nextClick = function(){
    shuffle_index += 1
    shuffle_index = shuffle_index % music.length
    track.src = `./${folder}/${music[shuffle_array[shuffle_index]]}`
    title.innerHTML = titles[shuffle_array[shuffle_index]]
    artist.innerHTML = artists[shuffle_array[shuffle_index]]
    if (images[shuffle_array[shuffle_index]] == '1'){
        art.src = `./data/images/${music[shuffle_array[shuffle_index]].slice(0,-5)}.jpg`
    } else if (images[shuffle_array[shuffle_index]] == '2'){
        art.src = `./data/images/${music[shuffle_array[shuffle_index]].slice(0,-5)}.png`
    } else {
        art.src = `./data/images/default/${Math.floor(Math.random() * default_len + 1)}.png`
    }

    document.getAnimations().forEach((animation) => {
        animation.currentTime = 0;
    });

    if (playing) {
        track.play()
    }    
}
next.onclick = function(){
    nextClick();
}

prevClick = function(){
    if (track.currentTime >= 10) {
        track.currentTime = 0
    } else {
        shuffle_index -= 1
        let remain = shuffle_index % music.length
        shuffle_index = Math.floor(remain >= 0 ? remain : remain + music.length);
        track.src = `./${folder}/${music[shuffle_array[shuffle_index]]}`
        title.innerHTML = titles[shuffle_array[shuffle_index]]
        artist.innerHTML = artists[shuffle_array[shuffle_index]]
        if (images[shuffle_array[shuffle_index]] == '1'){
            art.src = `./data/images/${music[shuffle_array[shuffle_index]].slice(0,-5)}.jpg`
        } else if (images[shuffle_array[shuffle_index]] == '2'){
            art.src = `./data/images/${music[shuffle_array[shuffle_index]].slice(0,-5)}.png`
        } else {
            art.src = `./data/images/default/${Math.floor(Math.random() * default_len + 1)}.png`
        }
    }

    document.getAnimations().forEach((animation) => {
        animation.currentTime = 0;
    });
      
    if (playing) {
        track.play()
    }
}
prev.onclick = prevClick;

shuffleClick = function(){
    if (!shuffled) {
        shuffle_array = [...Array(music.length).keys()]
          
        for (let start = 0; start < music.length; start++) {
            const randomPosition = Math.floor((music.length - start) * Math.random())
            const randomItem = shuffle_array.splice(randomPosition, 1)
          
            shuffle_array.push(...randomItem)
        }
        current_index = shuffle_array.indexOf(shuffle_index);
        [shuffle_array[current_index], shuffle_array[shuffle_index]] = [shuffle_array[shuffle_index], shuffle_array[current_index]];

        shuffle.src = "./icons/shuffle_white.png"
    } else {
        shuffle_index = shuffle_array[shuffle_index]
        shuffle_array = [...Array(music.length).keys()]
        shuffle.src = "./icons/shuffle.png"
    }
    shuffled = !shuffled
}
shuffle.onclick = shuffleClick;

function seekbarClick(e) {
    var xPos = e.offsetX;
    var value = (xPos*1000*track.duration)/(0.8*vw*0.97)
    if (isNaN(value) || !isFinite(value)) {
        value = 0
    }
    document.getAnimations().forEach((animation) => {
        animation.currentTime = value;
    });
    track.currentTime = value/1000
}
seekbar.onclick = seekbarClick,playClick,playClick;

function updateTrack(){
    playhead.style.animationDuration = `${track.duration}s`
    let minutes = Math.floor(track.duration/60)
    let seconds = Math.floor(track.duration%60)
    if (seconds < 10){
        duration.innerHTML = `${minutes}:0${seconds}`
    } else {
        duration.innerHTML = `${minutes}:${seconds}`
    }
}

function updateTime(){
    let minutes = Math.floor(track.currentTime/60)
    let seconds = Math.floor(track.currentTime%60)
    if (seconds < 10){
        time_elapsed.innerHTML = `${minutes}:0${seconds}`
    } else {
        time_elapsed.innerHTML = `${minutes}:${seconds}`
    }

    let minutesn = Math.floor((track.duration-track.currentTime)/60)
    let secondsn = Math.floor((track.duration-track.currentTime)%60)
    if (secondsn < 10){
        time_left.innerHTML = `-${minutesn}:0${secondsn}`
    } else {
        time_left.innerHTML = `-${minutesn}:${secondsn}`
    }
    if (isNaN(secondsn)){
        time_left.innerHTML = "-0:00"
    }
}

track.addEventListener("ended", nextClick, false);
track.addEventListener("durationchange", updateTrack, false);
track.addEventListener("timeupdate", updateTime, false);


let snowflakes = [];

let browserWidth;
let browserHeight;

let numberOfSnowflakes = 50;

let resetPosition = false;

class Snowflake {
    constructor(element, speed, xPos, yPos) {
        this.element = element;
        this.speed = speed;
        this.xPos = xPos;
        this.yPos = yPos;
        this.scale = 1;

        this.counter = 0;
        this.sign = Math.random() < 0.5 ? 1 : -1;

        this.element.style.opacity = (0.1 + Math.random()) / 2;
    }

    update(delta) {
        this.counter += (this.speed / 5000) * delta;
        this.xPos += (this.sign * delta * this.speed * Math.cos(this.counter)) / 40;
        this.yPos += Math.sin(this.counter) / 40 + (this.speed * delta) / 30;
        this.scale = 0.5 + Math.abs((10 * Math.cos(this.counter)) / 20);

        setTransform(
            Math.round(this.xPos),
            Math.round(this.yPos),
            this.scale,
            this.element
        );

        if (this.yPos > browserHeight) {
            this.yPos = -50;
        }
    }
}

function setTransform(xPos, yPos, scale, el) {
    el.style.transform = `translate3d(${xPos}px, ${yPos}px, 0) scale(${scale}, ${scale})`;
}

function generateSnowflakes() {
    let originalSnowflake = document.querySelector(".snowflake");

    let snowflakeContainer = originalSnowflake.parentNode;
    snowflakeContainer.style.display = "block";

    browserWidth = document.documentElement.clientWidth;
    browserHeight = document.documentElement.clientHeight;

    for (let i = 0; i < numberOfSnowflakes; i++) {
        let snowflakeClone = originalSnowflake.cloneNode(true);
        snowflakeContainer.appendChild(snowflakeClone);

        let initialXPos = getPosition(50, browserWidth);
        let initialYPos = getPosition(50, browserHeight);
        let speed = (5 + Math.random() * 40) * delta;

        let snowflakeObject = new Snowflake(
            snowflakeClone,
            speed,
            initialXPos,
            initialYPos
        );
        snowflakes.push(snowflakeObject);
    }

    snowflakeContainer.removeChild(originalSnowflake);

    requestAnimationFrame(moveSnowflakes);
}

let frames_per_second = 60;
let frame_interval = 1000 / frames_per_second;

let previousTime = performance.now();
let delta = 1;

function moveSnowflakes(currentTime) {
    delta = (currentTime - previousTime) / frame_interval;

    for (let i = 0; i < snowflakes.length; i++) {
        let snowflake = snowflakes[i];
        snowflake.update(delta);
    }

    previousTime = currentTime;

    if (resetPosition) {
        browserWidth = document.documentElement.clientWidth;
        browserHeight = document.documentElement.clientHeight;

        for (let i = 0; i < snowflakes.length; i++) {
            let snowflake = snowflakes[i];

            snowflake.xPos = getPosition(50, browserWidth);
            snowflake.yPos = getPosition(50, browserHeight);
        }

        resetPosition = false;
    }

    requestAnimationFrame(moveSnowflakes);
}

function getPosition(offset, size) {
    return Math.round(-1 * offset + Math.random() * (size + 2 * offset));
}

function setResetFlag(e) {
    resetPosition = true;
}

window.addEventListener("DOMContentLoaded", generateSnowflakes, false);
window.addEventListener("resize", setResetFlag, false);