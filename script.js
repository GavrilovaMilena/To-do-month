// Список месяцев
const MONTHS_LIST = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];

// Текущий выбранный месяц
let currentMonth = 'Март';

// Все данные
let allTasks = {};

// Инициализация данных
function initData() {
  // Проверяем, есть ли сохраненные данные
  const saved = localStorage.getItem('softPlannerData');
  
  if (saved) {
    try {
      allTasks = JSON.parse(saved);
      // Убеждаемся, что для каждого месяца есть массив
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
  
  // Сохраняем текущий месяц
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
  
  // Добавляем примеры задач для нескольких месяцев
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
    
    // Левая часть с чекбоксом и текстом
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
    
    // Правая часть с управлением
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
      
      // Находим индекс задачи
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

// Запуск приложения
function init() {
  initData();
  renderMonths();
  renderTasks();
  
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
}

// Запускаем приложение после загрузки страницы
window.addEventListener('DOMContentLoaded', init);