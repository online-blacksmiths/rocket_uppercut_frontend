import { atom } from 'recoil';

export const selectedDialCodeState = atom<string>({
  key: 'selectedDialCode',
  default: '+82',
});

export const selectedIsoState = atom<string>({
  key: 'selectedIsoCode',
  default: 'kr',
});

export const phoneState = atom<string>({
  key: 'phone',
  default: '',
});

export const emailState = atom<string>({
  key: 'email',
  default: '',
});
