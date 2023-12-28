let lists =  JSON.parse(localStorage.getItem('savedAllLists')) || [{
  listName: 'list 1',
  listContent: []
}, {
  listName: 'list 2',
  listContent: []
}];

function saveToLocalStorage() {
  localStorage.setItem('savedAllLists', JSON.stringify(lists));
}

function addNewListToMenu() {
  let num = lists.length + 1;
  lists.push({
    listName: `list ${num}`,
    listContent: []
  });
  saveToLocalStorage();
  changeListInView(num - 1);
}

function removeListFromLists(index) {
  if (lists.length < 2) {
    alert('Can not delete all the lists!');
    return;
  }
  lists.splice(index, 1);
  saveToLocalStorage();
  if (index === lists.length)
    changeListInView(index - 1);
  else
    changeListInView(index);
}