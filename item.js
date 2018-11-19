/* eslint no-unused-vars: 0 */
const ItemCtrl = (() => {
  const Item = function Item(id, name, calories) {
    this.id = id;
    this.name = name;
    this.calories = calories;
  };

  const data = {
    items: [],
    currentItem: null,
    totalCalories: 0,
  };

  const getItemId = input => {
    if (data.currentItem) {
      return data.currentItem.id;
    }

    if (data.items.length > 0) {
      return data.items.length;
    }

    return 0;
  };

  const getIndex = id => data.items.findIndex(element => element.id === id);

  return {
    getItems() {
      const items = localStorage.getItem('items');

      if (items !== null) {
        data.items = JSON.parse(items);
      }

      return data.items;
    },

    getCurrentItem() {
      return data.currentItem;
    },

    getItem(id) {
      data.currentItem = data.items[getIndex(id)];

      return data.currentItem;
    },

    removeItem() {
      data.items.splice(getIndex(data.currentItem.id), 1);

      localStorage.setItem('items', JSON.stringify(data.items));
    },

    addItem(input) {
      const id = getItemId(input);
      const newItem = new Item(id, input.name, parseInt(input.calories, 10));

      data.items.push(newItem);

      localStorage.setItem('items', JSON.stringify(data.items));

      return newItem;
    },

    updateItem(input) {
      const index = getIndex(data.currentItem.id);
      const item = data.items[index];

      item.name = input.name;
      item.calories = input.calories;

      localStorage.setItem('items', JSON.stringify(data.items));

      return item;
    },

    clearItems() {
      data.items = [];

      localStorage.clear();
    },

    getSetTotalCalories() {
      const total = data.items.reduce((acc, item) => acc + parseInt(item.calories, 10),
        0);

      data.totalCalories = total;

      return total;
    },
  };
})();
