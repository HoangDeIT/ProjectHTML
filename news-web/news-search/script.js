const render = document.querySelector('main section');
const search_box = document.querySelector('main input[type=text]')
const search = (e) => {
    let search_box_value = search_box.value;
    let News = JSON.parse(localStorage.getItem('News'));
    render.innerHTML = '';
    let check = false;
    News.forEach(news => {
        if (news.Name.includes(search_box_value)) {
            check = true;
            let article = document.createElement('article');
            article.id = news.ID;
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
            render.appendChild(article)
        }
    });
    if (!check) {
        render.innerHTML = `
            <div>
            <h2>Không tìm thấy kết quả</h2>
            <img src='../../images/noData.png' alt="Nodata"'>
            </div>`
    }
    if (search_box_value === '') {
        News.forEach(news => {
            let article = document.createElement('article');
            article.id = news.ID;
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
            render.appendChild(article)
        })
    }

}
window.addEventListener('load', () => {
    let search_content = localStorage.getItem('search-content');
    search_box.value = search_content;
    search();
})
search_box.addEventListener('input', (e) => search(e))
