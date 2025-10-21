import { styled } from '@mui/material/styles';
import MuiTab from '@mui/material/Tab';
import MuiTabs from '@mui/material/Tabs';
import type { ITab } from '@interfaces/index';

const StyledTabs = styled(MuiTabs)(({ theme }) => ({
  height: '28px',
  minHeight: 0,
  '& .MuiTabs-list': {
    height: '100%',
    padding: theme.spacing(0, 2),
    border: '1px solid #032541',
    borderRadius: '14px',
  },
  '& .MuiTabs-indicator': {
    background: '#032541',
    height: '100%',
    zIndex: -1,
    '&:before': {
      display: 'block',
      content: "''",
      width: '28px',
      height: '28px',
      borderRadius: '50%',
      background: '#032541',
      marginLeft: theme.spacing(-2),
      position: 'absolute',
      left: 0,
    },
    '&:after': {
      display: 'block',
      content: "''",
      width: '28px',
      height: '28px',
      borderRadius: '50%',
      background: '#032541',
      marginRight: theme.spacing(-2),
      position: 'absolute',
      right: 0,
    },
  },
}));

const StyledTab = styled(MuiTab)(({ theme }) => ({
  height: '28px',
  minHeight: 0,
  padding: theme.spacing(0, 4),
  textTransform: 'none',
  '&.Mui-selected': {
    color: '#1ed5a9',
  },
}));

type Props = {
  value: string;
  tabs: ITab[];
  onChange: (value: string) => void;
};

const Tabs = ({ value, tabs, onChange }: Props) => (
  <StyledTabs value={value} onChange={(_, value) => onChange(value)}>
    {tabs.map(({ value, label }) => (
      <StyledTab value={value} label={label} disableRipple key={value} />
    ))}
  </StyledTabs>
);

export default Tabs;
