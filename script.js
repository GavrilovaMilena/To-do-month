// Список месяцев
const MONTHS_LIST = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];

// Функция для получения текущего месяца
function getCurrentMonth() {
  const now = new Date();
  const monthIndex = now.getMonth();
  return MONTHS_LIST[monthIndex];
}

// Текущий выбранный месяц
let currentMonth = getCurrentMonth();

// Все данные
let allTasks = {};

// Стандартные цвета
const defaultColors = {
  bgColor1: '#fdeef9',
  bgColor2: '#f5e6fa',
  containerBg: '#fff8fa',
  titleColor: '#b96f9f',
  subtitleColor: '#aa7bc3',
  activeMonthBg: '#e2c7e9',
  buttonColor: '#e5bddc',
  cardBg: '#ffffff'
};

// Текущие цвета
let currentColors = { ...defaultColors };

// Загрузка сохраненных цветов
function loadColors() {
  const savedColors = localStorage.getItem('softPlannerColors');
  if (savedColors) {
    try {
      const parsed = JSON.parse(savedColors);
      currentColors = { ...defaultColors, ...parsed };
    } catch(e) {
      console.error('Ошибка загрузки цветов', e);
    }
  }
  applyColors();
}

// Применение цветов к странице
function applyColors() {
  // Фон body с градиентом
  document.body.style.background = `linear-gradient(145deg, ${currentColors.bgColor1} 0%, ${currentColors.bgColor2} 100%)`;
  
  // Фон контейнера
  const container = document.querySelector('.container');
  if (container) {
    container.style.background = currentColors.containerBg;
  }
  
  // Цвет заголовка
  const title = document.querySelector('h1');
  if (title) title.style.color = currentColors.titleColor;
  
  // Цвет подзаголовка
  const subtitle = document.querySelector('.subtitle');
  if (subtitle) subtitle.style.color = currentColors.subtitleColor;
  
  // Цвет заголовка месяца в туду-листе
  const monthTitle = document.getElementById('monthTitle');
  if (monthTitle) monthTitle.style.color = currentColors.titleColor;
  
  // Применяем цвет для активных кнопок месяцев
  const activeBtns = document.querySelectorAll('.month-btn.active');
  activeBtns.forEach(btn => {
    btn.style.background = currentColors.activeMonthBg;
  });
  
  // Применяем цвет для кнопок добавления и других (кроме кнопок в карточках)
  const addButton = document.getElementById('addButton');
  if (addButton) addButton.style.background = currentColors.buttonColor;
  
  const customizeBtn = document.getElementById('customizeBtn');
  if (customizeBtn) customizeBtn.style.background = `linear-gradient(135deg, ${currentColors.buttonColor}, ${adjustColor(currentColors.buttonColor, -20)})`;
  
  const saveColorsBtn = document.getElementById('saveColorsBtn');
  if (saveColorsBtn) saveColorsBtn.style.background = `linear-gradient(135deg, ${currentColors.buttonColor}, ${adjustColor(currentColors.buttonColor, -20)})`;
  
  // Цвет карточек задач
  const taskCards = document.querySelectorAll('.task-card');
  taskCards.forEach(card => {
    card.style.background = currentColors.cardBg;
  });
}

// Вспомогательная функция для затемнения цвета
function adjustColor(color, percent) {
  const num = parseInt(color.replace('#', ''), 16);
  const amt = Math.round(2.55 * percent);
  const R = Math.min(255, Math.max(0, (num >> 16) + amt));
  const G = Math.min(255, Math.max(0, ((num >> 8) & 0x00FF) + amt));
  const B = Math.min(255, Math.max(0, (num & 0x0000FF) + amt));
  return `#${(0x1000000 + R * 0x10000 + G * 0x100 + B).toString(16).slice(1)}`;
}

// Сохранение цветов
function saveColors() {
  localStorage.setItem('softPlannerColors', JSON.stringify(currentColors));
  applyColors();
}

// Инициализация данных задач
function initData() {
  const saved = localStorage.getItem('softPlannerData');
  
  if (saved) {
    try {
      allTasks = JSON.parse(saved);
      for (let month of MONTHS_LIST) {
        if (!allTasks[month]) {
          allTasks[month] = [];
        }
      }
    } catch(e) {
      console.error('Ошибка загрузки', e);
      createDefaultData();
    }
  } else {
    createDefaultData();
  }
  
  if (!allTasks[currentMonth]) {
    allTasks[currentMonth] = [];
  }
}

