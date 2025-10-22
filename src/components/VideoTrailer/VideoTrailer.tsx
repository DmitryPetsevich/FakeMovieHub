import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import useModal from '@providers/Modal/useModal';

type Props = {
  trailerKey: string;
  autoplay?: boolean;
};

const VideoTrailer = ({ trailerKey, autoplay = false }: Props) => {
  const { closeWindow } = useModal();

  return (
    <Box
      sx={{
        width: '100vw',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Box
        sx={{
          height: '80vh',
          maxWidth: '1280px',
          aspectRatio: '16/9',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            alignItems: 'center',
            p: 1,
            background: '#000',
          }}
        >
          <IconButton aria-label="play" onClick={closeWindow} sx={{ color: '#fff' }}>
            <CloseIcon />
          </IconButton>
        </Box>
        <iframe
          width="100%"
          height="100%"
          src={`https://www.youtube.com/embed/${trailerKey}?autoplay=${autoplay ? 1 : 0}&rel=0`}
          title="Трейлер"
          allow="autoplay; encrypted-media"
          allowFullScreen
          style={{ border: 'none', borderRadius: 4 }}
        />
      </Box>
    </Box>
  );
};

export default VideoTrailer;
