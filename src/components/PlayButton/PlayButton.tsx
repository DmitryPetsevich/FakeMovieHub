import { useMemo } from 'react';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PriorityHighIcon from '@mui/icons-material/PriorityHigh';
import VideoTrailer from '@components/VideoTrailer/VideoTrailer';
import { type ButtonProps } from '@mui/material/Button';
import useModal from '@providers/Modal/useModal';

type Props = {
  trailerKey: string;
  view?: 'button' | 'iconButton';
  label?: string;
  props?: ButtonProps;
};

const PlayButton = ({ trailerKey, view = 'button', label = 'Play Trailer', props }: Props) => {
  const { openWindow } = useModal();

  const handleClick = () => {
    openWindow(VideoTrailer, { trailerKey });
  };

  const button = useMemo(() => {
    if (!trailerKey) {
      return (
        <Button startIcon={<PriorityHighIcon />} disableRipple disabled {...props}>
          Trailer is not allowed
        </Button>
      );
    }

    switch (view) {
      case 'button':
        return (
          <Button startIcon={<PlayArrowIcon />} onClick={handleClick} {...props}>
            {label}
          </Button>
        );
      case 'iconButton':
        return (
          <IconButton aria-label="play" onClick={handleClick} {...props}>
            <PlayArrowIcon />
          </IconButton>
        );
      default:
        const _exhaustive: never = view;
        return _exhaustive;
    }
  }, [view, label]);

  return button;
};

export default PlayButton;
