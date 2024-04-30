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