import Header from 'common/Header';
import Footer from 'common/Footer';
import { Route, Routes } from 'react-router-dom';
import Intro from 'pages/Intro';

export default function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Intro />} />
        <Route path="/signup" element={null} />
      </Routes>
      <Footer />
    </>
  );
}
