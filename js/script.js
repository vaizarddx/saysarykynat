(function($) {

  "use strict";

  var initPreloader = function() {
    $(document).ready(function($) {
    var Body = $('body');
        Body.addClass('preloader-site');
    });
    $(window).load(function() {
        $('.preloader-wrapper').fadeOut();
        $('body').removeClass('preloader-site');
    });
  }


  var initSwiper = function() {

    var swiper = new Swiper(".main-swiper", {
      speed: 500,
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
    });

    var category_swiper = new Swiper(".category-carousel", {
      slidesPerView: 6,
      spaceBetween: 30,
      speed: 500,
      navigation: {
        nextEl: ".category-carousel-next",
        prevEl: ".category-carousel-prev",
      },
      breakpoints: {
        0: {
          slidesPerView: 2,
        },
        768: {
          slidesPerView: 3,
        },
        991: {
          slidesPerView: 4,
        },
        1500: {
          slidesPerView: 6,
        },
      }
    });

    var brand_swiper = new Swiper(".brand-carousel", {
      slidesPerView: 4,
      spaceBetween: 30,
      speed: 500,
      navigation: {
        nextEl: ".brand-carousel-next",
        prevEl: ".brand-carousel-prev",
      },
      breakpoints: {
        0: {
          slidesPerView: 2,
          spaceBetween: 15,
        },
        768: {
          slidesPerView: 2,
        },
        991: {
          slidesPerView: 3,
        },
        1500: {
          slidesPerView: 4,
        },
      }
    });

    var products_swiper = new Swiper(".products-carousel", {
      slidesPerView: 5,
      spaceBetween: 30,
      speed: 500,
      navigation: {
        nextEl: ".products-carousel-next",
        prevEl: ".products-carousel-prev",
      },
      breakpoints: {
        0: {
          slidesPerView: 1,
        },
        768: {
          slidesPerView: 3,
        },
        991: {
          slidesPerView: 4,
        },
        1500: {
          slidesPerView: 6,
        },
      }
    });
  }

  var initProductQty = function(){

    $('.product-qty').each(function(){

      var $el_product = $(this);
      var quantity = 0;

      $el_product.find('.quantity-right-plus').click(function(e){
          e.preventDefault();
          var quantity = parseInt($el_product.find('#quantity').val());
          $el_product.find('#quantity').val(quantity + 1);
      });

      $el_product.find('.quantity-left-minus').click(function(e){
          e.preventDefault();
          var quantity = parseInt($el_product.find('#quantity').val());
          if(quantity>0){
            $el_product.find('#quantity').val(quantity - 1);
          }
      });

    });

  }


  // document ready
  $(document).ready(function() {
    
    initPreloader();
    initSwiper();


  }); // End of a document

})(jQuery);

// Показ/скрытие кнопки
window.addEventListener('scroll', function() {
  const backToTop = document.getElementById('backToTop');
  if (window.pageYOffset > 300) {
    backToTop.classList.add('show');
  } else {
    backToTop.classList.remove('show');
  }
});

// Плавная прокрутка
document.getElementById('backToTop').addEventListener('click', function(e) {
  e.preventDefault();
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});

document.addEventListener('DOMContentLoaded', function() {
  const header = document.querySelector('header');
  const headerHeight = header.offsetHeight;
  
  // Функция для обработки скролла
  function handleScroll() {
    if (window.scrollY > headerHeight) {
      header.classList.add('header-sticky');
      document.body.classList.add('sticky-header-active');
    } else {
      header.classList.remove('header-sticky');
      document.body.classList.remove('sticky-header-active');
    }
  }

  // Оптимизация обработчика скролла
  let isScrolling;
  window.addEventListener('scroll', function() {
    window.clearTimeout(isScrolling);
    isScrolling = setTimeout(handleScroll, 50);
  }, false);

  // Инициализация при загрузке
  handleScroll();
});



 






// Кнопка "Наверх"
window.addEventListener('scroll', function() {
  const backToTop = document.getElementById('backToTop');
  if (window.pageYOffset > 300) {
    backToTop.style.display = 'block';
  } else {
    backToTop.style.display = 'none';
  }
});

