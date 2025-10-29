import { Link } from 'react-router-dom';
import { Component, type ErrorInfo, type ReactNode } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import ReplayIcon from '@mui/icons-material/Replay';
import SectionWithBackground from '@components/SectionWithBackground/SectionWithBackground';
import backgroundImage from '@assets/header_bg.png';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
    };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.log('error: ', error, errorInfo);
  }

  handleReload() {
    this.setState({ hasError: false, error: null });
  }

  render() {
    if (this.state.hasError) {
      return (
        <SectionWithBackground
          backgroundImage={`url(${backgroundImage})`}
          backgroundColor="rgba(10, 31, 58, 0.75)"
          sx={{
            p: 0,
            height: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Box
            sx={{
              position: 'relative',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Typography variant="h3" sx={{ color: '#fff', py: 4 }}>
              Unexpected error! Try reload the page!
            </Typography>
            <Button
              startIcon={<ReplayIcon />}
              size="large"
              component={Link}
              to="/"
              onClick={this.handleReload}
              disableRipple
              sx={{
                borderRadius: (theme) => theme.spacing(4),
                px: 4,
                color: '#000',
                background: 'linear-gradient(90deg, rgb(30, 213, 169), rgb(1, 180, 228))',
              }}
            >
              Reload
            </Button>
          </Box>
        </SectionWithBackground>
      );
    }

    return this.props.children;
  }
}
