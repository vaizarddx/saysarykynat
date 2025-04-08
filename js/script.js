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

  // init Chocolat light box
	var initChocolat = function() {
		Chocolat(document.querySelectorAll('.image-link'), {
		  imageSize: 'contain',
		  loop: true,
		})
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

  // init jarallax parallax
  var initJarallax = function() {
    jarallax(document.querySelectorAll(".jarallax"));

    jarallax(document.querySelectorAll(".jarallax-keep-img"), {
      keepImg: true,
    });
  }

  // document ready
  $(document).ready(function() {
    
    initPreloader();
    initSwiper();
    initProductQty();
    initJarallax();
    initChocolat();

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


 // Фильтрация мастеров
 document.querySelectorAll('.filter-btn').forEach(btn => {
  btn.addEventListener('click', function() {
      document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      this.classList.add('active');
      
      const filter = this.getAttribute('data-filter');
      const masters = document.querySelectorAll('#masters-grid > div');
      
      masters.forEach(master => {
          if (filter === 'all' || master.getAttribute('data-category') === filter) {
              master.style.display = 'block';
              master.classList.add('animate__animated', 'animate__fadeIn');
          } else {
              master.style.display = 'none';
          }
      });
  });
});

 

 // Валидация и отправка формы
 (function() {
  const form = document.getElementById('feedbackForm');
  
  form.addEventListener('submit', function(event) {
    event.preventDefault();
    
    if (!form.checkValidity()) {
      event.stopPropagation();
      form.classList.add('was-validated');
      return;
    }
    
    // Здесь должна быть AJAX-отправка формы
    // Для примера просто покажем модальное окно
    const modal = new bootstrap.Modal(document.getElementById('successModal'));
    modal.show();
    
    // Очистка формы
    form.reset();
    form.classList.remove('was-validated');
    
    // Пример AJAX-запроса (раскомментируйте для использования):
    
    const formData = new FormData(form);
    fetch('send-form.php', {
      method: 'POST',
      body: formData
    })
    .then(response => response.json())
    .then(data => {
      if(data.success) {
        const modal = new bootstrap.Modal(document.getElementById('successModal'));
        modal.show();
        form.reset();
      }
    });
    
  }, false);
})();




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

// Плавная прокрутка для якорей
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
      e.preventDefault();
      document.querySelector(this.getAttribute('href')).scrollIntoView({
          behavior: 'smooth'
      });
  });
});

document.addEventListener('DOMContentLoaded', function() {
  // Элементы страницы
  const favoritesList = document.getElementById('favorites-list');
  const emptyMessage = document.getElementById('favorites-empty');
  
  // Функция для отображения избранных товаров
  function displayFavorites() {
      // Получаем избранное из localStorage
      const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
      
      // Очищаем список
      favoritesList.innerHTML = '';
      
      if (favorites.length === 0) {
          // Показываем сообщение, если избранное пусто
          emptyMessage.classList.remove('d-none');
          favoritesList.classList.add('d-none');
      } else {
          // Скрываем сообщение, если есть товары
          emptyMessage.classList.add('d-none');
          favoritesList.classList.remove('d-none');
          
          // Добавляем каждый товар в список
          favorites.forEach(item => {
              const productCard = `
                  <div class="col" data-id="${item.id}">
                      <div class="card h-100">
                          <div class="position-relative">
                              <img src="${item.image}" class="card-img-top" alt="${item.title}">
                              <button class="btn btn-sm btn-danger position-absolute top-0 end-0 m-2 remove-favorite" data-id="${item.id}">
                                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                                      <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                                      <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
                                  </svg>
                              </button>
                          </div>
                          <div class="card-body">
                              <h5 class="card-title">${item.title}</h5>
                              <p class="card-text text-muted">${item.author}</p>
                              <div class="d-flex justify-content-between align-items-center">
                                  <span class="fw-bold">${item.price} ₽</span>
                                  <button class="btn btn-sm btn-outline-primary add-to-cart" data-id="${item.id}">В корзину</button>
                              </div>
                          </div>
                      </div>
                  </div>
              `;
              favoritesList.insertAdjacentHTML('beforeend', productCard);
          });
      }
  }
  
  // Удаление из избранного
  favoritesList.addEventListener('click', function(e) {
      if (e.target.closest('.remove-favorite')) {
          const productId = e.target.closest('.remove-favorite').getAttribute('data-id');
          removeFromFavorites(productId);
          displayFavorites();
      }
  })
  
  // Функция удаления из избранного
  function removeFromFavorites(productId) {
      let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
      favorites = favorites.filter(item => item.id !== productId);
      localStorage.setItem('favorites', JSON.stringify(favorites));
      
      // Обновляем счетчик в header
      updateFavoritesCounter();
  }
  
  // Инициализация страницы
  displayFavorites();
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

// Функция добавления/удаления из избранного
function toggleFavorite(product) {
  let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
  
  // Проверяем, есть ли уже товар в избранном
  const existingIndex = favorites.findIndex(item => item.id === product.id);
  
  if (existingIndex >= 0) {
      // Удаляем, если уже есть
      favorites.splice(existingIndex, 1);
  } else {
      // Добавляем, если нет
      favorites.push(product);
  }
  
  localStorage.setItem('favorites', JSON.stringify(favorites));
  updateFavoritesCounter();
  
  // Возвращаем новое состояние (добавлен/удален)
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