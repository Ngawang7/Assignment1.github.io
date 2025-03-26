// Array of songs with details
const songs = [
  {
    title: "Blinding Lights",
    artist: "The Weeknd",
    image: "https://upload.wikimedia.org/wikipedia/en/e/e6/The_Weeknd_-_Blinding_Lights.png",
    audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
  },
  {
    title: "Levitating",
    artist: "Dua Lipa",
    image: "https://i.scdn.co/image/ab67616d0000b2734bc66095f8a70bc4e6593f4f",
    audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
  },
  {
    title: "Peaches",
    artist: "Justin Bieber",
    image: "https://www.billboard.com/wp-content/uploads/2021/03/Justin-Bieber-Peaches-Video-Still-billboard-1548-1617046229.jpg",
    audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
  },
  {
    title: "Stay",
    artist: "The Kid LAROI & Justin Bieber",
    image: "https://i.scdn.co/image/ab67616d0000b27341e31d6ea1d493dd77933ee5",
    audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3",
  },
  {
    title: "Drivers License",
    artist: "Olivia Rodrigo",
    image: "https://upload.wikimedia.org/wikipedia/en/0/09/Drivers_License_by_Olivia_Rodrigo.png",
    audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3",
  },
  {
    title: "Save Your Tears",
    artist: "The Weeknd",
    image: "https://i.scdn.co/image/ab67616d00001e028863bc11d2aa12b54f5aeb36",
    audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3",
  },
  {
    title: "Good 4 U",
    artist: "Olivia Rodrigo",
    image: "https://upload.wikimedia.org/wikipedia/en/thumb/3/3e/Olivia_Rodrigo_-_Good_4_U.png/220px-Olivia_Rodrigo_-_Good_4_U.png",
    audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3",
  },
  {
    title: "Montero (Call Me By Your Name)",
    artist: "Lil Nas X",
    image: "https://i.ytimg.com/vi/NIlz3g3DgCU/maxresdefault.jpg",
    audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3",
  },
  {
    title: "Kiss Me More",
    artist: "Doja Cat ft. SZA",
    image: "https://headlineplanet.com/home/wp-content/uploads/2021/04/Doja-Cat-SZA-Kiss-Me-More-2.jpg",
    audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3",
  },
  {
    title: "Butter",
    artist: "BTS",
    image: "https://wjla.com/resources/media/71535995-0d86-4657-9757-3493a15c3ee5-AP21141231974090.jpg",
    audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-10.mp3",
  },
];

let currentlyPlayingAudio = null;
let currentSongIndex = 0;

// DOM Elements
const playPauseButton = document.getElementById("play-pause");
const nextButton = document.querySelector(".fa-forward");
const prevButton = document.querySelector(".fa-backward");
const volumeSlider = document.getElementById("volume-slider");
const songTitle = document.querySelector(".song-info h4");
const artistName = document.querySelector(".song-info p");
const albumArt = document.querySelector(".song-info img");

// Navigation Logic
const homeLink = document.getElementById("home");
const libraryLink = document.getElementById("library");

if (homeLink) {
  homeLink.addEventListener("click", () => {
    window.location.href = "index.html";
  });
}

if (libraryLink) {
  libraryLink.addEventListener("click", () => {
    window.location.href = "library.html";
  });
}

