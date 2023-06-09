import { createElement } from "react";
import { fetchDragons, cardTemplate, showDragons } from "./core/utils";



document.addEventListener("DOMContentLoaded", async (event) => {
  const main = document.getElementById("container");

  let dragons = await fetchDragons();


  let current = 1;
  let arr = showDragons(dragons, current);
  let dragon = arr
  console.log(arr)


  for (let dragon of arr)
    cardTemplate(main, dragon)


});
