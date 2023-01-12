import { ChangeEvent } from 'react';
import { SignupFormProps } from '../types';

export default function useSignupForm({
  setIsForm,
  setShowDropdown,
  setSelectedDialCode,
  setSelectedIso,
  input,
  setInput,
  type,
  setPhone,
  setEmail,
}: SignupFormProps) {
  const handleDropdown = () => {
    setShowDropdown(prev => !prev);
  };

  const handleChangeTel = (dialCode: string, iso: string) => {
    setSelectedDialCode(`+${dialCode}`);
    setSelectedIso(iso);
    setShowDropdown(false);
  };

  const handleChangeForm = () => {
    setIsForm(false);
  };

  const handleChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };

  const handleChangeId = (e: ChangeEvent<HTMLInputElement>) => {
    if (type === 'phone') {
      setPhone(e.target.value);
      return;
    }

    setEmail(e.target.value);
  };

  return {
    handleDropdown,
    handleChangeTel,
    handleChangeForm,
    handleChangeInput,
    handleChangeId,
  };
}
