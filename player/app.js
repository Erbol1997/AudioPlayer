let allMusic = [
  {
    name: '2',
    artist: '2-song',
    src: './songs_song2.mp3',
  },
  {
    name: 'Доча',
    artist: 'Jah Khalib',
    src: 'https://dl3ca1.muzofond.fm/aHR0cDovL2YubXAzcG9pc2submV0L21wMy8wMDUvMDA0LzAzOC81MDA0MDM4Lm1wMw==',
  },
  {
    name: 'Вредина (Mbts Remix)',
    artist: 'Bakr',
    src: 'https://dl3ca1.muzofond.fm/aHR0cDovL2YubXAzcG9pc2submV0L21wMy8wMDQvOTkxLzIzMC80OTkxMjMwLm1wMw==',
  },
  {
    name: '3',
    artist: '3-song',
    src: 'https://dl3s2.muzofond.fm/aHR0cDovL2YubXAzcG9pc2submV0L21wMy8wMDUvMDEyLzM3Ny81MDEyMzc3Lm1wMw==',
  },
  {
    name: '4',
    artist: '4-song',
    src: 'https://dl3s2.muzofond.fm/aHR0cDovL2YubXAzcG9pc2submV0L21wMy8wMDUvMDI5LzEwMy81MDI5MTAzLm1wMw==',
  },
  {
    name: '1',
    artist: '1-song',
    src: './songs_song1.mp3',
  },
];

const wrapper = document.querySelector('.wrapper'),
  musicName = document.querySelector('.song-details .name'),
  musicArtist = document.querySelector('.song-details .artist'),
  playBtn = document.querySelector('.play-pause'),
  prevBtn = document.querySelector('#prev'),
  nextBtn = document.querySelector('#next'),
  audio = document.querySelector('#main-audio'),
  progressContainer = document.querySelector('.progress-area'),
  progress = document.querySelector('.progress-bar'),
  repeatBtn = document.querySelector('#repeat-plist');
let musicCurrentTime = wrapper.querySelector('.current-time'),
  musicDuration = wrapper.querySelector('.duration');

let songIndex = 1;

function loadSong(song) {
  musicName.innerText = allMusic[song - 1].name;
  musicArtist.innerText = allMusic[song - 1].artist;
  audio.src = allMusic[song - 1].src;
}

loadSong(songIndex);

function playSong() {
  wrapper.classList.add('play');
  playBtn.querySelector('i').innerText = 'pause';
  audio.play();
}

function pauseSong() {
  wrapper.classList.remove('play');
  playBtn.querySelector('i').innerText = 'play_arrow';
  audio.pause();
}

playBtn.addEventListener('click', () => {
  const isPlaying = wrapper.classList.contains('play');
  if (isPlaying) {
    pauseSong();
  } else {
    playSong();
  }
});

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function nextSong() {
  songIndex++;

  if (songIndex > allMusic.length) {
    songIndex = 1;
  }

  loadSong(songIndex);
  document.querySelector('body').style.backgroundColor =
    'rgb(' + getRandomInt(0, 255) + ' ' + getRandomInt(0, 255) + ' ' + getRandomInt(0, 255) + ')';
  playSong();
}

nextBtn.addEventListener('click', nextSong);

function prevSong() {
  songIndex--;

  if (songIndex < 0) {
    songIndex = allMusic.length;
  }

  loadSong(songIndex);
  document.querySelector('body').style.backgroundColor =
    'rgb(' + getRandomInt(0, 255) + ', ' + getRandomInt(0, 255) + ', ' + getRandomInt(0, 255) + ')';
  playSong();
}

prevBtn.addEventListener('click', prevSong);

function updateProgress(e) {
  const { duration, currentTime } = e.srcElement;
  const progressPrecent = (currentTime / duration) * 100;
  progress.style.width = `${progressPrecent}%`;

  audio.addEventListener('loadeddata', () => {
    const audioDuration = audio.duration;
    let totalMin = Math.floor(audioDuration / 60);
    let totalSec = Math.floor(audioDuration % 60);

    if (totalSec < 10) {
      totalSec = `0${totalSec}`;
    }

    musicDuration.innerText = `${totalMin}:${totalSec}`;
  });

  let currentMin = Math.floor(currentTime / 60);
  let currentSec = Math.floor(currentTime % 60);

  if (currentSec < 10) {
    currentSec = `0${currentSec}`;
  }

  musicCurrentTime.innerText = `${currentMin}:${currentSec}`;
}

audio.addEventListener('timeupdate', updateProgress);

function setProgress(e) {
  const width = this.clientWidth;
  const clickX = e.offsetX;
  const duration = audio.duration;

  audio.currentTime = (clickX / width) * duration;
}

progressContainer.addEventListener('click', setProgress);

repeatBtn.addEventListener('click', () => {
  let getText = repeatBtn.innerText;

  switch (getText) {
    case 'repeat':
      repeatBtn.innerText = 'repeat_one';
      repeatBtn.setAttribute('title', 'Song looped');
      break;
    case 'repeat_one':
      repeatBtn.innerText = 'shuffle';
      repeatBtn.setAttribute('title', 'Playback shuffle');
      break;
    case 'shuffle':
      repeatBtn.innerText = 'repeat';
      repeatBtn.setAttribute('title', 'Playlist looped');
      break;
  }
});

audio.addEventListener('ended', () => {
  let getText = repeatBtn.innerText;

  switch (getText) {
    case 'repeat':
      nextSong();
      break;
    case 'repeat_one':
      audio.currentTime = 0;
      loadSong(songIndex);
      playSong();
      break;
    case 'shuffle':
      let randomIndex = Math.floor(Math.random() * allMusic.length + 1);
      do {
        randomIndex = Math.floor(Math.random() * allMusic.length + 1);
      } while (songIndex == randomIndex);
      {
        songIndex = randomIndex;
        loadSong(songIndex);
        playSong();
      }
      break;
  }
});
