const audioPlayer = document.getElementById('audioPlayer');
const playlist = document.querySelector('.playlist');
const fileInput = document.getElementById('fileInput');
const playPauseButton = document.getElementById('playPauseButton');
const backButton = document.getElementById('backButton');
const nextButton = document.getElementById('nextButton');
const repeatButton = document.getElementById('repeatButton'); 

let currentSongIndex = 0;
let isPlaying = false;
let isRepeat = false;
let songList = [];

fileInput.addEventListener('change', handleFiles);

function handleFiles(event) {
    const files = event.target.files;
    for (let i = 0; i < files.length; i++) {
        const file = files[i];
        songList.push(file);
        const listItem = document.createElement('li');
        listItem.textContent = file.name;
        listItem.addEventListener('click', () => selectSong(i));
        playlist.appendChild(listItem);
    }
}

function selectSong(index) {
    currentSongIndex = index;
    playSong();
}

function playSong() {
    const song = songList[currentSongIndex];
    const songUrl = URL.createObjectURL(song);
    audioPlayer.src = songUrl;
    audioPlayer.play();
    isPlaying = true;
    updatePlaylistHighlight();
}

function togglePlay() {
    if (isPlaying) {
        audioPlayer.pause();
        isPlaying = false;
    } else {
        audioPlayer.play();
        isPlaying = true;
    }
}

function nextSong() {
    currentSongIndex = (currentSongIndex + 1) % songList.length;
    playSong();
}

function previousSong() {
    currentSongIndex = (currentSongIndex - 1 + songList.length) % songList.length;
    playSong();
}

function toggleRepeat() {
    isRepeat = !isRepeat;
    audioPlayer.loop = isRepeat;
    repeatButton.classList.toggle('active', isRepeat); 
}


function updatePlaylistHighlight() {
    const playlistItems = playlist.querySelectorAll('li');
    playlistItems.forEach((item, index) => {
        if (index === currentSongIndex) {
            item.classList.add('playing');
        } else {
            item.classList.remove('playing');
        }
    });
}

audioPlayer.addEventListener('ended', () => {
    if (isRepeat) {
        playSong();
    } else {
        nextSong();
    }
});


playPauseButton.addEventListener('click', togglePlay);
backButton.addEventListener('click', previousSong);
nextButton.addEventListener('click', nextSong);
repeatButton.addEventListener('click', toggleRepeat);
