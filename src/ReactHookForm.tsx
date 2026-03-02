import { useCallback } from 'react';
import { useForm } from 'react-hook-form';

type Inputs = {
  text: string;
  dropdown: string;
  checkbox: string[];
  radio: string;
  date: string;
};

export default function ReactHookFormComponent() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    defaultValues: {
      text: 'zohaib',
      dropdown: 'option2',
      checkbox: ['green', 'blue'],
      radio: 'Female',
      date: '2026-03-03',
    },
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
      </div>

      {/* DATE INPUT */}
      <div>
        <label>
          Date: <input {...register('date')} type="date" />
        </label>
      </div>

      <div>
        <input type="submit" value="Submit" />
      </div>
    </form>
  );
}
