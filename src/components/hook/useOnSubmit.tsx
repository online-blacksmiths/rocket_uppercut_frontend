import { FormEvent } from 'react';
import { UseMutateFunction } from 'react-query';

export default function useOnSubmit(mutate: UseMutateFunction) {
  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    mutate();
  };
  return { onSubmit };
}
