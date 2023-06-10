import { fetchDragons, cardTemplate, paginateDragons, createBtn } from "./core/utils";



document.addEventListener("DOMContentLoaded", async (event) => {

  const main = document.getElementById("container");
  let dragons = await fetchDragons();

  let current = 1;
  const numberPerPage = 2;
  let numberOfItems = dragons.length;
  const numberOfPages = Math.ceil(numberOfItems / numberPerPage);


  let arr = paginateDragons(dragons, current, numberPerPage);
  createBtn(current, numberOfPages)
  for (let dragon of arr) cardTemplate(main, dragon)


});
