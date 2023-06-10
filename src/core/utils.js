
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

// create pagination buttons and values
export function createBtn(current, totalPages) {
  let pagination = document.querySelector('#pagination'),
    first_btn = document.querySelector('#first__btn'),
    last_btn = document.querySelector('#last__btn');

  for (let i = 0; i < 3; i++) {
    let btn = document.createElement('button')
    btn.innerHTML = i + 1;
    btn.value = current + i;
    btn.classList.add('pagination__btn');
    pagination.appendChild(btn);
  }

  first_btn.value = 1;
  last_btn.value = totalPages;
}

export function changePage(page, totalPages) {
  let prev_btn = document.querySelector('#previous__btn'),
    next_btn = document.querySelector('#next__btn');

  if (page < 1) page = 1;
  if (page > totalPages) page = totalPages;

  if (page == 1) {
    prev_btn.disabled = "true";
  } else {
    prev_btn.disabled = "false";
  }

  if (page == totalPages) {
    next_btn.disabled = "true";
  } else {
    next_btn.disabled = "false";
  }
  return page;

}

export function firstPage(current) {
  current = 1;
  changePage(current)
}

export function nextPage(current, totalPages) {
  if (current < totalPages) {
    current++;
    changePage(current);
  }
}

export function previousPage(current) {
  if (current > 1) {
    current--;
    changePage(current);
  }
}

export function lastPage(current, totalPages) {
  current = totalPages;
  changePage(current);
}