// Создание демо-данных
function createDefaultData() {
  allTasks = {};
  for (let month of MONTHS_LIST) {
    allTasks[month] = [];
  }
  
  allTasks['Март'] = [
    { id: Date.now() + '1', text: 'Завершить важный проект', done: false },
    { id: Date.now() + '2', text: 'Купить подарок для друга', done: true },
    { id: Date.now() + '3', text: 'Начать учить испанский', done: false },
    { id: Date.now() + '4', text: 'Записаться на спорт', done: false }
  ];
  
  allTasks['Апрель'] = [
    { id: Date.now() + '5', text: 'Посадить цветы на балконе', done: false },
    { id: Date.now() + '6', text: 'Сходить к стоматологу', done: false },
    { id: Date.now() + '7', text: 'Прочитать новую книгу', done: false }
  ];
  
  allTasks['Май'] = [
    { id: Date.now() + '8', text: 'Спланировать отпуск', done: false },
    { id: Date.now() + '9', text: 'Купить новые кроссовки', done: true }
  ];
  
  allTasks['Июнь'] = [
    { id: Date.now() + '10', text: 'Поехать на море', done: false }
  ];
}

// Сохранение в localStorage
function saveData() {
  localStorage.setItem('softPlannerData', JSON.stringify(allTasks));
}

// Генерация уникального ID
function generateId() {
  return Date.now() + '-' + Math.random().toString(36).substr(2, 6);
}

// Отображение кнопок месяцев
function renderMonths() {
  const bar = document.getElementById('monthsBar');
  if (!bar) return;
  
  bar.innerHTML = '';
  for (let month of MONTHS_LIST) {
    const btn = document.createElement('button');
    btn.textContent = month;
    btn.className = 'month-btn';
    if (month === currentMonth) {
      btn.classList.add('active');
      btn.style.background = currentColors.activeMonthBg;
    }
    btn.onclick = function() {
      currentMonth = month;
      renderMonths();
      renderTasks();
    };
    bar.appendChild(btn);
  }
}

// Отображение задач для текущего месяца
function renderTasks() {
  const container = document.getElementById('tasksContainer');
  const monthTitle = document.getElementById('monthTitle');
  const counterSpan = document.getElementById('counter');
  
  if (!container) return;
  
  const tasks = allTasks[currentMonth] || [];
  monthTitle.innerHTML = `🌸 ${currentMonth} · мои планы`;
  monthTitle.style.color = currentColors.titleColor;
  
  const activeCount = tasks.filter(t => !t.done).length;
  counterSpan.textContent = `${tasks.length} задач, ${activeCount} в работе`;
  
  if (tasks.length === 0) {
    container.innerHTML = '<div class="empty-state">✨ В этом месяце пока нет задач. Добавьте что-нибудь прекрасное! ✨</div>';
    return;
  }
  
  container.innerHTML = '';
  
  for (let task of tasks) {
    const taskDiv = document.createElement('div');
    taskDiv.className = 'task-card';
    taskDiv.style.background = currentColors.cardBg;
    
    const infoDiv = document.createElement('div');
    infoDiv.className = 'task-info';
    
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.className = 'task-check';
    checkbox.checked = task.done;
    checkbox.onchange = function() {
      task.done = checkbox.checked;
      saveData();
      renderTasks();
    };
    
    const textSpan = document.createElement('span');
    textSpan.className = 'task-text' + (task.done ? ' completed' : '');
    textSpan.textContent = task.text;
    textSpan.ondblclick = function() {
      const newText = prompt('Редактировать задачу:', task.text);
      if (newText && newText.trim()) {
        task.text = newText.trim();
        saveData();
        renderTasks();
      }
    };
    
    infoDiv.appendChild(checkbox);
    infoDiv.appendChild(textSpan);
    
    const controlsDiv = document.createElement('div');
    controlsDiv.className = 'task-controls';
    
    const select = document.createElement('select');
    select.className = 'move-select';
    for (let month of MONTHS_LIST) {
      const option = document.createElement('option');
      option.value = month;
      option.textContent = month;
      if (month === currentMonth) option.selected = true;
      select.appendChild(option);
    }
    
    const moveBtn = document.createElement('button');
    moveBtn.textContent = '📌 Переместить';
    moveBtn.className = 'move-btn';
    moveBtn.onclick = function() {
      const targetMonth = select.value;
      if (targetMonth === currentMonth) {
        alert('Задача уже в этом месяце');
        return;
      }
      
      const taskIndex = allTasks[currentMonth].findIndex(t => t.id === task.id);
      if (taskIndex !== -1) {
        const movedTask = { ...allTasks[currentMonth][taskIndex] };
        allTasks[currentMonth].splice(taskIndex, 1);
        allTasks[targetMonth].push(movedTask);
        saveData();
        renderTasks();
      }
    };
    
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = '🗑️';
    deleteBtn.className = 'delete-btn';
    deleteBtn.onclick = function() {
      if (confirm('Удалить задачу?')) {
        const taskIndex = allTasks[currentMonth].findIndex(t => t.id === task.id);
        if (taskIndex !== -1) {
          allTasks[currentMonth].splice(taskIndex, 1);
          saveData();
          renderTasks();
        }
      }
    };
    
    controlsDiv.appendChild(select);
    controlsDiv.appendChild(moveBtn);
    controlsDiv.appendChild(deleteBtn);
    
    taskDiv.appendChild(infoDiv);
    taskDiv.appendChild(controlsDiv);
    container.appendChild(taskDiv);
  }
}

