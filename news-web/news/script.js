const id_news = document.getElementById('id-news').innerHTML;
const likeButton = document.querySelector('.button-like');
let UserNow = JSON.parse(localStorage.getItem('UserNow'));
window.addEventListener('load', () => {
    if (!UserNow.UserOn) {
        likeButton.classList.add('hidden');
    } else {
        likeButton.classList.remove('hidden');
        let localStorageUser = localStorage.getItem('dataUser')
        let dataUser = JSON.parse(localStorageUser)


        dataUser.forEach(UserInfo => {
            if (UserInfo.UserName === UserNow.UserName) {
                if (UserInfo.LikeNews.includes(id_news))
                    likeButton.classList.add('liked')
            }
        });
    }
})

likeButton.addEventListener('click', (event) => {
    likeButton.classList.toggle('liked');
    let localStorageUser = localStorage.getItem('dataUser')
    let dataUser = JSON.parse(localStorageUser)
    if (likeButton.classList.contains('liked')) {

        dataUser.forEach(UserInfo => {
            if (UserInfo.UserName === UserNow.UserName) {
                if (!UserInfo.LikeNews.includes(id_news))
                    UserInfo.LikeNews.push(id_news);
            }
        });
        localStorage.setItem('dataUser', JSON.stringify(dataUser))
    } else {
        dataUser.forEach(UserInfo => {
            if (UserInfo.UserName === UserNow.UserName) {
                UserInfo.LikeNews = UserInfo.LikeNews.filter((idnews) => idnews !== id_news)
            }
        });
    }
    localStorage.setItem('dataUser', JSON.stringify(dataUser))
}
)

const toDay_span = document.querySelector('.Today');
setInterval(() => {
    let toDay = new Date();
    toDay_span.innerHTML = `${toDay.getHours()}:${toDay.getMinutes()}:${toDay.getSeconds()}    Ngày ${toDay.getDate()} Tháng ${toDay.getMonth() + 1} Năm ${toDay.getFullYear()}`
}, 1)
const like_news_btn = document.querySelector('.like-news-btn');
like_news_btn.addEventListener('click', (e) => {
    let UserNow = JSON.parse(localStorage.getItem('UserNow'));
    if (!UserNow.UserOn) {
        e.preventDefault();
        alert('Vui lòng đăng nhập để xem bài báo yêu thích của tài khoản')
    }
})
//reponsive
const site_bar = document.querySelectorAll('.site-bar nav > div')
const nav_bar = document.querySelector('.nav-signin')

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