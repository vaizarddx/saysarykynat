document.addEventListener('DOMContentLoaded', function() {
  // Скрываем прелоадер
  setTimeout(() => {
    document.querySelector('.preloader-wrapper').style.display = 'none';
  }, 500);
  
  // Инициализация модального окна
  const authModal = new bootstrap.Modal(document.getElementById('auth-modal'));
  
  // Проверяем, авторизован ли пользователь
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));
  const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
  
  // Показываем тестовые товары (в реальном приложении это будет на странице каталога)
  document.getElementById('test-products').classList.remove('hidden');
  
  // Если пользователь авторизован, загружаем избранное
  if (currentUser) {
    loadFavorites();
  }
  
  // Обработчик клика на кнопку избранного
  document.querySelectorAll('.favorite-btn').forEach(btn => {
    btn.addEventListener('click', function(e) {
      e.preventDefault();
      const productId = this.getAttribute('data-product-id');
      
      // Если пользователь не авторизован, показываем модальное окно входа
      if (!currentUser) {
        authModal.show();
        return;
      }
      
      // Добавляем/удаляем из избранного
      toggleFavorite(productId, this);
    });
  });
  
  // Обработчик формы входа
  document.getElementById('login-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;
    
    // Простая проверка (в реальном приложении нужно проверять с сервером)
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(u => u.email === email && u.password === password);
    
    if (user) {
      localStorage.setItem('currentUser', JSON.stringify(user));
      authModal.hide();
      location.reload(); // Перезагружаем страницу для обновления состояния
    } else {
      alert('Неверный email или пароль');
    }
  });
  
  // Функция переключения избранного
  function toggleFavorite(productId, button) {
    const index = favorites.indexOf(productId);
    
    if (index === -1) {
      // Добавляем в избранное
      favorites.push(productId);
      button.classList.add('active', 'heart-animation');
      button.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#dc3545" class="bi-heart-fill" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"/></svg>';
    } else {
      // Удаляем из избранного
      favorites.splice(index, 1);
      button.classList.remove('active');
      button.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi-heart" viewBox="0 0 16 16"><path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z"/></svg>';
    }
    
    // Сохраняем изменения
    localStorage.setItem('favorites', JSON.stringify(favorites));
    
    // Если мы на странице избранного, обновляем список
    if (window.location.pathname.includes('wishlist.html')) {
      loadFavorites();
    }
    
    // Удаляем анимацию после завершения
    setTimeout(() => {
      button.classList.remove('heart-animation');
    }, 1000);
  }
  
  // Функция загрузки избранного
  function loadFavorites() {
    const favoritesList = document.getElementById('favorites-list');
    const emptyMessage = document.getElementById('favorites-empty');
    
    // Очищаем список
    favoritesList.innerHTML = '';
    
    if (favorites.length === 0) {
      favoritesList.classList.add('hidden');
      emptyMessage.classList.remove('hidden');
      return;
    }
    
    // В реальном приложении здесь будет запрос к API для получения данных о товарах
    // Для демонстрации используем тестовые данные
    const testProducts = [
      {
        id: '1',
        title: 'Григорьев Иннокентий - Красота вечности',
        description: 'Серебро, ручная работа.',
        price: '70.000 рублей',
        image: 'images/Ilin-Kebier.png',
        discount: '-30%'
      },
      {
        id: '2',
        title: 'Иванова Юлия Арсеньевна - Лицо-чашка',
        description: 'Глина, гончарство, ручная работа, в наличии',
        price: '600 рублей',
        image: 'images/popular/in_stock/Face-cup.jpg'
      }
    ];
    
    // Фильтруем только избранные товары
    const favoriteProducts = testProducts.filter(product => favorites.includes(product.id));
    
    // Добавляем товары в список
    favoriteProducts.forEach(product => {
      const col = document.createElement('div');
      col.className = 'col';
      
      col.innerHTML = `
        <div class="product-item card h-100">
          ${product.discount ? `<span class="badge bg-success position-absolute m-3">${product.discount}</span>` : ''}
          <button class="btn btn-sm btn-outline-secondary favorite-btn position-absolute top-0 end-0 m-3 active" data-product-id="${product.id}">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#dc3545" class="bi-heart-fill" viewBox="0 0 16 16">
              <path fill-rule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"/>
            </svg>
          </button>
          <img src="${product.image}" class="tab-image" alt="${product.title}">
          <div class="card-body">
            <h5 class="card-title">${product.title}</h5>
            <p class="card-text">${product.description}</p>
            <p class="price">${product.price}</p>
          </div>
          <div class="card-footer bg-transparent">
            <a href="product-singleKesh.html" class="buy-button w-100 text-decoration-none text-center">Посмотреть</a>
          </div>
        </div>
      `;
      
      favoritesList.appendChild(col);
    });
    
    // Добавляем обработчики для новых кнопок
    favoritesList.querySelectorAll('.favorite-btn').forEach(btn => {
      btn.addEventListener('click', function(e) {
        e.preventDefault();
        const productId = this.getAttribute('data-product-id');
        toggleFavorite(productId, this);
      });
    });
    
    favoritesList.classList.remove('hidden');
    emptyMessage.classList.add('hidden');
  }
});