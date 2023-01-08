import Header from 'common/Header';
import Footer from 'common/Footer';
import { Route, Routes } from 'react-router-dom';
import Intro from 'pages/Intro';
import Signup from 'pages/Signup';

export default function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Intro />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
      <Footer />
    </>
  );
}
