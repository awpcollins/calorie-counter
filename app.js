const App = ((ItemCtrl, UICtrl) => {
  const {
    itemList, addBtn, updateBtn, removeBtn, backBtn, clearBtn,
  } = UICtrl.getSelectors();

  const loadEventListeners = function loadEventListeners() {
    addBtn.addEventListener('click', itemAdd);
    updateBtn.addEventListener('click', itemUpdate);
    itemList.addEventListener('click', editState);
    removeBtn.addEventListener('click', itemRemove);
    backBtn.addEventListener('click', back);
    clearBtn.addEventListener('click', clear);
  };

  const editState = e => {
    if (e.target.classList.contains('edit-item')) {
      const elem = e.target.parentNode.parentNode;
      const idNum = elem.id.split('-').pop();
      const item = ItemCtrl.getItem(parseInt(idNum, 10));

      elem.style.display = 'none';
      UICtrl.setUpdateState(item);
    }
    e.preventDefault();
  };

  const inputState = () => {
    UICtrl.showTotalCalories(ItemCtrl.getSetTotalCalories());
    UICtrl.clearInput();
    UICtrl.resetState();
  };

  const itemAdd = e => {
    const input = UICtrl.getItemInput();

    if (input.name !== '' && input.calories !== '') {
      const newItem = ItemCtrl.addItem(input);

      UICtrl.addListItem(newItem);
      inputState();
    }
    e.preventDefault();
  };

  const itemUpdate = e => {
    const input = UICtrl.getItemInput();

    if (input.name !== '' && input.calories !== '') {
      const item = ItemCtrl.updateItem(input);

      UICtrl.updateListItem(item);
      inputState();
    }
    e.preventDefault();
  };

  const itemRemove = e => {
    ItemCtrl.removeItem();
    UICtrl.removeListItem(ItemCtrl.getCurrentItem().id);
    inputState();

    e.preventDefault();
  };

  const back = e => {
    UICtrl.clearInput();
    UICtrl.resetState();
    UICtrl.showListItem(ItemCtrl.getCurrentItem().id);
    e.preventDefault();
  };

  const clear = e => {
    ItemCtrl.clearItems();
    UICtrl.removeAllListItems();
    inputState();
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
