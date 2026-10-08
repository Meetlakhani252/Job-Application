import { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import useDebounce from '../../hooks/useDebounce.js';

// Search input that debounces the onChange callback by 400ms
function SearchBar({ value, onChange }) {
  // Local state tracks immediate typed value
  const [localValue, setLocalValue] = useState(value);
  const debouncedValue = useDebounce(localValue, 400);

  // Sync local state if the parent resets the value
  useEffect(() => {
    setLocalValue(value);
  }, [value]);

  // Notify parent only when debounced value settles
  useEffect(() => {
    onChange(debouncedValue);
  }, [debouncedValue]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <TextField
      size="small"
      placeholder="Search by title…"
      value={localValue}
      onChange={(e) => setLocalValue(e.target.value)}
      slotProps={{
        input: {
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon fontSize="small" />
            </InputAdornment>
          ),
        },
      }}
      sx={{ minWidth: 240 }}
      inputProps={{ 'aria-label': 'Search opportunities' }}
    />
  );
}

export default SearchBar;
