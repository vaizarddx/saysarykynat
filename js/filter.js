// База данных товаров с категориями
const productsData = [
  {
    id: 1,
    title: "Григорьев Иннокентий - Красота вечности",
    author: "Григорьев Иннокентий",
    material: "Серебро, камень, ручная работа, ювелирия, на заказ",
    price: 70000,
    image: "images/Ilin-Kebier.png",
    link: "product-singleKesh.html",
    discount: "-30%",
    category: "jewelry"
  },
  {
    id: 2,
    title: "Иванова Юлия Арсеньевна- Лицо-чашка",
    author: "Иванова Юлия",
    material: "Глина, ручная работа, гончарство, в наличии",
    price: 600,
    image: "images/popular/in_stock/Face-cup.jpg.",
    link: "product-singleJul.html",
    discount: "-30%",
    category: "ceramics"
  },
  {
    id: 3,
    title: "Прокопьева Мария Кимовна - Сумка",
    author: "Мария Кимовна",
    material: "Ткань, ручная работа, из кожи, в наличии",
    price: 5000,
    image: "images/craft/bag.jpg",
    link: "#",
    discount: "-30%",
    category: "textile"
  },
  {
    id: 4,
    title: "Иванова Юлия Арсеньевна- Пепельница",
    author: "Иванова Юлия",
    material: "Керамика, ручная работа, гончарство, в наличии",
    price: 1000,
    image: "images/ceramics.jpg",
    link: "#",
    discount: "-30%",
    category: "ceramics"
  },
  {
    id: 5,
    title: "Иванова Тамара - Одеяло",
    author: "Петров Алексей",
    material: "Холст, масло",
    price: 25000,
    image: "images/popular/to_order/blanket.jpg",
    link: "product-single_tamara.html",
    category: "painting"
  },
  {
    id: 6,
    title: "Сидорова Анна - Графический портрет",
    author: "Сидорова Анна",
    material: "Бумага, карандаш",
    price: 8000,
    image: "images/popular/to_order/blanket.jpg",
    link: "#",
    category: "graphics"
  }
];

// Функция для отображения товаров
function displayProducts(products) {
  const productsGrid = document.getElementById('productsGrid');
  productsGrid.innerHTML = '';

  if (products.length === 0) {
    productsGrid.innerHTML = `
      <div class="col-12 text-center py-5">
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" class="mb-3">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
        </svg>
        <h4>Товары не найдены</h4>
        <p>Попробуйте изменить параметры фильтрации</p>
      </div>
    `;
    return;
  }

  products.forEach(product => {
    const productItem = document.createElement('div');
    productItem.className = 'product-item';
    productItem.innerHTML = `
      ${product.discount ? `<span class="badge bg-success position-absolute">${product.discount}</span>` : ''}
      <button class="btn btn-sm btn-outline-secondary favorite-btn position-absolute top-0 end-0 m-3">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi-heart" viewBox="0 0 16 16">
          <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z"/>
        </svg>
      </button>
      <figure>
        <a href="${product.link}" title="${product.title}">
          <img src="${product.image}" loading="lazy" alt="${product.title}" class="img-fluid">
        </a>
      </figure>
      <h3>${product.title}</h3>
      <span class="qty">${product.material}</span>
      <span class="price">${product.price.toLocaleString()} ₽</span>
      <a href="${product.link}" class="buy-button w-100 text-decoration-none text-center">Посмотреть</a>
    `;
    productsGrid.appendChild(productItem);
  });
}

// Функция для фильтрации товаров
function filterProducts() {
  // Получаем выбранные категории
  const selectedCategories = [];
  document.querySelectorAll('input[name="category"]:checked').forEach(checkbox => {
    if (checkbox.value !== 'all') {
      selectedCategories.push(checkbox.value);
    }
  });

  // Получаем диапазон цен
  const priceMin = parseInt(document.getElementById('priceMin').value) || 0;
  const priceMax = parseInt(document.getElementById('priceMax').value) || Infinity;

  // Фильтруем товары
  let filteredProducts = productsData.filter(product => {
    // Фильтр по цене
    if (product.price < priceMin || product.price > priceMax) {
      return false;
    }
    
    // Фильтр по категории (если выбраны категории)
    if (selectedCategories.length > 0 && !selectedCategories.includes(product.category)) {
      return false;
    }
    
    return true;
  });

  // Отображаем отфильтрованные товары
  displayProducts(filteredProducts);
}

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
  // Отображаем все товары при загрузке
  displayProducts(productsData);

  // Обработчик для кнопки "Применить фильтры"
  document.querySelector('.apply-filters').addEventListener('click', filterProducts);

  // Обработчик для кнопки "Сбросить"
  document.querySelector('.reset-filters').addEventListener('click', function() {
    // Сбрасываем все чекбоксы
    document.querySelectorAll('input[name="category"]').forEach(checkbox => {
      checkbox.checked = checkbox.value === 'all';
    });
    
    // Сбрасываем цены
    document.getElementById('priceMin').value = '';
    document.getElementById('priceMax').value = '';
    
    // Показываем все товары
    displayProducts(productsData);
  });

  // Обработчик для чекбокса "Все"
  document.querySelector('input[name="category"][value="all"]').addEventListener('change', function() {
    if (this.checked) {
      document.querySelectorAll('input[name="category"]').forEach(checkbox => {
        if (checkbox.value !== 'all') checkbox.checked = false;
      });
    }
  });

  // Обработчики для других чекбоксов
  document.querySelectorAll('input[name="category"]').forEach(checkbox => {
    if (checkbox.value !== 'all') {
      checkbox.addEventListener('change', function() {
        if (this.checked) {
          document.querySelector('input[name="category"][value="all"]').checked = false;
        }
      });
    }
  });
});