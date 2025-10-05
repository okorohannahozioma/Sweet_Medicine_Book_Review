const questions = [
            "What was your first impression of the book's opening chapter?",
            "Tsitsi believed that marriage is something to be initiated by the man. It would happen when he is ready. Do you agree?",
            "Tsitsi was traditionally married to Zvobgo, but since they hadn’t had a church wedding, she still saw them as “living in sin.” Is a church wedding more important than a traditional one?",
            "A quote in the book read “the greater the hard work, the greater the success.” With the advent of smart work, do you think this quote still holds water? Because we have all seen people who work hard but have nothing to show for it.",
            "Does religion truly make people morally upright, or does it merely create fear that controls people’s behavior?",
            "Tsitsi complained of the decline in their sex life to Chiedza, who suggested Zvobgo might be cheating. Tsitsi disagreed, but Chiedza said, “And why not? If he could do it to her (his first wife), he can do it to you.” Does karma exist? Does what goes around actually come around?",
            "Did Tsitsi have any right to judge Chiedza for making money off rich older men, given that she herself married someone older than her mother for similar reasons?",
            "How far can you go in helping a friend? Even when the circumstances clash with your values and beliefs as in the case of Tsitsi accompanying Chiedza to have an abortion.",
            "Does juju work? As we can see in the book, Tsitsi used juju and got her happily ever after.",
            "There’s a recent video of a midwife advising a girl who wanted an abortion to keep the baby. After giving birth, the girl left the baby for the midwife and disappeared. Relating this to Chiedza’s three abortions in the book, should women be “advised” to keep pregnancies they do not want?",
            "Feminism is one of the main themes of the book. Do you think it accurately depicts feminism, or does it present a different idea of what women’s empowerment means?",
            "A boy trying to shame Chiedza in class quoted that marriage is often the surest way out of poverty for many poorer women. Is that true?",
            "Tsitsi blamed the government for her unemployment and meager jobs, saying it drove her to marry Zvobgo. Did she really have no other choice?",
            "Who was your favorite character?",
            "Would you recommend this book to others? Why or why not?"
        ];

        let currentIndex = 0;
        const carouselTrack = document.getElementById('carouselTrack');
        const prevBtn = document.getElementById('prevBtn');
        const nextBtn = document.getElementById('nextBtn');
        const progressIndicator = document.getElementById('progressIndicator');

        // Create question cards
        function createQuestionCards() {
            questions.forEach((question, index) => {
                const card = document.createElement('div');
                card.className = 'question-card';
                card.innerHTML = `
                    <span class="question-number">Question ${index + 1}</span>
                    <h3 class="question-text">${question}</h3>
                    `;
                carouselTrack.appendChild(card);
            });
        }

        // Update carousel display
        function updateCarousel() {
            const cards = document.querySelectorAll('.question-card');
            
            cards.forEach((card, index) => {
                card.classList.remove('active', 'prev', 'next');
                
                if (index === currentIndex) {
                    card.classList.add('active');
                } else if (index === currentIndex - 1 || (currentIndex === 0 && index === cards.length - 1)) {
                    card.classList.add('prev');
                } else if (index === currentIndex + 1 || (currentIndex === cards.length - 1 && index === 0)) {
                    card.classList.add('next');
                }
            });

            progressIndicator.textContent = `Question ${currentIndex + 1} of ${questions.length}`;
        }

        // Navigation functions
        function goToNext() {
            currentIndex = (currentIndex + 1) % questions.length;
            updateCarousel();
        }

        function goToPrev() {
            currentIndex = (currentIndex - 1 + questions.length) % questions.length;
            updateCarousel();
        }

        // Event listeners
        nextBtn.addEventListener('click', goToNext);
        prevBtn.addEventListener('click', goToPrev);

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowRight') goToNext();
            if (e.key === 'ArrowLeft') goToPrev();
        });

        // Initialize
        createQuestionCards();
        updateCarousel();

        // Touch/swipe support for mobile
        let touchStartX = 0;
        let touchEndX = 0;

        carouselTrack.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        });

        carouselTrack.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        });

        function handleSwipe() {
            if (touchEndX < touchStartX - 50) goToNext();
            if (touchEndX > touchStartX + 50) goToPrev();
        }
