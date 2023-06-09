
export function cardTemplate(main, dragon) {
  console.log(dragon)
  if ("content" in document.createElement("template")) {
    let template = document.querySelector("#template"),
      tempclone = document.importNode(template.content, true),
      img = tempclone.querySelector('.card__img'),
      name = tempclone.querySelector('.card__name'),
      badge = tempclone.querySelector('.card__badge');
    img.src = `./dragons/${dragon.name}.webp`;
    name.innerHTML = dragon.name;
    badge.innerHTML = `type:${dragon.type}`;
    if (dragon.type == 'Feu') badge.classList.add('card__badge--fire');
    if (dragon.type == 'Eau') badge.classList.add('card__badge--water');
    if (dragon.type == 'Terre') badge.classList.add('card__badge--Earth');
    if (dragon.type == 'Air') badge.classList.add('card__badge--air');

    main.appendChild(tempclone)
  } else {
    main.innerHTML = 'Désolée un problème est survenu essayer plus tard';
    throw new Error('don\'t use internet explorer')
  }
}


export async function fetchDragons() {
  let dragons = await fetch('http://localhost:3000/dragons').then(response => response.json()).catch(err => console.log(err))
  return dragons
}