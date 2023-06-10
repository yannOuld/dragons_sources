
// fetching dragons data
export async function fetchDragons() {
  let dragons = await fetch('http://localhost:3000/dragons').then(response => response.json()).catch(err => console.log(err))
  return dragons
}

// dynamic html injection with template
export function cardTemplate(main, dragon) {
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
    if (dragon.type == 'Terre') badge.classList.add('card__badge--earth');
    if (dragon.type == 'Air') badge.classList.add('card__badge--air');

    main.appendChild(tempclone)
  } else {
    main.innerHTML = 'Désolée un problème est survenu essayer plus tard';
    throw new Error('don\'t use internet explorer')
  }
}

// slice array and paginate the dragons 
export function paginateDragons(dragons, current, numberPerPage) {
  const start = (current - 1) * numberPerPage;
  const end = start + numberPerPage

  return dragons.slice(start, end)
}

// create pagination buttons
export function createBtn(current) {
  let pagination = document.querySelector('#pagination');

  for (let i = 0; i < 3; i++) {
    let btn = document.createElement('button')
    btn.innerHTML = i + 1;
    btn.value = current + i;
    btn.classList.add('pagination__btn');
    pagination.appendChild(btn);

  }
}
export function changePage() {

}

export function firstPage() {

}

export function nextPage() {

}

export function previousPage() {

}

export function lastPage() {

}