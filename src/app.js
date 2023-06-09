import { addDragons, average, createButton } from "./core/utils";

import * as Dragon from "./core/dragons";

const main = document.getElementById("container");

document.addEventListener("DOMContentLoaded", (event) => {
  let {
    dragons: { names },
    forces,
    relationships,
  } = Dragon;

  const dragonsList = names.map((dragon) => {
    let notes = forces.find((f) => f.id === dragon.id)?.notes;
    dragon.average = average(notes);

    dragon.relations = [];
    let ids = relationships.find((relation) => relation.id === dragon.id)?.relations;
    if (ids) {
      dragon.relations.concat(names.filter((d) => ids.includes(dragon.id)));
    }


    return dragon;
  });

  let toggle = true;
  const btn = createButton('Order list toggle');

  btn.addEventListener("click", (e) => {
    if (toggle) {
      dragonsList.sort((a, b) => a.average - b.average);
      addDragons(main, dragonsList, btn, true);
    } else {
      dragonsList.sort((a, b) => b.average - a.average);
      addDragons(main, dragonsList, btn, true);
    }
    toggle = !toggle;
  });

  addDragons(main, dragonsList, btn, false);
});