document.getElementById('backToTop').addEventListener('click', function() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});

 // Ленивая загрузка изображений
 document.addEventListener("DOMContentLoaded", function() {
  const lazyImages = [].slice.call(document.querySelectorAll("img.lazy"));
  
  if ("IntersectionObserver" in window) {
      let lazyImageObserver = new IntersectionObserver(function(entries, observer) {
          entries.forEach(function(entry) {
              if (entry.isIntersecting) {
                  let lazyImage = entry.target;
                  lazyImage.src = lazyImage.dataset.src;
                  lazyImage.classList.remove("lazy");
                  lazyImageObserver.unobserve(lazyImage);
              }
          });
      });
      
      lazyImages.forEach(function(lazyImage) {
          lazyImageObserver.observe(lazyImage);
      });
  }
});



// Функция для обновления счетчика в header (должна быть доступна глобально)
function updateFavoritesCounter() {
  const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
  const counters = document.querySelectorAll('.favorites-counter');
  
  counters.forEach(counter => {
      counter.textContent = favorites.length;
      counter.style.display = favorites.length > 0 ? 'inline-block' : 'none';
  });
}



// Обработчик кликов на кнопки избранного
document.addEventListener('DOMContentLoaded', function() {
  document.body.addEventListener('click', function(e) {
      if (e.target.closest('.favorite-btn')) {
          const btn = e.target.closest('.favorite-btn');
          const product = {
              id: btn.getAttribute('data-id'),
              title: btn.getAttribute('data-title'),
              author: btn.getAttribute('data-author'),
              price: btn.getAttribute('data-price'),
              image: btn.getAttribute('data-image')
          };
          
          const isAdded = toggleFavorite(product);
          
          // Меняем иконку
          const icon = btn.querySelector('svg');
          if (isAdded) {
              icon.classList.remove('bi-heart');
              icon.classList.add('bi-heart-fill', 'text-danger');
          } else {
              icon.classList.remove('bi-heart-fill', 'text-danger');
              icon.classList.add('bi-heart');
          }
      }
  });
  
  // Инициализация счетчика при загрузке
  updateFavoritesCounter();
});


// Функция для работы с избранным
function toggleFavorite(product) {
  let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
  const existingIndex = favorites.findIndex(item => item.id === product.id);
  
  if (existingIndex >= 0) {
      favorites.splice(existingIndex, 1);
  } else {
      favorites.push(product);
  }
  
  localStorage.setItem('favorites', JSON.stringify(favorites));
  updateFavoritesCounter();
  return existingIndex === -1;
}

// Обработчик кликов на кнопки избранного
document.addEventListener('DOMContentLoaded', function() {
  document.body.addEventListener('click', function(e) {
      if (e.target.closest('.favorite-btn')) {
          const btn = e.target.closest('.favorite-btn');
          const product = {
              id: btn.getAttribute('data-id'),
              title: btn.getAttribute('data-title'),
              author: btn.getAttribute('data-author'),
              price: btn.getAttribute('data-price'),
              image: btn.getAttribute('data-image')
          };
          
          const isAdded = toggleFavorite(product);
          const icon = btn.querySelector('svg');
          
          if (isAdded) {
              icon.classList.remove('bi-heart');
              icon.classList.add('bi-heart-fill', 'text-danger');
          } else {
              icon.classList.remove('bi-heart-fill', 'text-danger');
              icon.classList.add('bi-heart');
          }
      }
  });
  
  // Инициализация состояния кнопок при загрузке
  document.querySelectorAll('.favorite-btn').forEach(btn => {
      const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
      const productId = btn.getAttribute('data-id');
      const icon = btn.querySelector('svg');
      
      if (favorites.some(item => item.id === productId)) {
          icon.classList.remove('bi-heart');
          icon.classList.add('bi-heart-fill', 'text-danger');
      }
  });
});

// Обновление счетчика в шапке
function updateFavoritesCounter() {
  const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
  const counters = document.querySelectorAll('.favorites-counter');
  
  counters.forEach(counter => {
      counter.textContent = favorites.length;
      counter.style.display = favorites.length > 0 ? 'inline-block' : 'none';
  });
}

