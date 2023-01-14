import { useResetRecoilState } from 'recoil';

import { emailState, phoneState, selectedDialCodeState, selectedIsoState } from 'atom/signup';
import { SignupProps } from '../types';

export default function useSignup({ type, setType, setIsForm }: SignupProps) {
  const resetDialCode = useResetRecoilState(selectedDialCodeState);
  const resetIso = useResetRecoilState(selectedIsoState);
  const resetPhone = useResetRecoilState(phoneState);
  const resetEmail = useResetRecoilState(emailState);

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
      resetDialCode();
      resetIso();
      resetPhone();
      return setType('email');
    }

    if (type === 'email') {
      resetEmail();
      return setType('phone');
    }
  };

  return {
    handlePhoneSignup,
    handleEmailSignup,
    handleChangeType,
  };
}
