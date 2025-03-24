 function showMain() {
        document.getElementById('hero').style.display = 'block';
        document.getElementById('testSection').style.display = 'none';
        document.getElementById('resultSection').style.display = 'none';
    }

    const tests = {
        skin: [
            { question: "Как кожа ощущается без крема?", options: ["Сухая", "Нормальная", "Жирная"], values: [0, 1, 2] },
            { question: "Как кожа реагирует на солнце?", options: ["Сгорает", "Немного загорает", "Легко загорает"], values: [0, 1, 2] }
        ],
        hair: [
            { question: "Как быстро жирнятся волосы?", options: ["Через 1 день", "Через 2-3 дня", "Редко"], values: [2, 1, 0] },
            { question: "Есть ли у вас перхоть?", options: ["Да", "Иногда", "Нет"], values: [2, 1, 0] }
        ]
    };

    const cosmetics = {
        skin: [
            { type: "Сухая кожа", products: [{ name: "Увлажняющий крем", img: "cream.jpg", price: "1200₽" }] },
            { type: "Жирная кожа", products: [{ name: "Матирующий гель", img: "gel.jpg", price: "900₽" }] }
        ],
        hair: [
            { type: "Жирные волосы", products: [{ name: "Шампунь для жирных волос", img: "shampoo.jpg", price: "800₽" }] },
            { type: "Сухие волосы", products: [{ name: "Маска для сухих волос", img: "mask.jpg", price: "1500₽" }] }
        ]
    };

    let currentTest = [];
    let currentQuestionIndex = 0;
    let userAnswers = [];

    function startTest(type) {
        document.getElementById('hero').style.display = 'none';
        document.getElementById('testSection').style.display = 'block';
        document.getElementById('resultSection').style.display = 'none';
        currentTest = tests[type];
        userAnswers = [];
        currentQuestionIndex = 0;
        showQuestion();
    }

    function showQuestion() {
        let questionData = currentTest[currentQuestionIndex];
        document.getElementById('question').innerText = questionData.question;
        let optionsContainer = document.getElementById('options');
        optionsContainer.innerHTML = "";
        questionData.options.forEach((option, index) => {
            let btn = document.createElement('button');
            btn.className = 'btn-primary';
            btn.innerText = option;
            btn.onclick = () => {
                userAnswers.push(questionData.values[index]);
                document.getElementById('nextButton').style.display = 'block';
            };
            optionsContainer.appendChild(btn);
        });
    }

    function nextQuestion() {
        if (currentQuestionIndex < currentTest.length - 1) {
            currentQuestionIndex++;
            showQuestion();
            document.getElementById('nextButton').style.display = 'none';
        } else {
            showResults();
        }
    }

    function showResults() {
        document.getElementById('testSection').style.display = 'none';
        document.getElementById('resultSection').style.display = 'block';

        let sum = userAnswers.reduce((a, b) => a + b, 0);
        let skinType = sum <= 1 ? "Сухая кожа" : "Жирная кожа";
        document.getElementById('testResult').innerText = `Ваш тип кожи: ${skinType}`;

        let recommendedProducts = cosmetics.skin.find(c => c.type === skinType).products;
        let recommendationsContainer = document.getElementById('recommendations');
        recommendationsContainer.innerHTML = recommendedProducts.map(p => 
            `<div class="cosmetic-item">
                <img src="${p.img}" alt="${p.name}">
                <div><strong>${p.name}</strong><br>${p.price}</div>
            </div>`
        ).join('');
    }
    function createBubbles() {
        const container = document.querySelector('.floating-bubbles');
        for (let i = 0; i < 15; i++) { // Количество пузырьков
            let bubble = document.createElement('div');
            bubble.classList.add('bubble');

            // Размер от 20px до 80px
            let size = Math.random() * 60 + 20;
            bubble.style.width = `${size}px`;
            bubble.style.height = `${size}px`;

            // Позиция по горизонтали (от 0% до 100%)
            bubble.style.left = `${Math.random() * 100}%`;

            // Разное время анимации (от 3 до 6 секунд)
            bubble.style.animationDuration = `${Math.random() * 3 + 3}s`;

            container.appendChild(bubble);
        }
    }

    // Запускаем функцию при загрузке страницы
function createBubbles() {
    const container = document.querySelector('.floating-bubbles');
    const colors = ['#ff6f91', '#ff94c2', '#ff3d7f', '#ffe4e1'];

    for (let i = 0; i < 15; i++) {
        let bubble = document.createElement('div');
        bubble.classList.add('bubble');

        let size = Math.random() * 60 + 20;
        bubble.style.width = `${size}px`;
        bubble.style.height = `${size}px`;
        bubble.style.left = `${Math.random() * 100}%`;
        bubble.style.animationDuration = `${Math.random() * 3 + 3}s`;

        // Устанавливаем случайный цвет
        bubble.style.background = colors[Math.floor(Math.random() * colors.length)];

        container.appendChild(bubble);
    }
}

document.addEventListener("DOMContentLoaded", createBubbles);
