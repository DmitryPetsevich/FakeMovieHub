import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router';
import Avatar from '@mui/material/Avatar';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import BrokenImageIcon from '@mui/icons-material/BrokenImage';
import useFetchList from '@hooks/useFetchList';
import useDebounce from '@hooks/useDebounce';
import type { IMovie } from '@interfaces/index';
import { QUERIES } from '@constants/queries';
import { IMAGE_BASE_URL } from '@constants/index';
import { IMAGE_SIZES } from '@constants/imageSizes';

const Search = () => {
  const [value, setValue] = useState('');
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState<IMovie[]>([]);

  const inputRef = useRef<HTMLInputElement | null>(null);
  const popperRef = useRef<HTMLDivElement | null>(null);

  const debouncedValue = useDebounce(value);

  const { loading, response } = useFetchList<IMovie>(
    QUERIES.search_movie('', { query: debouncedValue }),
    1000,
  );

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  useEffect(() => {
    if (response) setOptions(response.results);
  }, [response]);

  useEffect(() => {
    setOpen(debouncedValue.length > 2 && !!response);
  }, [response, debouncedValue]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        inputRef.current &&
        !inputRef.current.contains(event.target as Node) &&
        popperRef.current &&
        !popperRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [inputRef, popperRef]);

  return (
    <>
      <TextField
        inputRef={inputRef}
        size="small"
        margin="normal"
        placeholder="Search for a movie..."
        value={value}
        onChange={handleChange}
        slotProps={{
          input: {
            sx: {
              background: '#fff',
              borderRadius: '24px',
              '& .MuiOutlinedInput-notchedOutline': {
                border: 'none',
              },
            },
          },
        }}
      />
      <Popper ref={popperRef} open={open} anchorEl={inputRef.current} placement="bottom-start">
        <Paper
          elevation={0}
          sx={{
            maxHeight: '600px',
            overflowX: 'auto',
            scrollbarWidth: 'thin',
            mt: 1,
            width: inputRef?.current?.clientWidth,
          }}
        >
          <List>
            {loading ? (
              <ListItemButton disabled>
                <ListItemText primary={'Searching...'} />
              </ListItemButton>
            ) : response ? (
              options.length ? (
                options.map((movie, index) => (
                  <ListItemButton
                    key={index}
                    component={Link}
                    to={`/${movie.id}`}
                    sx={{
                      borderBottom: '1px solid lightgray',
                    }}
                  >
                    <ListItemAvatar>
                      {movie.poster_path ? (
                        <Avatar
                          alt={movie.title}
                          src={`${IMAGE_BASE_URL}${IMAGE_SIZES.avatar}${movie.poster_path}`}
                        />
                      ) : (
                        <Avatar>
                          <BrokenImageIcon />
                        </Avatar>
                      )}
                    </ListItemAvatar>
                    <ListItemText
                      primary={movie.title}
                      secondary={
                        new Date(movie.release_date).getFullYear() || 'Unknown release date'
                      }
                    />
                  </ListItemButton>
                ))
              ) : (
                <ListItemButton disabled>
                  <ListItemText primary={'No results...'} />
                </ListItemButton>
              )
            ) : (
              <ListItemButton disabled>
                <ListItemText primary={'No results...'} />
              </ListItemButton>
            )}
          </List>
        </Paper>
      </Popper>
    </>
  );
};

export default Search;
