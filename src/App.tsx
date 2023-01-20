import Header from 'common/Header';
import Footer from 'common/Footer';
import { Route, Routes } from 'react-router-dom';
import Intro from 'pages/Intro';
import Login from "pages/Login";
import Signup from 'pages/Signup';
import Step1 from 'pages/Step/Step1';
import Step2 from 'pages/Step/Step2';
import Step3 from 'pages/Step/Step3';

export default function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Intro />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/step1" element={<Step1 />} />
        <Route path="/step1" element={<Step2 />} />
        <Route path="/step1" element={<Step3 />} />
      </Routes>
      <Footer />
    </>
  );
}
