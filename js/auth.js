document.addEventListener('DOMContentLoaded', function() {
  // Скрываем прелоадер
  setTimeout(() => {
    document.querySelector('.preloader-wrapper').style.display = 'none';
  }, 500);

  // Обработчик формы регистрации
  if (document.getElementById('registration-form')) {
    document.getElementById('registration-form').addEventListener('submit', function(e) {
      e.preventDefault();
      
      const firstName = document.getElementById('firstName').value;
      const lastName = document.getElementById('lastName').value;
      const email = document.getElementById('email').value;
      const password = document.getElementById('password').value;
      const confirmPassword = document.getElementById('confirmPassword').value;
      const birthDate = document.getElementById('birthDate').value;
      const gender = document.querySelector('input[name="gender"]:checked').value;
      
      // Простая валидация
      if (password !== confirmPassword) {
        alert('Пароли не совпадают!');
        return;
      }
      
      if (password.length < 8) {
        alert('Пароль должен содержать минимум 8 символов!');
        return;
      }
      
      // Создаем объект пользователя
      const user = {
        firstName,
        lastName,
        email,
        password, // В реальном приложении пароль нужно хэшировать!
        birthDate,
        gender,
        bio: 'Пока ничего не рассказал о себе',
        avatar: 'https://via.placeholder.com/120'
      };
      
      // Сохраняем пользователя
      localStorage.setItem('currentUser', JSON.stringify(user));
      
      // Перенаправляем на страницу профиля
      window.location.href = 'profile2.html';
    });
  }

  // Обработчик формы входа
  if (document.getElementById('login-form')) {
    document.getElementById('login-form').addEventListener('submit', function(e) {
      e.preventDefault();
      
      const email = document.getElementById('login-email').value;
      const password = document.getElementById('login-password').value;
      
      // В реальном приложении здесь был бы запрос к серверу
      // Для демонстрации просто проверяем, есть ли пользователь
      const user = JSON.parse(localStorage.getItem('currentUser'));
      
      if (user && user.email === email && user.password === password) {
        // Перенаправляем на страницу профиля
        window.location.href = 'profile2.html';
      } else {
        alert('Неверный email или пароль');
      }
    });
  }
});