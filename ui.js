/* eslint no-unused-vars: 0 */
const UICtrl = (() => {
  const UISelectors = {
    itemList: document.querySelector('#item-list'),
    addBtn: document.querySelector('.add-btn'),
    backBtn: document.querySelector('.back-btn'),
    removeBtn: document.querySelector('.remove-btn'),
    updateBtn: document.querySelector('.update-btn'),
    clearBtn: document.querySelector('.clear-btn'),
    itemName: document.querySelector('#item-name'),
    itemCalories: document.querySelector('#item-calories'),
    totalCalories: document.querySelector('.total-calories'),
  };

  return {
    populateItems(items) {
      let html = '';

      items.forEach(item => {
        html += `
						<li class="collection-item" id="item-${item.id}">
              <strong>${item.name}: </strong> <em>${item.calories} Calories</em>
              <a href class="secondary-content">
                <i class="edit-item fas fa-pencil-alt"></i>
              </a>
            </li>
     `;
      });
      UISelectors.itemList.innerHTML = html;
    },

    getSelectors: () => UISelectors,

    getItemInput: () => ({
      name: UISelectors.itemName.value,
      calories: UISelectors.itemCalories.value,
    }),

    clearInput() {
      UISelectors.itemName.value = '';
      UISelectors.itemCalories.value = '';
    },

    resetState() {
      UISelectors.updateBtn.style.display = 'none';
      UISelectors.removeBtn.style.display = 'none';
      UISelectors.backBtn.style.display = 'none';
      UISelectors.addBtn.style.display = 'inline';
    },

    updateState() {
      UISelectors.updateBtn.style.display = 'inline';
      UISelectors.removeBtn.style.display = 'inline';
      UISelectors.backBtn.style.display = 'inline';
      UISelectors.addBtn.style.display = 'none';
    },

    hideList() {
      UISelectors.itemList.style.display = 'none';
    },

    showTotalCalories(calories) {
      UISelectors.totalCalories.textContent = calories;
    },

    setUpdateState(currentItem) {
      UICtrl.updateState();
      UISelectors.updateBtn.style.display = 'inline';
      UISelectors.itemName.value = currentItem.name;
      UISelectors.itemCalories.value = currentItem.calories;
    },

    addListItem(item) {
      UISelectors.itemList.style.display = 'block';

      const li = document.createElement('li');

      li.className = 'collection-item';
      li.id = `item-${item.id}`;
      li.innerHTML = `
            <strong>${item.name}: </strong> <em>${item.calories} Calories</em>
						<a href="#" class="secondary-content">
							<i class="edit-item fas fa-pencil-alt"></i>
            </a>`;
      UISelectors.itemList.insertAdjacentElement('beforeend', li);
    },

    updateListItem(item) {
      const listItem = document.querySelector(`#item-${item.id}`);

      listItem.innerHTML = `
            <strong>${item.name}: </strong> <em>${item.calories} Calories</em>
						<a href="#" class="secondary-content">
							<i class="edit-item fas fa-pencil-alt"></i>
            </a>`;

      listItem.style.display = 'block';
    },

    removeListItem(id) {
      const listItem = document.querySelector(`#item-${id}`);

      listItem.remove();
    },

    removeAllListItems() {
      UISelectors.itemList.innerHTML = '';
    },

    showListItem(id) {
      const listItem = document.querySelector(`#item-${id}`);

      listItem.style.display = 'block';
    },
  };
})();
