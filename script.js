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
  cardBg: '#ffffff',
  monthBtnBg: '#fef4fc',
  monthBtnColor: '#88698b',
  borderColor: '#e4bad4'
};

// Текущие цвета
let currentColors = { ...defaultColors };

// ========== БЛОК С ЦИТАТАМИ ==========
// Коллекция воодушевляющих цитат
const quotesCollection = [
  { text: "Маленькие шаги каждый день приводят к большим результатам.", author: "Конфуций" },
  { text: "Ты способна на большее, чем думаешь. Просто начни.", author: "Неизвестный" },
  { text: "Не жди идеального момента — сделай этот момент идеальным.", author: "Тони Роббинс" },
  { text: "Каждый день — это новая возможность изменить свою жизнь.", author: "Опра Уинфри" },
  { text: "Верь в себя, даже если никто другой не верит.", author: "Неизвестный" },
  { text: "Твой единственный предел — это твоё воображение.", author: "Наполеон Хилл" },
  { text: "Сделай сегодня то, что приблизит тебя к мечте.", author: "Неизвестный" },
  { text: "Ты уже достаточно сильна, чтобы справиться с этим.", author: "Неизвестный" },
  { text: "Позволь себе быть несовершенной — так ты станешь настоящей.", author: "Брене Браун" },
  { text: "Каждое утро — это чистый лист. Напиши что-то прекрасное.", author: "Неизвестный" },
  { text: "Ты можешь всё, если перестанешь бояться.", author: "Пауло Коэльо" },
  { text: "Успех — это сумма маленьких усилий, повторяемых день за днём.", author: "Роберт Коллиер" },
  { text: "Не сравнивай свой путь с путём других. У каждого своя дорога.", author: "Неизвестный" },
  { text: "Твоя единственная граница — это страх внутри тебя.", author: "Неизвестный" },
  { text: "Радуйся маленьким победам — они ведут к большим.", author: "Неизвестный" },
  { text: "Лучший способ предсказать будущее — создать его.", author: "Питер Друкер" },
  { text: "Будь той, кто вдохновляет себя сам.", author: "Неизвестный" },
  { text: "У тебя есть сила изменить этот день.", author: "Неизвестный" }
];

// Получение цитаты дня (меняется раз в сутки)
function getDailyQuote() {
  const today = new Date().toDateString();
  const savedQuoteDate = localStorage.getItem('dailyQuoteDate');
  const savedQuote = localStorage.getItem('dailyQuote');
  const savedAuthor = localStorage.getItem('dailyQuoteAuthor');
  
  if (savedQuoteDate === today && savedQuote) {
    return { text: savedQuote, author: savedAuthor };
  }
  
  const randomIndex = Math.floor(Math.random() * quotesCollection.length);
  const newQuote = quotesCollection[randomIndex];
  
  localStorage.setItem('dailyQuoteDate', today);
  localStorage.setItem('dailyQuote', newQuote.text);
  localStorage.setItem('dailyQuoteAuthor', newQuote.author);
  
  return newQuote;
}

// Отображение цитаты на странице
function displayDailyQuote() {
  const quoteElement = document.getElementById('dailyQuote');
  const authorElement = document.getElementById('quoteAuthor');
  
  if (!quoteElement) return;
  
  const quote = getDailyQuote();
  quoteElement.textContent = `"${quote.text}"`;
  if (authorElement && quote.author) {
    authorElement.textContent = `— ${quote.author}`;
  }
}

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
  applyColorsToAllElements();
}

