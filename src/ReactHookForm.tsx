import { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

type Inputs = {
  text: string;
  dropdown: string;
  checkbox: string[];
  radio: string;
  date: string;
};

const schema = yup
  .object({
    text: yup.string().required(),
    dropdown: yup.string().required(),
    radio: yup.string().required(),
    date: yup.string().required(),
    checkbox: yup.array().of(yup.string().required()).required().min(1),
  })
  .required();

export default function ReactHookFormComponent() {
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty, isValid },
  } = useForm<Inputs>({
    defaultValues: {
      text: 'zohaib',
      dropdown: 'option2',
      checkbox: ['green', 'blue'],
      radio: 'Male',
    },
    resolver: yupResolver(schema),
    mode: 'onBlur',
  });

  const onSubmission = useCallback((data: Inputs) => {
    alert(JSON.stringify(data));
  }, []);

  return (
    <form onSubmit={handleSubmit(onSubmission)}>
      {/* TEXT INPUT */}
      <div>
        <label>
          Input Value: <input type="text" {...register('text')} />
        </label>
        <p>{errors.text?.message}</p>
      </div>

      {/* DROPDOWN INPUT */}
      <div>
        {' '}
        <label>
          Dropdown select:{' '}
          <select {...register('dropdown')}>
            <option value="option1">Option 1</option>
            <option value="option2">Option 2</option>
          </select>
        </label>
        <p>{errors.dropdown?.message}</p>
      </div>

      {/* CHECKBOX INPUT */}
      <div>
        <label>
          <input {...register('checkbox')} type="checkbox" value="blue" /> Blue
        </label>
        <label>
          <input {...register('checkbox')} type="checkbox" value="red" /> Red
        </label>
        <label>
          <input {...register('checkbox')} type="checkbox" value="green" /> Green
        </label>
        <p>{errors.checkbox?.message}</p>
      </div>

      {/* RADIO INPUT */}
      <div>
        Gender:{' '}
        <label>
          <input {...register('radio')} type="radio" value="Male" /> Male
        </label>
        <label>
          <input {...register('radio')} type="radio" value="Female" /> Female
        </label>
        <p>{errors.radio?.message}</p>
      </div>

      {/* DATE INPUT */}
      <div>
        <label>
          Date: <input {...register('date')} type="date" />
        </label>
        <p>{errors.date?.message}</p>
      </div>

      <div>
        <input type="submit" value="Submit" disabled={!isDirty || !isValid} />
      </div>
    </form>
  );
}
