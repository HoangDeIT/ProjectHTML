//reponsive
const site_bar = document.querySelectorAll('.site-bar nav > div')


const checkScreen = () => {
    if (window.innerWidth <= 1200) {
        site_bar[1].classList.add('dropdown');
        site_bar[1].querySelector('p').classList.remove('hidden');
        site_bar[1].querySelector('div').classList.add('dropdown-content');
    } else {
        site_bar[1].classList.remove('.dropdown');
        site_bar[1].querySelector('p').classList.add('hidden');
        site_bar[1].querySelector('div').classList.remove('dropdown-content');
    }

}
window.addEventListener('resize', () => { checkScreen() })
window.addEventListener('load', () => { checkScreen() })
const like_news_btn = document.querySelector('.like-news-btn');
like_news_btn.addEventListener('click', (e) => {
    let UserNow = JSON.parse(localStorage.getItem('UserNow'));
    if (!UserNow.UserOn) {
        e.preventDefault();
        alert('Vui lòng đăng nhập để xem bài báo yêu thích của tài khoản')
    }
})