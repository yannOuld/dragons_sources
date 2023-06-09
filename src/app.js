import { fetchDragons, cardTemplate } from "./core/utils";



document.addEventListener("DOMContentLoaded", async (event) => {
  let dragons = await fetchDragons();
  const main = document.getElementById("container");

  for (let dragon of dragons) cardTemplate(main, dragon)


});
