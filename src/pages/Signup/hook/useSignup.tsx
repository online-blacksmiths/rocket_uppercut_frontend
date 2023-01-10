import { SignupProps } from '../types';

export default function useSignup({ type, setType, setIsForm }: SignupProps) {
  const handlePhoneSignup = () => {
    setType('phone');
    setIsForm(true);
  };

  const handleEmailSignup = () => {
    setType('email');
    setIsForm(true);
  };

  const handleChangeType = () => {
    if (type === 'phone') {
      return setType('email');
    }

    if (type === 'email') {
      return setType('phone');
    }
  };

  return {
    handlePhoneSignup,
    handleEmailSignup,
    handleChangeType,
  };
}
