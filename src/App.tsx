import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css';

import HomePage from '@/pages/HomePage';
import MovieDetailPage from '@/pages/MovieDetailPage';
import Favorite from '@/pages/Favorite';
import Layout from '@/components/Layout/Layout';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Membungkus rute di dalam tata letak (Layout) utama */}
        <Route element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/movie/:id" element={<MovieDetailPage />} />
          <Route path="/favorites" element={<Favorite />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}