import { Dispatch, SetStateAction } from 'react';

export type SignupProps = {
  type: string;
  setType: Dispatch<SetStateAction<string>>;
  setIsForm: Dispatch<SetStateAction<boolean>>;
};
