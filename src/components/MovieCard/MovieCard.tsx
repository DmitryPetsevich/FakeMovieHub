import { motion } from 'framer-motion';
import moment from 'moment';
import { styled } from '@mui/material/styles';
import { Link } from 'react-router';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import VoteCircle from '@components/VoteCircle/VoteCircle';
import type { IMovie } from '@interfaces/index';
import { IMAGE_BASE_URL } from '@constants/index';
import { IMAGE_SIZES } from '@constants/imageSizes';

type Props = {
  data: IMovie;
};

const MotionCard = styled(motion.div)(({ theme }) => ({
  flex: '0 0 150px',
  minHeight: '320px',
  display: 'flex',
  margin: theme.spacing(0, 1),
  '&:first-of-type': {
    marginLeft: theme.spacing(4),
  },
  '&:last-of-type': {
    marginRight: theme.spacing(4),
  },
}));

const MovieCard = ({ data }: Props) => (
  <MotionCard
    key={data.id}
    layout
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.75, ease: 'easeInOut' }}
  >
    <Card
      component={Link}
      to={`/${data.id}`}
      elevation={0}
      sx={{ height: '100%', background: 'transparent', textDecoration: 'none' }}
    >
      <CardMedia
        component="img"
        image={`${IMAGE_BASE_URL}${IMAGE_SIZES.card}${data.poster_path}`}
        sx={{ height: '225px', borderRadius: '8px' }}
      />
      <CardContent sx={{ position: 'relative', py: 3 }}>
        <VoteCircle score={data.vote_average} sx={{ position: 'absolute', top: '-20px' }} />
        <Typography variant="subtitle2" sx={{ lineHeight: 1.25 }}>
          {data.title}
        </Typography>
        <Typography variant="caption">{moment(data.release_date).format('MMM D, YYYY')}</Typography>
      </CardContent>
    </Card>
  </MotionCard>
);

export default MovieCard;
