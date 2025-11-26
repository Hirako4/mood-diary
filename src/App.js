import React, { useState, useEffect } from 'react';

const MOODS = [
  { emoji: '😀', label: 'Отличное' },
{ emoji: '😊', label: 'Хорошее' },
{ emoji: '😐', label: 'Нормальное' },
{ emoji: '😔', label: 'Плохое' },
{ emoji: '😡', label: 'Ужасное' },
];

function App() {
  const [history, setHistory] = useState({});
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]); // сегодня по умолчанию

  // Загрузка из localStorage
  useEffect(() => {
    const saved = localStorage.getItem('moodDiary');
    if (saved) {
      setHistory(JSON.parse(saved));
    }
  }, []);

  // Сохранение в localStorage при изменении истории
  useEffect(() => {
    localStorage.setItem('moodDiary', JSON.stringify(history));
  }, [history]);

  const handleMoodSelect = (emoji) => {
    setHistory(prev => ({
      ...prev,
      [selectedDate]: emoji
    }));
  };

  // Генерация последних 7 дней
  const last7Days = Array.from({ length: 7 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - i);
    return d.toISOString().split('T')[0];
  }).reverse();

  const selectedMood = history[selectedDate] || null;

  const styles = `
  .App {
    max-width: 600px;
    margin: 0 auto;
    padding: 20px;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    text-align: center;
  }

  .date-selector {
    margin: 20px 0;
    padding: 12px;
    background: #f5f5f5;
    border-radius: 8px;
  }

  .date-btn {
    margin: 4px;
    padding: 6px 10px;
    border: 1px solid #ccc;
    background: white;
    border-radius: 4px;
    cursor: pointer;
  }

  .date-btn.active {
    background: #2196f3;
    color: white;
    font-weight: bold;
  }

  .mood-selector {
    display: flex;
    justify-content: center;
    gap: 16px;
    margin: 20px 0;
  }

  .mood-btn {
    font-size: 3rem;
    width: 70px;
    height: 70px;
    border: 2px solid #ddd;
    border-radius: 50%;
    background: white;
    cursor: pointer;
    transition: transform 0.2s;
  }

  .mood-btn:hover {
    transform: scale(1.1);
  }

  .mood-btn.selected {
    border-color: #4caf50;
    box-shadow: 0 0 10px rgba(76, 175, 80, 0.4);
  }

  .history {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(80px, 1fr));
    gap: 12px;
    margin-top: 20px;
  }

  .history-day {
    padding: 10px;
    border: 1px solid #eee;
    border-radius: 8px;
    background: #fafafa;
    cursor: pointer;
  }

  .history-day:hover {
    background: #e8f4fc;
  }

  .history-day.selected {
    background: #bbdefb;
    border-color: #1976d2;
    font-weight: bold;
  }

  .date-label {
    font-size: 0.85rem;
    color: #555;
  }

  .mood-display {
    font-size: 1.8rem;
    margin-top: 4px;
  }
  `;

  return (
    <div>
    <style>{styles}</style>
    <div className="App">
    <h1>Мини-дневник настроения</h1>

    {/* Выбор даты */}
    <div className="date-selector">
    <p>Выбери дату для редактирования:</p>
    {last7Days.map(date => (
      <button
      key={date}
      className={`date-btn ${selectedDate === date ? 'active' : ''}`}
      onClick={() => setSelectedDate(date)}
      >
      {date}
      </button>
    ))}
    </div>

    {/* Выбор настроения для выбранной даты */}
    <p>Настроение на <strong>{selectedDate}</strong>:</p>
    <div className="mood-selector">
    {MOODS.map((mood) => (
      <button
      key={mood.emoji}
      className={`mood-btn ${selectedMood === mood.emoji ? 'selected' : ''}`}
      onClick={() => handleMoodSelect(mood.emoji)}
      title={mood.label}
      >
      {mood.emoji}
      </button>
    ))}
    </div>

    {selectedMood && (
      <p style={{ color: '#4caf50', fontWeight: 'bold' }}>
      ✅ Сохранено для {selectedDate}
      </p>
    )}

    {/* История — кликабельная */}
    <h2>История (последние 7 дней)</h2>
    <div className="history">
    {last7Days.map(date => {
      const mood = history[date] || '—';
      return (
        <div
        key={date}
        className={`history-day ${selectedDate === date ? 'selected' : ''}`}
        onClick={() => setSelectedDate(date)}
        >
        <div className="date-label">{date}</div>
        <div className="mood-display">{mood}</div>
        </div>
      );
    })}
    </div>
    </div>
    </div>
  );
}

export default App;
