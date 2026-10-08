import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { DOMAINS } from '../../constants/index.js';

// Dropdown to filter opportunities by domain
function DomainFilter({ value, onChange }) {
  return (
    <FormControl size="small" sx={{ minWidth: 180 }}>
      <InputLabel id="domain-filter-label">Domain</InputLabel>
      <Select
        labelId="domain-filter-label"
        value={value}
        label="Domain"
        onChange={(e) => onChange(e.target.value)}
      >
        <MenuItem value="">All Domains</MenuItem>
        {DOMAINS.map((domain) => (
          <MenuItem key={domain} value={domain}>
            {domain}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

export default DomainFilter;