// Добавление новой задачи
function addTask() {
  const input = document.getElementById('taskInput');
  const text = input.value.trim();
  
  if (!text) {
    alert('Пожалуйста, напишите задачу');
    return;
  }
  
  const newTask = {
    id: generateId(),
    text: text,
    done: false
  };
  
  allTasks[currentMonth].push(newTask);
  saveData();
  renderTasks();
  input.value = '';
  input.focus();
}

// Настройка модального окна
function setupModal() {
  const modal = document.getElementById('customizeModal');
  const customizeBtn = document.getElementById('customizeBtn');
  const closeBtn = document.querySelector('.close');
  const saveBtn = document.getElementById('saveColorsBtn');
  const resetBtn = document.getElementById('resetColorsBtn');
  
  // Открытие модального окна
  customizeBtn.onclick = function() {
    // Загружаем текущие значения в пикеры
    document.getElementById('bgColor1').value = currentColors.bgColor1;
    document.getElementById('bgColor2').value = currentColors.bgColor2;
    document.getElementById('containerBg').value = currentColors.containerBg;
    document.getElementById('titleColor').value = currentColors.titleColor;
    document.getElementById('subtitleColor').value = currentColors.subtitleColor;
    document.getElementById('activeMonthBg').value = currentColors.activeMonthBg;
    document.getElementById('buttonColor').value = currentColors.buttonColor;
    document.getElementById('cardBg').value = currentColors.cardBg;
    
    modal.style.display = 'block';
  };
  
  // Закрытие модального окна
  closeBtn.onclick = function() {
    modal.style.display = 'none';
  };
  
  // Закрытие при клике вне окна
  window.onclick = function(event) {
    if (event.target === modal) {
      modal.style.display = 'none';
    }
  };
  
  // Сохранение цветов
  saveBtn.onclick = function() {
    currentColors = {
      bgColor1: document.getElementById('bgColor1').value,
      bgColor2: document.getElementById('bgColor2').value,
      containerBg: document.getElementById('containerBg').value,
      titleColor: document.getElementById('titleColor').value,
      subtitleColor: document.getElementById('subtitleColor').value,
      activeMonthBg: document.getElementById('activeMonthBg').value,
      buttonColor: document.getElementById('buttonColor').value,
      cardBg: document.getElementById('cardBg').value
    };
    saveColors();
    renderMonths(); // Перерисовываем кнопки с новыми цветами
    renderTasks(); // Перерисовываем задачи
    modal.style.display = 'none';
  };
  
  // Сброс к стандартным цветам
  resetBtn.onclick = function() {
    currentColors = { ...defaultColors };
    document.getElementById('bgColor1').value = defaultColors.bgColor1;
    document.getElementById('bgColor2').value = defaultColors.bgColor2;
    document.getElementById('containerBg').value = defaultColors.containerBg;
    document.getElementById('titleColor').value = defaultColors.titleColor;
    document.getElementById('subtitleColor').value = defaultColors.subtitleColor;
    document.getElementById('activeMonthBg').value = defaultColors.activeMonthBg;
    document.getElementById('buttonColor').value = defaultColors.buttonColor;
    document.getElementById('cardBg').value = defaultColors.cardBg;
    saveColors();
    renderMonths();
    renderTasks();
  };
}

// Запуск приложения
function init() {
  loadColors(); // Сначала загружаем цвета
  initData();
  renderMonths();
  renderTasks();
  setupModal();
  
  const addBtn = document.getElementById('addButton');
  if (addBtn) {
    addBtn.onclick = addTask;
  }
  
  const inputField = document.getElementById('taskInput');
  if (inputField) {
    inputField.onkeypress = function(e) {
      if (e.key === 'Enter') {
        addTask();
      }
    };
  }
  
  const today = new Date();
  const dateInfo = document.querySelector('.subtitle');
  if (dateInfo) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const formattedDate = today.toLocaleDateString('ru-RU', options);
    dateInfo.innerHTML = `пастельные планы, фиолетовое настроение • ${formattedDate}`;
    dateInfo.style.color = currentColors.subtitleColor;
  }
}

// Запускаем приложение после загрузки страницы
window.addEventListener('DOMContentLoaded', init);