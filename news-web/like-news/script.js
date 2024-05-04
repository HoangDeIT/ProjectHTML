const render = document.querySelector('main section');

window.addEventListener('load', () => {
    let UserNow = JSON.parse(localStorage.getItem('UserNow'));
    let UserName = UserNow.UserName;
    let dataUser = JSON.parse(localStorage.getItem('dataUser'))
    let UserInfo = dataUser?.filter((user) => user.UserName === UserName);
    if (UserInfo[0].LikeNews !== null && UserInfo[0].LikeNews !== undefined && UserInfo[0].LikeNews !== '') {
        let News = JSON.parse(localStorage.getItem('News'))
        UserInfo[0].LikeNews.forEach(element => {
            News.forEach(news => {
                if (news.ID === element) {
                    let article = document.createElement('article');
                    article.innerHTML = `
                    <img src='${news.SrcImg}'>
                    <div>
                        <span>${news.Topic}</span>
                        <a href="${news.SrcNews}">
                            <h2>${news.Name}</h2>
                        </a>
                        <p>${news.Summary}</p>
                        <small>${news.By}</small>    
                    </div>
                    `
                    render.appendChild(article);
                }
            })
        });
    }
    if (UserInfo[0].LikeNews.length === 0) {
        render.innerHTML = `
        <h1>Bạn chưa thêm báo yêu thích :((</h1>
        <img src='../../images/noData.png' alt="Nodata"'>`
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

//kiem tra dang nhap
const like_news_btn = document.querySelector('.like-news-btn');
like_news_btn.addEventListener('click', (e) => {
    let UserNow = JSON.parse(localStorage.getItem('UserNow'));
    if (!UserNow.UserOn) {
        e.preventDefault();
        alert('Vui lòng đăng nhập để xem bài báo yêu thích của tài khoản')
    }
})