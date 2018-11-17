const App = ((ItemCtrl, UICtrl) => {
  const {
    itemList, addBtn, updateBtn, removeBtn, backBtn,
  } = UICtrl.getSelectors();

  const loadEventListeners = function loadEventListeners() {
    addBtn.addEventListener('click', itemAdd);
    updateBtn.addEventListener('click', itemUpdate);
    itemList.addEventListener('click', itemEdit);
    removeBtn.addEventListener('click', itemRemove);
    backBtn.addEventListener('click', back);
  };

  const itemEdit = e => {
    if (e.target.classList.contains('edit-item')) {
      const elem = e.target.parentNode.parentNode;
      const idNum = elem.id.split('-').pop();
      const item = ItemCtrl.getItem(parseInt(idNum, 10));

      elem.style.display = 'none';
      UICtrl.setUpdateState(item);
    }
    e.preventDefault();
  };

  const itemAdd = e => {
    const input = UICtrl.getItemInput();

    if (input.name !== '' && input.calories !== '') {
      const newItem = ItemCtrl.addItem(input);

      UICtrl.addListItem(newItem);
      UICtrl.showTotalCalories(ItemCtrl.getSetTotalCalories());
      UICtrl.clearInput();
      UICtrl.resetState();
    }
    e.preventDefault();
  };

  const itemUpdate = e => {
    const input = UICtrl.getItemInput();

    if (input.name !== '' && input.calories !== '') {
      const item = ItemCtrl.updateItem(input);

      UICtrl.updateListItem(item);
      UICtrl.showTotalCalories(ItemCtrl.getSetTotalCalories());
      UICtrl.clearInput();
      UICtrl.resetState();
    }
    e.preventDefault();
  };

  const itemRemove = e => {
    ItemCtrl.removeItem();
    UICtrl.removeListItem(ItemCtrl.getCurrentItem().id);
    UICtrl.showTotalCalories(ItemCtrl.getSetTotalCalories());
    UICtrl.clearInput();
    UICtrl.resetState();

    e.preventDefault();
  };

  const back = e => {
    UICtrl.clearInput();
    UICtrl.resetState();
    UICtrl.showListItem(ItemCtrl.getCurrentItem().id);
    e.preventDefault();
  };

  return {
    init: () => {
      const items = ItemCtrl.getItems();

      UICtrl.resetState();
      UICtrl.populateItems(items);
      UICtrl.showTotalCalories(ItemCtrl.getSetTotalCalories());

      loadEventListeners();
    },
  };
})(ItemCtrl, UICtrl);

App.init();
