import React from 'react';

const ToggleTheme = ({ toggleTheme, theme }) => {
  return (
    <div className="toggle-theme">
      <button onClick={toggleTheme}>
        Switch to {theme === 'light' ? 'Dark' : 'Light'} Mode
      </button>
    </div>
  );
};

export default ToggleTheme;
