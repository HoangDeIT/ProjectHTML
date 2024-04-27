const searchHidden = () => {
    search[0].firstElementChild.classList.contains("hidden") ? search[0].firstElementChild.classList.remove("hidden") : search[0].firstElementChild.classList.add("hidden");
}
const search = document.getElementsByClassName('search')

search[0].lastElementChild.addEventListener("click", () => { searchHidden() });

//Trend news

const cards = document.querySelector('.news-cards');
const arrowBtns = document.querySelectorAll(".section-trendnews div>img")
const firstCardWidth = cards.querySelector("article").offsetWidth; //lay width cua article
arrowBtns.forEach(btn => {
    btn.addEventListener("click", () => {
        cards.scrollLeft += btn.id === 'left' ? -firstCardWidth : firstCardWidth
    })
})
let isDragging = false, startX, startScrollLeft;
const draggingStart = (e) => {
    isDragging = true;
    cards.classList.add('dragging');
    startX = e.pageX;
    startScrollLeft = cards.scrollLeft;
}
const draggingStop = () => {
    isDragging = false;
    cards.classList.remove('dragging');

}
const dragging = (e) => {
    if (!isDragging) return; // Khong lam gi ca
    cards.scrollLeft = startScrollLeft - (e.pageX - startX)
}
const autoplay = () => {
    setInterval(() => {
        cards.scrollLeft = cards.offsetWidth <= cards.scrollLeft ? 0 : cards.scrollLeft + firstCardWidth
        // console.log(cards.scrollLeft)
    }, 5000);
}
autoplay();
cards.addEventListener("mousemove", dragging);
cards.addEventListener("mousedown", draggingStart);
cards.addEventListener("mouseup", draggingStop);

//Hiệu ứng pop-up form

const login_btn = document.querySelectorAll('.login-btn');
const signup_btn = document.querySelectorAll('.signup-btn');
const login_form = document.querySelector('.login-form');
const signup_form = document.querySelector('.signup-form');
const close_btn = document.querySelectorAll('.signup-login-form .close-btn')
const blur = document.querySelector('.blur')
login_btn.forEach((btn, index) => {
    btn.addEventListener('click', (event) => {
        login_form.classList.remove('hidden');
        blur.classList.remove('hidden');
        if (index === 1) {
            signup_form.classList.add('hidden');

        }
    })
})
signup_btn.forEach((btn, index) => {
    btn.addEventListener('click', (event) => {
        signup_form.classList.remove('hidden');
        blur.classList.remove('hidden');
        if (index === 1) {
            login_form.classList.add('hidden');

        }
    })
})
close_btn.forEach((btn) => {
    btn.addEventListener('click', () => {
        login_form.classList.add('hidden');
        signup_form.classList.add('hidden');
        blur.classList.add('hidden');
    })

})
