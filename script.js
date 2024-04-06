const searchHidden = () => {
    search[0].firstElementChild.classList.contains("hidden") ? search[0].firstElementChild.classList.remove("hidden") : search[0].firstElementChild.classList.add("hidden");
}
const search = document.getElementsByClassName('search')

search[0].lastElementChild.addEventListener("click", () => { searchHidden() });
