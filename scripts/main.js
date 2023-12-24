let theListInView = lists[0];
showList();
changeTopSection();
updateSidebarMenu();
updateProfileName();

function changeListInView(indexOfList) {
  theListInView = lists[indexOfList];
  updateSidebarMenu();
  changeTopSection();
  showList();
  updateProfileName();
}

function updateProfileName() {
  const profileNameElement = document.querySelector('.js-profile-name');
  profileNameElement.innerHTML = `<h2>Gama /  ${theListInView.listName}</h2>`;
}

function showList() {
  const listInViewElement = document.querySelector('.js-all-items');
  let newHTML = ``;
  theListInView.listContent.forEach((item, index) => {
    newHTML += `
    <div class="list-item">
      <div>${index + 1}</div>
      <div>${item}</div>
    </div>
    `;
  });
  listInViewElement.innerHTML = newHTML;
}

const inputElement = document.querySelector('.js-list-item-input');
inputElement.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    saveItemToListContent();
    inputElement.value = '';
  }
});

const saveButtonElement = document.querySelector('.js-btn-save');
saveButtonElement.addEventListener('click', () => {
  saveItemToListContent();
  inputElement.value = '';
});

function saveItemToListContent() {
  const itemContent = inputElement.value;
  theListInView.listContent.push(`${itemContent}`);
  saveToLocalStorage();
  showList();
}

const clearButtonElement = document.querySelector('.js-btn-clear-all');
clearButtonElement.addEventListener('click', () => {
  theListInView.listContent = [];
  saveToLocalStorage();
  showList();
});

// edit top-section
const deleteListElement = document.querySelector('.js-btn-delete');
deleteListElement.addEventListener('click', () => {
  lists.forEach((list, index) => {
    if (theListInView === list)
      removeListFromLists(index);    
  })
});
const editListElement = document.querySelector('.js-btn-edit');

editListElement.addEventListener('click', () => toggleTopSection());

const inputNameElement = document.querySelector('.js-list-name-input');

function toggleTopSection() {
  const topSectionNameElement = document.querySelector('.js-top-section-name');

  topSectionNameElement.classList.toggle('editing-title');
  inputNameElement.value = theListInView.listName;
  changeTopSection();
}

inputNameElement.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    theListInView.listName = inputNameElement.value;
    saveToLocalStorage();
    toggleTopSection();
    updateSidebarMenu();
  }
});

function changeTopSection() {
  const listTitleElement = document.querySelector('.js-list-name-title');
  listTitleElement.innerHTML = theListInView.listName;
}

const newListElement = document.querySelector('.js-btn-newlist');
newListElement.addEventListener('click', () => addNewListToMenu());

// sidebar on off
const hamburgerElement = document.querySelector('.js-hamburger');
const mainSectionElement = document.getElementById('main-section');
const navElement = document.querySelector('nav');
const closeSidebarElement = document.querySelector('.js-xmark-div');
hamburgerElement.addEventListener('click', () => {
  mainSectionElement.classList.add('main-sidebar-on');
  navElement.classList.add('sidebar-on');
});
closeSidebarElement.addEventListener('click', () => {
  mainSectionElement.classList.remove('main-sidebar-on');
  navElement.classList.remove('sidebar-on');
});

// sidebar lists menu
const addNewListElement = document.querySelector('.js-btn-newlist-sidebar');
addNewListElement.addEventListener('click', () => addNewListToMenu());

function updateSidebarMenu() {
  const sidebarLists = document.querySelector('.js-lists-menu');

  let menuHTML = ``;
  lists.forEach((list) => {
    if (list === theListInView)
      menuHTML += `
        <div class="list list-in-view">${list.listName}</div>
      `
    else
      menuHTML += `
        <div class="list">${list.listName}</div>
      `
  });
  sidebarLists.innerHTML = menuHTML;

  const listsElements = document.querySelectorAll('.list');
  listsElements.forEach((listElement, index) => {
  listElement.addEventListener('click', () => {
    theListInView = lists[index];
    changeListInView(index);
  });
});
}

// header search 
const searchElement = document.querySelector('.js-search-input');
searchElement.addEventListener('keydown', (event) => {
  if (event.key === 'Enter')
    searchForList();
});

function searchForList() {
  let found = false;
  lists.forEach((list, index) => {
    if (searchElement.value === list.listName) {
      searchElement.value = '';
      changeListInView(index);
      found = true;
    }
  });
  if (!found) {
    searchElement.value = '';
    alert('The Name you entered does not exist!');
  }
}