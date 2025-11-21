import MuiMenuItem from '@mui/material/MenuItem';
import MuiFormControl from '@mui/material/FormControl';
import MuiSelect, { type SelectChangeEvent } from '@mui/material/Select';

type Props = {
  value: string;
  options?: Array<{
    value: string;
    label: string;
  }>;
  onChange?: (value: string) => void;
};

const Select = ({ value, options = [], onChange = () => {} }: Props) => (
  <MuiFormControl sx={{ m: 1, minWidth: 120 }} size="small">
    <MuiSelect
      value={value}
      onChange={(event: SelectChangeEvent) => onChange(event.target.value)}
      sx={{
        height: '28px',
        background: '#032541',
        color: '#1ed5a9',
        borderRadius: '14px',
        border: '1px solid #032541',
        '& fieldset': {
          border: 'none',
        },
        '& .MuiSvgIcon-root': {
          color: '#1ed5a9',
        },
      }}
    >
      {options.map(({ value, label }, index) => (
        <MuiMenuItem value={value} key={index}>
          {label}
        </MuiMenuItem>
      ))}
    </MuiSelect>
  </MuiFormControl>
);

export default Select;
