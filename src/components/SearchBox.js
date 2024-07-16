import React, { useState, useEffect, useRef } from 'react';
import '../styles/searchbox.css';

const SearchBox = ({ placeholder, variant, onSearch }) => {
  const [value, setValue] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.ctrlKey && event.key === '/') {
        inputRef.current.focus();
      }
      if (event.key === 'Enter') {
        onSearch(value);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [value, onSearch]);

  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => setIsFocused(false);

  let className = `searchbox ${variant}`;
  if (isFocused) {
    className += ' active';
  } else if (value) {
    className += ' filled';
  }

  return (
    <div className={className}>
      <input
        type="text"
        ref={inputRef}
        placeholder={placeholder}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onFocus={handleFocus}
        onBlur={handleBlur}
      />
      <div className="shortcut">Ctrl + /</div>
    </div>
  );
};

export default SearchBox;