// Function to generate song cards
function generateSongCards() {
  const cardsContainer = document.querySelector(".cards");
  if (!cardsContainer) return;

  songs.forEach((song, index) => {
    const card = document.createElement("div");
    card.classList.add("card");

    const image = document.createElement("img");
    image.src = song.image;
    image.alt = song.title;

    const title = document.createElement("h4");
    title.textContent = song.title;

    const artist = document.createElement("p");
    artist.textContent = song.artist;

    const playButton = document.createElement("div");
    playButton.classList.add("play-button");
    playButton.innerHTML = '<i class="fas fa-play"></i>';

    const optionsButton = document.createElement("div");
    optionsButton.classList.add("options-button");
    optionsButton.innerHTML = '<i class="fas fa-ellipsis-v"></i>';

    const optionsDropdown = document.createElement("div");
    optionsDropdown.classList.add("options-dropdown");

    const likeOption = document.createElement("div");
    likeOption.classList.add("option");
    likeOption.id = "like";
    likeOption.textContent = "Like";

    const commentOption = document.createElement("div");
    commentOption.classList.add("option");
    commentOption.id = "comment";
    commentOption.textContent = "Comment";

    const shareOption = document.createElement("div");
    shareOption.classList.add("option");
    shareOption.id = "share";
    shareOption.textContent = "Share";

    const songInfoOption = document.createElement("div");
    songInfoOption.classList.add("option");
    songInfoOption.id = "song-info";
    songInfoOption.textContent = "Song Info";

    optionsDropdown.appendChild(likeOption);
    optionsDropdown.appendChild(commentOption);
    optionsDropdown.appendChild(shareOption);
    optionsDropdown.appendChild(songInfoOption);
    optionsButton.appendChild(optionsDropdown);

    card.appendChild(image);
    card.appendChild(title);
    card.appendChild(artist);
    card.appendChild(playButton);
    card.appendChild(optionsButton);

    cardsContainer.appendChild(card);

    // Play/Pause functionality for hover play button
    playButton.addEventListener("click", (e) => {
      e.stopPropagation(); // Prevent event bubbling
      if (currentlyPlayingAudio && currentlyPlayingAudio.src === song.audio) {
        togglePlayPause();
      } else {
        playSong(index);
      }
    });

    // Like functionality
    likeOption.addEventListener("click", (e) => {
      e.stopPropagation();
      addToLibrary(song);
    });

    // Comment functionality
    commentOption.addEventListener("click", (e) => {
      e.stopPropagation();
      alert("Comment functionality coming soon!");
    });

    // Share functionality
    shareOption.addEventListener("click", (e) => {
      e.stopPropagation();
      alert("Share functionality coming soon!");
    });

    // Song Info functionality
    songInfoOption.addEventListener("click", (e) => {
      e.stopPropagation();
      alert(`Song Info:\nTitle: ${song.title}\nArtist: ${song.artist}`);
    });
  });
}

// Function to add a song to the library
function addToLibrary(song) {
  let library = JSON.parse(localStorage.getItem("library")) || [];
  if (!library.some((s) => s.title === song.title)) {
    library.push(song);
    localStorage.setItem("library", JSON.stringify(library));
    alert(`${song.title} added to Your Library!`);
  } else {
    alert(`${song.title} is already in Your Library!`);
  }
}

// Function to play a song
function playSong(index) {
  if (currentlyPlayingAudio) {
    currentlyPlayingAudio.pause();
    // Reset all play buttons to "play" icon
    document.querySelectorAll(".play-button").forEach((button) => {
      button.innerHTML = '<i class="fas fa-play"></i>';
    });
  }

  currentSongIndex = index;
  const song = songs[index];
  currentlyPlayingAudio = new Audio(song.audio);

  // Update player UI
  songTitle.textContent = song.title;
  artistName.textContent = song.artist;
  albumArt.src = song.image;

  // Play the song
  currentlyPlayingAudio.play();
  updatePlayPauseButtons(true); // Update buttons to show "pause"

  // Update event listeners
  currentlyPlayingAudio.addEventListener("ended", playNextSong);
}

// Function to toggle play/pause
function togglePlayPause() {
  if (currentlyPlayingAudio) {
    if (currentlyPlayingAudio.paused) {
      currentlyPlayingAudio.play();
      updatePlayPauseButtons(true); // Update buttons to show "pause"
    } else {
      currentlyPlayingAudio.pause();
      updatePlayPauseButtons(false); // Update buttons to show "play"
    }
  }
}

// Function to update play/pause buttons
function updatePlayPauseButtons(isPlaying) {
  // Update main player play/pause button
  if (isPlaying) {
    playPauseButton.classList.remove("fa-play");
    playPauseButton.classList.add("fa-pause");
  } else {
    playPauseButton.classList.remove("fa-pause");
    playPauseButton.classList.add("fa-play");
  }

  // Update hover play button for the currently playing song
  const playButton = document.querySelectorAll(".play-button")[currentSongIndex];
  if (playButton) {
    playButton.innerHTML = isPlaying
      ? '<i class="fas fa-pause"></i>'
      : '<i class="fas fa-play"></i>';
  }
}

// Function to play the next song
function playNextSong() {
  currentSongIndex = (currentSongIndex + 1) % songs.length;
  playSong(currentSongIndex);
}

// Function to play the previous song
function playPrevSong() {
  currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
  playSong(currentSongIndex);
}

// Event listeners for player controls
playPauseButton.addEventListener("click", togglePlayPause);
nextButton.addEventListener("click", playNextSong);
prevButton.addEventListener("click", playPrevSong);

// Volume control
volumeSlider.addEventListener("input", () => {
  if (currentlyPlayingAudio) {
    currentlyPlayingAudio.volume = volumeSlider.value / 100;
  }
});

// Generate song cards on page load
generateSongCards();