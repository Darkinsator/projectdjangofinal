(function() {
  const categoryInput = document.querySelector('#categoryInput');
  const categoriesContainer = document.querySelector('#categoriesContainer');
  const addCategoryButton = document.querySelector('#addCategoryButton');

  // Event listener for the 'Enter' key press (existing functionality)
  categoryInput.addEventListener('keydown', function(e) {
    if (e.key !== "Enter") {
      return;
    }

    e.preventDefault();

    const categoryName = this.value;
    this.value = '';
    addNewCategory(categoryName);
    updateCategoriesString();
  });

  // Event listener for the 'Add Category' button (new functionality)
  addCategoryButton.addEventListener('click', function() {
    const categoryName = categoryInput.value.trim();
    if (categoryName === '') return; // Don't add empty categories

    categoryInput.value = ''; // Clear the input after adding the category
    addNewCategory(categoryName);
    updateCategoriesString();
  });

  // Function to add a new category to the list
  function addNewCategory(name) {
    categoriesContainer.insertAdjacentHTML('beforeend', `
      <li class="category">
        <span class="name">${name}</span>
        <span onclick="removeCategory(this)" class="btnRemove bold">X</span>
      </li>
    `);
  }

  // Function to fetch all categories into an array
  function fetchCategoryArray() {
    const categories = [];

    document.querySelectorAll('.category').forEach(function(e) {
      const name = e.querySelector('.name').textContent;
      if (name === '') return;
      categories.push(name);
    });

    return categories;
  }

  // Function to update the hidden input field with categories string
  function updateCategoriesString() {
    const categories = fetchCategoryArray();
    document.querySelector('input[name="categoriesString"]').value = categories.join(',');
  }

  // Function to remove a category from the list
  window.removeCategory = function(e) {
    e.parentElement.remove();
    updateCategoriesString();
  };

})();
