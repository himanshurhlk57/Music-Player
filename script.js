 const musicContainer = document.querySelector(".music-container");
 const playBtn = document.querySelector("#play");
 const prevBtn = document.querySelector("#prev");
 const nextBtn = document.querySelector("#next");
 const audio = document.querySelector("#audio");
 const progress = document.querySelector(".progress");
 const progressContainer = document.querySelector(".progress-container");
 const title = document.querySelector("#title");
 const cover = document.querySelector("#cover");
 
// Song title in img folder

const songs = ['feel something', 'Mehrama', 'Tightrope'];

// keep the track of the songs available

let songIndex = 1;

// Loading song in the DOM intitally
loadSong(songs[songIndex])

//update song details
function loadSong(songs){
    title.innerText = songs
    audio.src = `music/${songs}.mp3`
    cover.src = `images/${songs}.jpg`
}

function playSong(){
    //adding class of play to music container
    musicContainer.classList.add('play')
    // we want to change the icon remove playicon to pause icon img because it is playing
    playBtn.querySelector('i.fas').classList.remove('fa-play')
    playBtn.querySelector('i.fas').classList.add('fa-pause')

audio.play()

}

function pauseSong(){
musicContainer.classList.remove('play')
playBtn.querySelector('i.fas').classList.add('fa-play')
playBtn.querySelector('i.fas').classList.remove('fa-pause')

audio.pause()
}

// function for previous and next song

function prevSong(){
    songIndex--
    if(songIndex<0){
        songIndex = songs.length-1; //to last song
    }
    loadSong(songs[songIndex])
    playSong()
}

function nextSong(){
    songIndex++
    if(songIndex>songs.length-1){ //we are at the end then we want to set the song index to 0(first song)
        songIndex = 0;
    }
    loadSong(songs[songIndex])
    playSong()
}

function upadateProgress(e){
    const { duration, currentTime } = e.srcElement
    const progressPercent = (currentTime / duration) * 100
    progress.style.width = `${progressPercent}%`

}

function setProgress(e){
    const width = this.clientWidth
    const clickX = e.offsetX
    const duration = audio.duration

    audio.currentTime = (clickX / width) * duration
}

// Event Listeners
 playBtn.addEventListener('click', () =>{
     // Lets see if a song is playing or not then will decide to play or pause
     const isPlaying = musicContainer.classList.contains('play') // then we know its playing
     // if it is playing then we want to pause the song else play the song
     if(isPlaying){
         pauseSong()
     }else{
         playSong()
     }
 })

 // Adding eventlistener to previous and next button
 //change song event
 prevBtn.addEventListener('click', prevSong)
 nextBtn.addEventListener('click', nextSong)


 audio.addEventListener('timeupdate', upadateProgress)

 progressContainer.addEventListener('click', setProgress)


 audio.addEventListener('ended', nextSong)