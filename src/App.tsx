import { Routes, Route } from 'react-router';
import Layout from '@components/Layout/Layout';
import MainPage from '@pages/MainPage';
import MoviePage from '@pages/MoviePage';
import useScrollToTop from '@hooks/useScrollToTop';

function App() {
  useScrollToTop();

  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<MainPage />} />
        <Route path=":id" element={<MoviePage />} />
      </Route>
    </Routes>
  );
}

export default App;
