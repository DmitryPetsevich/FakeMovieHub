import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import TelegramIcon from '@mui/icons-material/Telegram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import PhoneIcon from '@mui/icons-material/Phone';
import useResponsiveValue from '@hooks/useResponsiveValue';
import { styled } from '@mui/material/styles';

const StyledButton = styled(Button)(() => ({
  color: '#fff',
  borderColor: '#fff',
})) as typeof Button;

const Footer = () => {
  const orientation = useResponsiveValue<'vertical' | 'horizontal'>({
    xs: 'vertical',
    sm: 'horizontal',
  });

  return (
    <Box
      component="footer"
      sx={{
        display: 'flex',
        justifyContent: 'center',
        bgcolor: 'rgb(3, 37, 65)',
        py: 2,
      }}
    >
      <ButtonGroup orientation={orientation}>
        <StyledButton
          component="a"
          startIcon={<TelegramIcon />}
          href="https://t.me/dmitrypetsevich"
          target="_blank"
          disableRipple
        >
          Teelegram
        </StyledButton>
        <StyledButton
          component="a"
          startIcon={<LinkedInIcon />}
          href="https://www.linkedin.com/in/dmpetsevich/"
          target="_blank"
          disableRipple
        >
          Linkedin
        </StyledButton>
        <StyledButton startIcon={<PhoneIcon />} disableRipple>
          +375 29 136-41-09
        </StyledButton>
      </ButtonGroup>
    </Box>
  );
};
export default Footer;
