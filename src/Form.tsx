import { useCallback, useState } from 'react';

export default function FormComponent() {
  const [formData, setFormData] = useState<{
    text: string;
    dropdown: string;
    checkbox: string[];
    radio: string;
    date: string;
  }>({
    text: '',
    dropdown: '',
    checkbox: [],
    radio: '',
    date: '',
  });

  const handleTextChange = useCallback((event: any) => {
    setFormData((formData) => {
      return {
        ...formData,
        text: event.target.value,
      };
    });
  }, []);

  const handleDropdownChange = useCallback((event: any) => {
    setFormData((formData) => {
      return {
        ...formData,
        dropdown: event.target.value,
      };
    });
  }, []);

  const handleCheckboxChange = useCallback((event: any) => {
    setFormData((formData) => {
      const checkedValues = formData.checkbox;
      const isChecked = event.target.checked;
      const checkboxValue = event.target.value;
      const newCheckedValues = isChecked
        ? [...checkedValues, checkboxValue]
        : checkedValues.filter((value) => value !== checkboxValue);

      return {
        ...formData,
        checkbox: newCheckedValues,
      };
    });
  }, []);

  const handleRadioChange = useCallback((event: any) => {
    setFormData((formData) => {
      return {
        ...formData,
        radio: event.target.value,
      };
    });
  }, []);

  const handleDateChange = useCallback((event: any) => {
    setFormData((formData) => {
      return {
        ...formData,
        date: event.target.value,
      };
    });
  }, []);

  const handleSubmit = useCallback(
    (event: React.SubmitEvent<HTMLFormElement>) => {
      event.preventDefault();
      alert(JSON.stringify(formData));
    },
    // Need to mention values so we get latest value in function instead of first memoized values
    [formData],
  );

  return (
    <form onSubmit={handleSubmit}>
      {/* TEXT INPUT */}
      <div>
        <label>
          Input Value: <input type="text" value={formData.text} onChange={handleTextChange} />
        </label>
      </div>

      {/* DROPDOWN INPUT */}
      <div>
        {' '}
        <label>
          Dropdown select:{' '}
          <select value={formData.dropdown} onChange={handleDropdownChange}>
            <option value="option1">Option 1</option>
            <option value="option2">Option 2</option>
            <option value="option3">Option 3</option>
          </select>
        </label>
      </div>

      {/* CHECKBOX INPUT */}
      <div>
        <label>
          Checkbox:{' '}
          <label htmlFor="color">
            <input
              type="checkbox"
              name="color"
              checked={formData.checkbox.includes('blue')}
              onChange={handleCheckboxChange}
              value="blue"
            />{' '}
            Blue
          </label>
        </label>
      </div>

      {/* RADIO INPUT */}
      <div>
        <label>
          Gender:{' '}
          <label>
            <input
              type="radio"
              value="Male"
              checked={formData.radio === 'Male'}
              onChange={handleRadioChange}
            />{' '}
            Male
          </label>
          <label>
            <input
              type="radio"
              value="Female"
              checked={formData.radio === 'Female'}
              onChange={handleRadioChange}
            />{' '}
            Female
          </label>
          <label>
            <input
              type="radio"
              value="Other"
              checked={formData.radio === 'Other'}
              onChange={handleRadioChange}
            />{' '}
            Other
          </label>
        </label>
      </div>

      {/* DATE INPUT */}
      <div>
        <label>
          Date:{' '}
          <input
            type="date"
            name="date"
            id="date"
            value={formData.date}
            onChange={handleDateChange}
          />
        </label>
      </div>

      <div>
        <input type="submit" value="Submit" />
      </div>
    </form>
  );
}
