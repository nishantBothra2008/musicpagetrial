var container = document.querySelector(".container"),
songName = container.querySelector(".song-details #song-name"),
songArtist = container.querySelector(".song-details #song-artist"),
songCover = container.querySelector(".song-cover img"),
songAudio = container.querySelector("#song-audio"),
playPauseBtn = container.querySelector(".play-pause"),
prevBtn = container.querySelector("#prev-song"),
nextBtn = container.querySelector("#next-song"),
progresBar = container.querySelector(".progress-bar"),
musicList = container.querySelector(".music-list"),
showListBtn = container.querySelector("#more-music"),
hidelistBtn = musicList.querySelector("#close-list");

var songIndex = 0;

window.addEventListener("load", () => {
    loadSongs(songIndex);
})

function loadSongs(indexNumb) {
    songName.innerText = allSongs[indexNumb].name;
    songArtist.innerText = allSongs[indexNumb].artist;
    songCover.src = allSongs[indexNumb].img;
    songAudio.src = allSongs[indexNumb].src;
}

function playSong() {
    container.classList.add("played");
    playPauseBtn.querySelector("i").innerText = "pause";
    songAudio.play();
}

function pauseSong() {
    container.classList.remove("played");
    playPauseBtn.querySelector("i").innerText = "play_arrow";
    songAudio.pause();
}

playPauseBtn.addEventListener('click', () => {
    var isSongPlayed = container.classList.contains("played");
    isSongPlayed ? pauseSong() : playSong();
})

function nextSong() {
    songIndex++;
    loadSongs(songIndex);
    playSong();
}

nextBtn.addEventListener('click', () => {
    nextSong();
})

function prevSong() {
    songIndex--;
    loadSongs(songIndex);
    playSong();
}

prevBtn.addEventListener('click', () => {
    prevSong();
})

songAudio.addEventListener('timeupdate', (e) => {
    var currentTime = e.target.currentTime;
    var duration = e.target.duration;
    let progressWidth = (currentTime / duration) * 100;
    progresBar.style.width = progressWidth + "%";

    let songCurrent = container.querySelector("#current"),
    songTotal = container.querySelector("#total");
    songAudio.addEventListener('loadeddata', () => {
        let audioDuration = songAudio.duration;
        let totalMins = Math.floor(audioDuration / 60);
        let totalSecs = Math.floor(audioDuration % 60);
        if(totalSecs < 10) {
            totalSecs = "0" + totalSecs;
        }
        songTotal.innerText = totalMins + ":" + totalSecs;
    })
    let audioCurrentTime = songAudio.currentTime;
    let totalMins = Math.floor(audioCurrentTime / 60);
    let totalSecs = Math.floor(audioCurrentTime % 60);
    if(totalSecs < 10) {
        totalSecs = "0" + totalSecs;
    }
    songCurrent.innerText = totalMins + ":" + totalSecs;

    if(currentTime == duration) {
        setTimeout(() => {
            nextSong();
        }, 1500);
    }
})

showListBtn.addEventListener('click', () => {
    musicList.classList.toggle("show");
})

hidelistBtn.addEventListener('click', () => {
    musicList.classList.remove("show");
})

let ulTag = container.querySelector("ul");

for (let i = 0; i < allSongs.length; i++) {
    let liTag = '<li> <div class="row"> <p class="s-name">' + allSongs[i].name + '</p> <p>' + allSongs[i].artist + '</p>';
    ulTag.insertAdjacentHTML('beforeend', liTag);
}



