// Применение цветов ко всем элементам страницы
function applyColorsToAllElements() {
  document.body.style.background = `linear-gradient(145deg, ${currentColors.bgColor1} 0%, ${currentColors.bgColor2} 100%)`;
  
  const container = document.querySelector('.container');
  if (container) {
    container.style.background = currentColors.containerBg + 'd9';
  }
  
  const title = document.querySelector('h1');
  if (title) title.style.color = currentColors.titleColor;
  
  const subtitle = document.querySelector('.subtitle');
  if (subtitle) subtitle.style.color = currentColors.subtitleColor;
  
  const monthTitle = document.getElementById('monthTitle');
  if (monthTitle) monthTitle.style.color = currentColors.titleColor;
  
  const customizeBtn = document.getElementById('customizeBtn');
  if (customizeBtn) {
    customizeBtn.style.background = `linear-gradient(135deg, ${currentColors.buttonColor}, ${adjustColor(currentColors.buttonColor, -20)})`;
  }
  
  const addButton = document.getElementById('addButton');
  if (addButton) addButton.style.background = currentColors.buttonColor;
  
  const monthBtns = document.querySelectorAll('.month-btn');
  monthBtns.forEach(btn => {
    if (!btn.classList.contains('active')) {
      btn.style.background = currentColors.monthBtnBg;
      btn.style.color = currentColors.monthBtnColor;
    } else {
      btn.style.background = currentColors.activeMonthBg;
      btn.style.color = '#5f3f63';
    }
  });
  
  const addPanel = document.querySelector('.add-panel');
  if (addPanel) addPanel.style.background = currentColors.cardBg;
  
  const taskInput = document.getElementById('taskInput');
  if (taskInput) {
    taskInput.style.borderColor = currentColors.borderColor;
  }
  
  const taskCards = document.querySelectorAll('.task-card');
  taskCards.forEach(card => {
    card.style.background = currentColors.cardBg;
  });
  
  const counter = document.querySelector('.counter');
  if (counter) counter.style.background = currentColors.activeMonthBg + '80';
  
  const infoNote = document.querySelector('.info-note');
  if (infoNote) infoNote.style.background = currentColors.activeMonthBg + '40';
  
  const footer = document.querySelector('footer');
  if (footer) footer.style.color = currentColors.subtitleColor;
  
  // Применяем цвет для контейнера цитаты
  const quoteContainer = document.querySelector('.quote-container');
  if (quoteContainer) {
    quoteContainer.style.background = `linear-gradient(135deg, ${currentColors.containerBg}cc, ${currentColors.activeMonthBg}40)`;
    quoteContainer.style.borderColor = currentColors.borderColor + '80';
  }
  
  const quoteText = document.querySelector('.quote-text');
  if (quoteText) quoteText.style.color = currentColors.subtitleColor;
  
  const quoteAuthor = document.querySelector('.quote-author');
  if (quoteAuthor) quoteAuthor.style.color = currentColors.subtitleColor + 'aa';
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
  applyColorsToAllElements();
  renderMonths();
  renderTasks();
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
  allTasks['Июль'] = [
    { id: Date.now() + '11', text: 'Сходить в парк', done: false }
  ];
  allTasks['Август'] = [
    { id: Date.now() + '12', text: 'Подготовиться к осени', done: false }
  ];
  allTasks['Сентябрь'] = [
    { id: Date.now() + '13', text: 'Начать новый проект', done: false }
  ];
  allTasks['Октябрь'] = [
    { id: Date.now() + '14', text: 'Купить тыкву', done: false }
  ];
  allTasks['Ноябрь'] = [
    { id: Date.now() + '15', text: 'Составить список подарков', done: false }
  ];
  allTasks['Декабрь'] = [
    { id: Date.now() + '16', text: 'Украсить елку', done: false }
  ];
  allTasks['Январь'] = [
    { id: Date.now() + '17', text: 'Поставить новогодние цели', done: false }
  ];
  allTasks['Февраль'] = [
    { id: Date.now() + '18', text: 'Подготовить подарок', done: false }
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
      btn.style.color = '#5f3f63';
    } else {
      btn.style.background = currentColors.monthBtnBg;
      btn.style.color = currentColors.monthBtnColor;
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
  counterSpan.style.background = currentColors.activeMonthBg + '80';
  
  if (tasks.length === 0) {
    container.innerHTML = '<div class="empty-state">✨ В этом месяце пока нет задач. Добавьте что-нибудь прекрасное! ✨</div>';
    return;
  }
  
  container.innerHTML = '';
  
  for (let task of tasks) {
    const taskDiv = document.createElement('div');
    taskDiv.className = 'task-card';
    taskDiv.style.background = currentColors.cardBg;
    taskDiv.style.border = `1px solid ${currentColors.borderColor}40`;
    
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
    select.style.borderColor = currentColors.borderColor;
    select.style.background = currentColors.monthBtnBg;
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
    moveBtn.style.background = currentColors.activeMonthBg + '60';
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
  
  if (customizeBtn) {
    customizeBtn.onclick = function() {
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
  }
  
  if (closeBtn) {
    closeBtn.onclick = function() {
      modal.style.display = 'none';
    };
  }
  
  window.onclick = function(event) {
    if (event.target === modal) {
      modal.style.display = 'none';
    }
  };
  
  if (saveBtn) {
    saveBtn.onclick = function() {
      currentColors = {
        ...currentColors,
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
      modal.style.display = 'none';
    };
  }
  
  if (resetBtn) {
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
      modal.style.display = 'none';
    };
  }
}

// Запуск приложения
function init() {
  loadColors();
  initData();
  renderMonths();
  renderTasks();
  setupModal();
  displayDailyQuote(); // Добавляем отображение цитаты
  
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
    dateInfo.innerHTML = `you can do more than you think • ${formattedDate}`;
    dateInfo.style.color = currentColors.subtitleColor;
  }
}

// Запускаем приложение после загрузки страницы
window.addEventListener('DOMContentLoaded', init);