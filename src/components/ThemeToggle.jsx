import React from 'react';

function ThemeToggle({ theme, onToggle }) {
  return (
    <div className="form-check form-switch">
      <input
        className="form-check-input"
        type="checkbox"
        id="themeSwitch"
        checked={theme === 'dark'}
        onChange={onToggle}
      />
      <label className="form-check-label" htmlFor="themeSwitch">
        {theme === 'dark' ? 'Dark mode' : 'Light mode'}
      </label>
    </div>
  );
}

export default ThemeToggle;
