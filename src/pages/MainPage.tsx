import SearchSection from '@components/SearchSection/SearchSection';
import MovieCardListSection from '@components/MovieCardListSection/MovieCardListSection';
import { sections } from '@components/MovieCardListSection/config';

const MainPage = () => {
  return (
    <>
      <SearchSection />
      {sections.map((props, index) => (
        <MovieCardListSection {...props} key={index} />
      ))}
    </>
  );
};

export default MainPage;
