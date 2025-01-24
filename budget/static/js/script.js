(function() {
  // Get references to the input field, button, and categories container
  const categoryInput = document.querySelector('#categoryInput');
  const addCategoryButton = document.querySelector('#addCategoryButton');
  const categoriesContainer = document.querySelector('#categoriesContainer');
  
  // Event listener for 'Enter' key (adds category when 'Enter' is pressed)
  categoryInput.addEventListener('keydown', function(e) {
    // Prevent form submission if 'Enter' key is pressed
    if (e.key === "Enter") {
      e.preventDefault(); // Prevent the form from submitting
      const categoryName = categoryInput.value.trim();
      if (categoryName === '') return; // Don't add empty categories

      categoryInput.value = ''; // Clear the input
      addNewCategory(categoryName); // Add the new category
      updateCategoriesString(); // Update the hidden input field
    }
  });

  // Event listener for the "Add Category" button (adds category when clicked)
  addCategoryButton.addEventListener('click', function() {
    const categoryName = categoryInput.value.trim();
    if (categoryName === '') return; // Don't add empty categories

    categoryInput.value = ''; // Clear the input
    addNewCategory(categoryName); // Add the new category
    updateCategoriesString(); // Update the hidden input field
  });

  // Function to add a new category to the categories list
  function addNewCategory(name) {
    categoriesContainer.insertAdjacentHTML('beforeend', `
      <li class="category">
        <span class="name">${name}</span>
        <span onclick="removeCategory(this)" class="btnRemove bold">X</span>
      </li>
    `);
  }

  // Function to fetch all categories and return them as an array
  function fetchCategoryArray() {
    const categories = [];
    document.querySelectorAll('.category').forEach(function(e) {
      const name = e.querySelector('.name').textContent;
      if (name === '') return;
      categories.push(name);
    });
    return categories;
  }

  // Function to update the hidden input field with the concatenated categories string
  function updateCategoriesString() {
    const categories = fetchCategoryArray();
    document.querySelector('input[name="categoriesString"]').value = categories.join(',');
  }

  // Global function to remove a category
  window.removeCategory = function(e) {
    e.parentElement.remove();
    updateCategoriesString();
  };

})();
