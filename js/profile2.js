document.addEventListener('DOMContentLoaded', function() {
  // Скрываем прелоадер
  setTimeout(() => {
    document.querySelector('.preloader-wrapper').style.display = 'none';
  }, 500);

  // Проверяем, авторизован ли пользователь
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));
  if (!currentUser) {
    window.location.href = 'login.html';
    return;
  }

  // Заполняем данные профиля
  showProfile(currentUser);

  // Обработчик кнопки выхода
  document.getElementById('logout-btn').addEventListener('click', function() {
    localStorage.removeItem('currentUser');
    window.location.href = 'login.html';
  });
  
  // Обработчик загрузки аватарки
  document.querySelector('.avatar-upload').addEventListener('click', function() {
    document.getElementById('avatar-input').click();
  });
  
  document.getElementById('avatar-input').addEventListener('change', function(e) {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function(event) {
        const user = JSON.parse(localStorage.getItem('currentUser'));
        user.avatar = event.target.result;
        localStorage.setItem('currentUser', JSON.stringify(user));
        document.getElementById('profile-avatar').src = event.target.result;
      };
      reader.readAsDataURL(file);
    }
  });
  
  // Обработчик кнопки редактирования профиля
  document.getElementById('edit-profile-btn').addEventListener('click', function() {
    const user = JSON.parse(localStorage.getItem('currentUser'));
    
    // Показываем поля редактирования
    document.getElementById('profile-birthdate').classList.add('hidden');
    document.getElementById('edit-birthdate').classList.remove('hidden');
    document.getElementById('edit-birthdate').value = user.birthDate || '';
    
    document.getElementById('profile-gender').classList.add('hidden');
    document.getElementById('edit-gender').classList.remove('hidden');
    document.getElementById(`edit-${user.gender}`).checked = true;
    
    document.getElementById('profile-bio').classList.add('hidden');
    document.getElementById('edit-bio').classList.remove('hidden');
    document.getElementById('edit-bio').value = user.bio || '';
    
    document.getElementById('save-changes-container').classList.remove('hidden');
    document.getElementById('edit-profile-btn').classList.add('hidden');
  });
  
  // Обработчик кнопки сохранения изменений
  document.getElementById('save-changes-btn').addEventListener('click', function() {
    const user = JSON.parse(localStorage.getItem('currentUser'));
    
    user.birthDate = document.getElementById('edit-birthdate').value;
    user.gender = document.querySelector('input[name="edit-gender"]:checked').value;
    user.bio = document.getElementById('edit-bio').value;
    
    localStorage.setItem('currentUser', JSON.stringify(user));
    showProfile(user);
  });
  
  // Обработчик кнопки отмены редактирования
  document.getElementById('cancel-edit-btn').addEventListener('click', function() {
    showProfile(JSON.parse(localStorage.getItem('currentUser')));
  });
});

function showProfile(user) {
  // Заполняем данные профиля
  document.getElementById('profile-name').textContent = `${user.firstName} ${user.lastName}`;
  document.getElementById('profile-email').textContent = user.email;
  document.getElementById('profile-avatar').src = user.avatar;
  document.getElementById('profile-birthdate').textContent = user.birthDate || 'Не указана';
  document.getElementById('profile-gender').textContent = user.gender === 'male' ? 'Мужской' : 'Женский';
  document.getElementById('profile-bio').textContent = user.bio || 'Пока ничего не рассказал о себе';
  
  // Скрываем поля редактирования
  document.getElementById('profile-birthdate').classList.remove('hidden');
  document.getElementById('edit-birthdate').classList.add('hidden');
  
  document.getElementById('profile-gender').classList.remove('hidden');
  document.getElementById('edit-gender').classList.add('hidden');
  
  document.getElementById('profile-bio').classList.remove('hidden');
  document.getElementById('edit-bio').classList.add('hidden');
  
  document.getElementById('save-changes-container').classList.add('hidden');
  document.getElementById('edit-profile-btn').classList.remove('hidden');
}