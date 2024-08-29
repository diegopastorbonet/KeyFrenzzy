document.addEventListener('DOMContentLoaded', () => {
  const app = document.getElementById('app');
  const currentWordDisplay = document.getElementById('currentWord');
  const userInput = document.getElementById('userInput');
  const startGameBtn = document.getElementById('startGameBtn');
  const toggleTimerBtn = document.getElementById('toggleTimerBtn');
  const toggleThemeBtn = document.getElementById('toggleThemeBtn');
  const timeLeftDisplay = document.getElementById('timeLeft');
  const completedWordsDisplay = document.getElementById('completedWords');
  const gameOverMessage = document.getElementById('gameOverMessage');
  const gameContainer = document.getElementById('gameContainer');
  const startContainer = document.getElementById('startContainer');

  let words = [];
  let currentWordIndex = 0;
  let completedWords = 0;
  let timeLeft = 60;
  let isGameActive = false;
  let isTimerActive = true;
  let isDarkMode = false;
  let timer;

  function generateRandomWord(length) {
      const characters = 'abcdefghijklmnopqrstuvwxyz';
      return Array.from({ length }, () => characters[Math.floor(Math.random() * characters.length)]).join('');
  }

  function generateWords() {
      words = Array.from({ length: 50 }, () => generateRandomWord(Math.floor(Math.random() * 6) + 3));
  }

  function updateTimer() {
      if (isGameActive && isTimerActive && timeLeft > 0) {
          timeLeft--;
          timeLeftDisplay.textContent = `${timeLeft}s`;
      } else if (timeLeft === 0 && isTimerActive) {
          isGameActive = false;
          clearInterval(timer);
          endGame();
      }
  }

  function handleInputChange() {
      if (isGameActive && userInput.value === words[currentWordIndex]) {
          userInput.value = '';
          currentWordIndex++;
          completedWords++;
          completedWordsDisplay.textContent = completedWords;
          currentWordDisplay.textContent = words[currentWordIndex];
      }
  }

  function startGame() {
      isGameActive = true;
      timeLeft = 60;
      completedWords = 0;
      currentWordIndex = 0;
      userInput.value = '';
      generateWords();
      currentWordDisplay.textContent = words[currentWordIndex];
      timeLeftDisplay.textContent = `${timeLeft}s`;
      completedWordsDisplay.textContent = completedWords;
      startContainer.style.display = 'none';
      gameContainer.style.display = 'block';
      timer = setInterval(updateTimer, 1000);
  }

  function endGame() {
      gameOverMessage.textContent = `¡Juego terminado! Palabras completadas: ${completedWords}`;
      startGameBtn.textContent = 'Jugar de nuevo';
      startContainer.style.display = 'block';
      gameContainer.style.display = 'none';
  }

  function toggleTimer() {
      isTimerActive = !isTimerActive;
      toggleTimerBtn.textContent = isTimerActive ? '⏱️' : '⏰';
  }

  function toggleTheme() {
      isDarkMode = !isDarkMode;
      if (isDarkMode) {
          document.body.classList.add('dark-mode');
          toggleThemeBtn.textContent = '🌞';
      } else {
          document.body.classList.remove('dark-mode');
          toggleThemeBtn.textContent = '🌙';
      }
  }

  toggleTimerBtn.textContent = '⏱️';
  toggleThemeBtn.textContent = '🌙';

  userInput.addEventListener('input', handleInputChange);
  startGameBtn.addEventListener('click', startGame);
  toggleTimerBtn.addEventListener('click', toggleTimer);
  toggleThemeBtn.addEventListener('click', toggleTheme);
});
