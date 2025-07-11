document.addEventListener('DOMContentLoaded', function() {
    const buttons = document.querySelectorAll('.btn-jawaban');

    buttons.forEach(button => {
        button.addEventListener('click', function() {
            const answerContainer = this.nextElementSibling;
            const isVisible = answerContainer.style.display === 'block';

            if (isVisible) {
                answerContainer.style.display = 'none';
                this.textContent = 'Lihat Jawaban';
            } else {
                answerContainer.style.display = 'block';
                this.textContent = 'Sembunyikan Jawaban';
            }
        });
    });
});