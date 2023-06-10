import { fetchDragons, cardTemplate, paginateDragons, createBtn, changePage } from "./core/utils";



document.addEventListener("DOMContentLoaded", async (event) => {

  const main = document.getElementById("container");
  let dragons = await fetchDragons();

  let current = 1;
  const numberPerPage = 2;
  let numberOfItems = dragons.length;
  const totalPages = Math.ceil(numberOfItems / numberPerPage);


  let arr = paginateDragons(dragons, current, numberPerPage);
  createBtn(current, totalPages)
  for (let dragon of arr) cardTemplate(main, dragon)

  document.querySelectorAll('pagination__btn').forEach(item => {
    item.addEventListener('click', (e) => {
      let page = e.target.value;
      console.log(page)
      return changePage(page, totalPages)
    })
  })


});
