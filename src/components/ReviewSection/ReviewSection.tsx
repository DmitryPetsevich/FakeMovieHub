import { useMemo } from 'react';
import moment from 'moment';
import DOMPurify from 'dompurify';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Avatar from '@mui/material/Avatar';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import BrokenImageIcon from '@mui/icons-material/BrokenImage';
import { Skeleton, type SxProps, type Theme } from '@mui/material';
import type { IReview } from '@interfaces/index';
import { IMAGE_BASE_URL } from '@constants/index';
import { IMAGE_SIZES } from '@constants/imageSizes';
import ErrorBox from '@components/ErrorBox/ErrorBox';
import useFirstLoad from '@hooks/useFirstLoad';

type Props = {
  data: IReview[];
  error: string | null;
  size?: number;
  sx?: SxProps<Theme>;
};

const ReviewSection = ({ data, error, size = 10, sx = {} }: Props) => {
  const firstLoad = useFirstLoad();

  const render = useMemo(() => {
    if (firstLoad) {
      return <Skeleton variant="rectangular" width="100%" height="120px" />;
    }

    const reviews = data.slice(0, size) || [];

    if (error) return <ErrorBox error={error} sx={{ minHeight: '240px' }} />;

    if (!reviews.length)
      return (
        <Box
          sx={{
            height: '120px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            background: 'rgba(0, 0, 0, 0.11)',
          }}
        >
          <Typography variant="h5">We don't have any reviews for this movie.</Typography>
        </Box>
      );

    return (
      <>
        {reviews.map((review) => (
          <Accordion>
            <AccordionSummary expandIcon={<ArrowDropDownIcon />}>
              <ListItemButton
                disableRipple
                sx={{
                  p: 0,
                  '&:hover': {
                    backgroundColor: 'transparent',
                  },
                }}
              >
                <ListItemAvatar>
                  {review.author_details.avatar_path ? (
                    <Avatar
                      alt={review.author}
                      src={`${IMAGE_BASE_URL}${IMAGE_SIZES.avatar}${review.author_details.avatar_path}`}
                    />
                  ) : (
                    <Avatar>
                      <BrokenImageIcon />
                    </Avatar>
                  )}
                </ListItemAvatar>
                <ListItemText
                  primary={`A review by ${review.author}`}
                  secondary={
                    <Typography variant="body2" color="text.secondary">
                      Written by{' '}
                      <Typography component="span" sx={{ fontWeight: 400, color: '#000' }}>
                        {review.author}
                      </Typography>{' '}
                      on {moment(review.created_at).format('D MMMM, YYYY')}
                    </Typography>
                  }
                  slotProps={{ primary: { sx: { fontWeight: 500 } } }}
                />
              </ListItemButton>
            </AccordionSummary>
            <AccordionDetails>
              <Typography variant="body2">{DOMPurify.sanitize(review.content)}</Typography>
            </AccordionDetails>
          </Accordion>
        ))}
      </>
    );
  }, [data, size, error, firstLoad]);

  return (
    <Box
      component="section"
      sx={{
        width: {
          xs: '100%',
          sm: '100%',
          md: '70%',
          lg: '70%',
          xl: '70%',
        },
        mx: 'auto',
        py: 1,
        ...sx,
      }}
    >
      <>
        <Typography variant="h5" sx={{ fontWeight: '500', my: 1 }}>
          Top Reviews
        </Typography>
        {render}
      </>
    </Box>
  );
};

export default ReviewSection;
