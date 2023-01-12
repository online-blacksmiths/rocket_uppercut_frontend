import { Dispatch, SetStateAction } from 'react';

export type SignupProps = {
  type: string;
  setType: Dispatch<SetStateAction<string>>;
  setIsForm: Dispatch<SetStateAction<boolean>>;
};

export type SignupFormProps = Pick<SignupProps, 'setIsForm'> &
  Pick<SignupProps, 'type'> & {
    setShowDropdown: Dispatch<SetStateAction<boolean>>;
    setSelectedDialCode: Dispatch<SetStateAction<string>>;
    setSelectedIso: Dispatch<SetStateAction<string>>;
    input: SignupInputTypes;
    setInput: Dispatch<SetStateAction<SignupInputTypes>>;
    setPhone: Dispatch<SetStateAction<string>>;
    setEmail: Dispatch<SetStateAction<string>>;
  };

export type SignupResTypes = {
  access_token: string;
  refresh_token: string;
  expired_date: string;
};

export type SignupInputTypes = {
  password: string;
  firstName: string;
  lastName: string;
};

export type SignupMutateDataType = {
  phone?: string;
  email?: string;
  password: string;
  first_name: string;
  last_name: string;
  is_terms_of_service: boolean;
  is_privacy_statement: boolean;
};
