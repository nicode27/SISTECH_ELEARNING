document.addEventListener('DOMContentLoaded', function() {
    // Game State Variables
    let gameBoard = ['', '', '', '', '', '', '', '', ''];
    let currentPlayer = 'X';
    let gameActive = true;
    let scoreX = 0;
    let scoreO = 0;
    let selectedAnswer = null;

    // Questions Database
    const questions = {
        membaca: [{
            question: "Bacalah teks berikut: 'Kucing adalah hewan yang sangat lincah dan pandai memanjat pohon.' Kata 'lincah' memiliki arti yang sama dengan...",
            options: ["Lambat", "Gesit", "Malas", "Besar"],
            correct: 1
        }, {
            question: "Dalam kalimat 'Adik membaca buku cerita dengan suara yang keras', kata 'keras' berfungsi sebagai...",
            options: ["Kata benda", "Kata kerja", "Kata sifat", "Kata keterangan"],
            correct: 3
        }, {
            question: "Ide pokok dari paragraf biasanya terdapat pada...",
            options: ["Kalimat pertama", "Kalimat kedua", "Kalimat terakhir", "Kalimat pertama atau terakhir"],
            correct: 3
        }],
        numerasi: [{
            question: "Jika 5 + 3 = 8, maka 8 - 3 = ?",
            options: ["3", "5", "8", "11"],
            correct: 1
        }, {
            question: "Sebuah kotak berisi 24 permen. Jika permen dibagi sama rata kepada 6 anak, berapa permen yang diterima setiap anak?",
            options: ["3", "4", "5", "6"],
            correct: 1
        }, {
            question: "Pola bilangan berikut: 2, 4, 6, 8, ... Bilangan selanjutnya adalah?",
            options: ["9", "10", "11", "12"],
            correct: 1
        }],
        sains: [{
            question: "Proses perubahan air menjadi uap air disebut...",
            options: ["Kondensasi", "Evaporasi", "Presipitasi", "Sublimasi"],
            correct: 1
        }, {
            question: "Tumbuhan membuat makanan sendiri melalui proses...",
            options: ["Respirasi", "Fotosintesis", "Transpirasi", "Fermentasi"],
            correct: 1
        }, {
            question: "Hewan yang termasuk mamalia adalah...",
            options: ["Ayam", "Ikan", "Kucing", "Katak"],
            correct: 2
        }]
    };

    // Winning Combinations
    const winningCombinations = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6] // Diagonals
    ];

    // Make functions accessible from HTML onclick attributes
    window.resetGame = resetGame;
    window.showQuestion = showQuestion;
    window.checkAnswer = checkAnswer;
    window.scrollToGame = scrollToGame;

    initializeGame();

    function initializeGame() {
        const cells = document.querySelectorAll('.cell');
        cells.forEach((cell, index) => {
            cell.addEventListener('click', () => handleCellClick(index));
        });

        const toggleBtn = document.getElementById('toggleTips');
        const sidebar = document.getElementById('tipsSidebar');
        if (toggleBtn) {
            toggleBtn.addEventListener('click', () => {
                sidebar.classList.toggle('hidden');
            });
        }
        
        updateScoreDisplay();
        updateCurrentPlayerDisplay();
        updateGameStatus("🎮 Selamat datang di Tic-Tac-Toe Literasi! Klik pada kotak untuk memulai permainan.");
    }

    function handleCellClick(index) {
        if (gameBoard[index] !== '' || !gameActive) {
            return;
        }

        gameBoard[index] = currentPlayer;
        updateDisplay();

        if (checkWin()) {
            handleWin();
        } else if (checkDraw()) {
            handleDraw();
        } else {
            switchPlayer();
            updateCurrentPlayerDisplay();
        }
    }

    function updateDisplay() {
        const cells = document.querySelectorAll('.cell');
        cells.forEach((cell, index) => {
            cell.textContent = gameBoard[index];
            cell.className = 'cell';
            if (gameBoard[index] === 'X') {
                cell.classList.add('x');
            } else if (gameBoard[index] === 'O') {
                cell.classList.add('o');
            }
        });
    }

    function switchPlayer() {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    }

    function checkWin() {
        return winningCombinations.some(combination => {
            const [a, b, c] = combination;
            if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
                highlightWinningCells(combination);
                return true;
            }
            return false;
        });
    }

    function highlightWinningCells(combination) {
        const cells = document.querySelectorAll('.cell');
        combination.forEach(index => {
            cells[index].classList.add('winning-cell');
        });
    }

    function checkDraw() {
        return gameBoard.every(cell => cell !== '');
    }

    function handleWin() {
        gameActive = false;
        if (currentPlayer === 'X') {
            scoreX++;
        } else {
            scoreO++;
        }
        updateScoreDisplay();
        updateGameStatus(`🎉 Pemain ${currentPlayer} menang! Selamat!`);

        setTimeout(() => {
            showCelebration();
        }, 1000);
    }

    function handleDraw() {
        gameActive = false;
        updateGameStatus("🤝 Permainan berakhir seri!");
    }

    function showCelebration() {
        const status = document.getElementById('gameStatus');
        status.innerHTML = `
            <div style="font-size: 1.5rem; margin-bottom: 10px;">🏆 Pemain ${currentPlayer} Menang! 🏆</div>
            <div>Jawab soal literasi untuk mendapatkan bonus poin!</div>
        `;
        showQuestion();
    }

    function updateScoreDisplay() {
        const scoreXEl = document.getElementById('scoreX');
        const scoreOEl = document.getElementById('scoreO');
        if (scoreXEl) scoreXEl.textContent = scoreX;
        if (scoreOEl) scoreOEl.textContent = scoreO;
    }

    function updateCurrentPlayerDisplay() {
        const currentPlayerEl = document.getElementById('currentPlayerDisplay');
        if (currentPlayerEl) currentPlayerEl.textContent = currentPlayer;
    }

    function updateGameStatus(message) {
        const gameStatusEl = document.getElementById('gameStatus');
        if(gameStatusEl) gameStatusEl.innerHTML = `<p>${message}</p>`;
    }

    function resetGame() {
        gameBoard = ['', '', '', '', '', '', '', '', ''];
        currentPlayer = 'X';
        gameActive = true;
        selectedAnswer = null;

        const cells = document.querySelectorAll('.cell');
        cells.forEach(cell => {
            cell.classList.remove('winning-cell');
        });

        updateDisplay();
        updateCurrentPlayerDisplay();
        updateGameStatus("🎮 Game baru dimulai! Klik pada kotak untuk bermain.");

        const questionContainer = document.getElementById('questionContainer');
        if(questionContainer) questionContainer.style.display = 'none';
    }

    function showQuestion() {
        const questionContainer = document.getElementById('questionContainer');
        if (!questionContainer) return;
        
        const categories = ['membaca', 'numerasi', 'sains'];
        const randomCategory = categories[Math.floor(Math.random() * categories.length)];
        const categoryQuestions = questions[randomCategory];
        const randomQuestion = categoryQuestions[Math.floor(Math.random() * categoryQuestions.length)];

        const categoryNames = {
            'membaca': 'Literasi Membaca',
            'numerasi': 'Literasi Numerasi',
            'sains': 'Literasi Sains'
        };

        document.getElementById('questionTitle').textContent = `📚 ${categoryNames[randomCategory]}`;
        document.getElementById('questionText').textContent = randomQuestion.question;

        const optionsContainer = document.getElementById('questionOptions');
        optionsContainer.innerHTML = '';

        randomQuestion.options.forEach((option, index) => {
            const optionElement = document.createElement('div');
            optionElement.className = 'option';
            optionElement.textContent = option;
            optionElement.onclick = () => selectOption(index, optionElement);
            optionsContainer.appendChild(optionElement);
        });

        questionContainer.dataset.correctAnswer = randomQuestion.correct;
        document.getElementById('answerBtn').style.display = 'block';
        questionContainer.style.display = 'block';
        questionContainer.scrollIntoView({ behavior: 'smooth' });
    }

    function selectOption(index, element) {
        const options = document.querySelectorAll('.option');
        options.forEach(opt => opt.classList.remove('selected'));
        element.classList.add('selected');
        selectedAnswer = index;
    }

    function checkAnswer() {
        if (selectedAnswer === null) {
            alert('Silakan pilih jawaban terlebih dahulu!');
            return;
        }

        const questionContainer = document.getElementById('questionContainer');
        const correctAnswer = parseInt(questionContainer.dataset.correctAnswer);
        const answerBtn = document.getElementById('answerBtn');

        if (selectedAnswer === correctAnswer) {
            answerBtn.textContent = '✅ Benar! Hebat!';
            answerBtn.style.background = 'linear-gradient(135deg, #4CAF50, #45a049)';
            if (currentPlayer === 'X') {
                scoreX += 0.5;
            } else {
                scoreO += 0.5;
            }
            updateScoreDisplay();
            updateGameStatus('🎯 Jawaban benar! Kamu mendapat bonus poin!');
        } else {
            answerBtn.textContent = '❌ Salah, coba lagi!';
            answerBtn.style.background = 'linear-gradient(135deg, #f44336, #d32f2f)';
            updateGameStatus('📚 Jawaban salah. Terus belajar ya!');
        }

        const options = document.querySelectorAll('.option');
        options.forEach((option, index) => {
            if (index === correctAnswer) {
                option.style.background = '#4CAF50';
                option.style.color = 'white';
            } else if (index === selectedAnswer && selectedAnswer !== correctAnswer) {
                option.style.background = '#f44336';
                option.style.color = 'white';
            }
        });

        setTimeout(() => {
            questionContainer.style.display = 'none';
            resetAnswerButton();
        }, 3000);
    }

    function resetAnswerButton() {
        const answerBtn = document.getElementById('answerBtn');
        answerBtn.textContent = 'Jawab';
        answerBtn.style.background = 'linear-gradient(135deg, #ffa726, #ff9800)';
        answerBtn.style.display = 'none';
        selectedAnswer = null;
    }

    function scrollToGame() {
        const gameEl = document.getElementById('game');
        if(gameEl) gameEl.scrollIntoView({ behavior: 'smooth' });
    }
});