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