document.addEventListener('DOMContentLoaded', function() {
  // Инициализация слайдера миниатюр
  const thumbsSwiper = new Swiper('.thumbs-swiper', {
    spaceBetween: 10,
    slidesPerView: 3,
    freeMode: true,
    watchSlidesProgress: true,
  });

  // Инициализация основного слайдера
  const swiper = new Swiper('.main-gallery', {
    // Настройки навигации
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    // Другие настройки
    loop: true,
    slidesPerView: 1,
    spaceBetween: 20
  }); 
});

 // Инициализация свайпера
 document.addEventListener('DOMContentLoaded', function() {
  new Swiper('.featured-products', {
      slidesPerView: 1,
      spaceBetween: 20,
      navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
      },
      breakpoints: {
          768: {
              slidesPerView: 2,
          },
          992: {
              slidesPerView: 3,
          }
      }
  });
});

  // Улучшенный скрипт для определения текущей страницы
  document.addEventListener('DOMContentLoaded', function() {
    // Получаем текущий URL
    const currentPath = window.location.pathname;
    
    // Определяем имя страницы
    let currentPage = currentPath.split('/').pop().replace('.html', '');
    
    // Если мы на главной странице (путь заканчивается на / или /index.html)
    if (currentPath.endsWith('/') || currentPage === 'index' || currentPage === '') {
      currentPage = 'index';
    }
    
    // Находим все ссылки меню
    const menuLinks = document.querySelectorAll('.menu-link');
    
    // Добавляем класс active к соответствующей ссылке
    menuLinks.forEach(link => {
      if (link.getAttribute('data-page') === currentPage) {
        link.classList.add('active');
        
        // Для мобильного меню (оффканвас) тоже добавляем active
        const mobileLink = document.querySelector(`.offcanvas .menu-link[data-page="${currentPage}"]`);
        if (mobileLink) {
          mobileLink.classList.add('active');
        }
      }
    });
  });


  document.addEventListener('DOMContentLoaded', function() {
    // Элементы управления
    const darkModeToggle = document.getElementById('darkModeToggle');
    const increaseFont = document.getElementById('increaseFont');
    const decreaseFont = document.getElementById('decreaseFont');
    const normalFont = document.getElementById('normalFont');
    const highContrast = document.getElementById('highContrast');
    const body = document.body;
    
    // Загрузка сохраненных настроек
    function loadSettings() {
      // Темная тема
      if (localStorage.getItem('darkMode') === 'true' || 
          (localStorage.getItem('darkMode') === null && 
           window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        body.classList.add('dark-mode');
      }
      
      // Размер шрифта
      const savedFontSize = localStorage.getItem('fontSize');
      if (savedFontSize) {
        document.body.style.fontSize = savedFontSize + 'px';
      }
      
      // Высокая контрастность
      if (localStorage.getItem('highContrast') === 'true') {
        body.classList.add('high-contrast');
      }
    }
    
    // Инициализация
    loadSettings();
    
    // Обработчики событий
    darkModeToggle.addEventListener('click', function() {
      body.classList.toggle('dark-mode');
      localStorage.setItem('darkMode', body.classList.contains('dark-mode'));
    });
    
    increaseFont.addEventListener('click', function() {
      const currentSize = parseFloat(getComputedStyle(body).fontSize) || 16;
      const newSize = currentSize + 1;
      body.style.fontSize = newSize + 'px';
      localStorage.setItem('fontSize', newSize);
    });
    
    decreaseFont.addEventListener('click', function() {
      const currentSize = parseFloat(getComputedStyle(body).fontSize) || 16;
      const newSize = Math.max(12, currentSize - 1);
      body.style.fontSize = newSize + 'px';
      localStorage.setItem('fontSize', newSize);
    });
    
    normalFont.addEventListener('click', function() {
      body.style.fontSize = '16px';
      localStorage.setItem('fontSize', 16);
    });
    
  });


 const products = [
  {
    id: 1,
    title: "Лицо-чашка",
    author: "Иванова Юлия",
    material: "Глина, ручная работа",
    price: "600 рублей",
    image: "images//popular/in_stock/Face-cup.jpg",
    link: "product-singleJul.html",
    discount: "-10%"
  },
  // Добавьте другие товары по аналогии
  {
    id: 2,
    title: "Красота Вечности",
    author: "Григорьев Иннокентий",
    material: "Серебро, ручная работа",
    price: "70 000 рублей",
    image: "images/Ilin-Kebier.png",
    link: "product-singleKesh.htm",
    discount: null
  }
];

// Функция для поиска товаров
function searchProducts(query) {
  if (!query) return [];
  
  const lowerQuery = query.toLowerCase();
  
  return products.filter(product => {
    return (
      product.title.toLowerCase().includes(lowerQuery) ||
      product.author.toLowerCase().includes(lowerQuery) ||
      product.material.toLowerCase().includes(lowerQuery) ||
      product.price.toLowerCase().includes(lowerQuery)
    );
  });
}

// Функция для отображения результатов
function displayResults(results) {
  const resultsContainer = document.getElementById('searchResults');
  resultsContainer.innerHTML = '';
  
  if (results.length === 0) {
    resultsContainer.innerHTML = `
      <div class="no-results">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" class="mb-2">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
        </svg>
        <div>Ничего не найдено</div>
      </div>
    `;
    resultsContainer.style.display = 'block';
    return;
  }
  
  results.forEach(product => {
    const item = document.createElement('div');
    item.className = 'search-result-item';
    item.innerHTML = `
      <img src="${product.image}" alt="${product.title}" class="search-result-img">
      <div class="search-result-content">
        <div class="search-result-title">${product.title}</div>
        <div class="search-result-author">${product.author}</div>
        <div class="search-result-meta">
          <span class="search-result-price">${product.price}</span>
          <span class="search-result-material">${product.material}</span>
        </div>
      </div>
    `;
    
    item.addEventListener('click', function() {
      window.location.href = product.link;
    });
    
    resultsContainer.appendChild(item);
  });
  
  resultsContainer.style.display = 'block';
}

// Обработчик для скрытия результатов при клике вне области поиска
document.addEventListener('click', function(e) {
  const searchContainer = document.getElementById('searchContainer');
  const searchResults = document.getElementById('searchResults');
  
  if (!searchContainer.contains(e.target)) {
    searchResults.style.display = 'none';
  }
});

// Обработка формы поиска
document.getElementById('searchForm').addEventListener('submit', function(e) {
  e.preventDefault();
  const query = document.getElementById('searchInput').value.trim();
  const results = searchProducts(query);
  displayResults(results);
});

// Обработка ввода в реальном времени
document.getElementById('searchInput').addEventListener('input', function() {
  const query = this.value.trim();
  if (query.length >= 2) {
    const results = searchProducts(query);
    displayResults(results);
  } else {
    document.getElementById('searchResults').innerHTML = '';
  }
});

// Показать/скрыть поисковую строку
document.querySelectorAll('[id^="mobile-search-toggle"], [id^="desktop-search-toggle"]').forEach(btn => {
  btn.addEventListener('click', function() {
    const searchContainer = document.getElementById('searchContainer');
    const bsCollapse = new bootstrap.Collapse(searchContainer, {
      toggle: true
    });
    
    // Фокус на поле ввода при открытии
    if (!searchContainer.classList.contains('show')) {
      setTimeout(() => {
        document.getElementById('searchInput').focus();
      }, 300);
    }
  });
});




function sendMail() {
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  
  window.location.href = `mailto:juliaivanova.04@mail.ru?subject=Заявка с сайта&body=Имя: ${name}%0AEmail: ${email}`;
}
  


//поисковая стрка
document.addEventListener('DOMContentLoaded', function() {
  // Общая поисковая строка
  const searchContainer = document.getElementById('searchContainer');
  const bsSearchCollapse = new bootstrap.Collapse(searchContainer, { toggle: false });
  
  // Обработчики для десктопной и мобильной версии
  document.getElementById('desktop-search-toggle')?.addEventListener('click', toggleSearch);
  document.getElementById('mobile-search-toggle')?.addEventListener('click', toggleSearch);
  
  function toggleSearch() {
    bsSearchCollapse.toggle();
    
    // Прокрутка к верху, если поиск открывается
    if (!searchContainer.classList.contains('show')) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }
  
  // Закрытие поиска при клике вне области
  document.addEventListener('click', function(event) {
    if (!searchContainer.contains(event.target) && 
        event.target.id !== 'desktop-search-toggle' && 
        event.target.id !== 'mobile-search-toggle' &&
        !event.target.closest('#desktop-search-toggle') &&
        !event.target.closest('#mobile-search-toggle')) {
      bsSearchCollapse.hide();
    }
  });
});




