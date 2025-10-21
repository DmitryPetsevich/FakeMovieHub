import { useState } from 'react';
import { motion } from 'framer-motion';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import no_profile_image from '@assets/no_profile_image.png';
import { IMAGE_BASE_URL } from '@constants/index';
import type { ICast } from '@interfaces/index';
import { IMAGE_SIZES } from '@constants/imageSizes';

type Props = {
  data: ICast;
};

const MotionCard = styled(motion.div)(({ theme }) => ({
  flex: '0 0 150px',
  minHeight: '320px',
  margin: theme.spacing(0, 1),
  '&:first-of-type': {
    marginLeft: theme.spacing(0),
  },
  '&:last-of-type': {
    marginRight: theme.spacing(0),
  },
}));

const CastCard = ({ data }: Props) => {
  const [imageSrc, setImageSrc] = useState(
    `${IMAGE_BASE_URL}${IMAGE_SIZES.card}${data.profile_path}`,
  );

  return (
    <MotionCard
      key={data.id}
      layout
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.75, ease: 'easeInOut' }}
    >
      <Card
        sx={{
          borderRadius: '4px',
          height: '100%',
        }}
      >
        <CardMedia
          component="img"
          image={imageSrc}
          sx={{
            height: '225px',
          }}
          onError={() => setImageSrc(no_profile_image)}
        />
        <CardContent>
          <Typography variant="subtitle2" sx={{ lineHeight: 1.25 }}>
            {data.original_name}
          </Typography>
          <Typography variant="caption">{data.character}</Typography>
        </CardContent>
      </Card>
    </MotionCard>
  );
};

export default CastCard;
