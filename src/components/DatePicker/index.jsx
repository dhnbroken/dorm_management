import dayjs from 'dayjs';
import { DatePicker as CustomDatePicker } from 'antd';
import moment from 'moment';
import { useEffect, useState } from 'react';

export default function DatePicker({
  setSelectedDate,
  defaultValue,
  isStudent,
  className,
  picker = '',
  placeHolder = 'DD/MM/YYYY',
  format = 'DD/MM/YYYY'
}) {
  const onChange = (date, dateString) => {
    setSelectedDate(dateString);
  };

  const [date, setDate] = useState(null);

  useEffect(() => {
    !!defaultValue && setDate(moment(defaultValue).format('DD/MM/YYYY'));
  }, [defaultValue]);

  return !!date ? (
    <CustomDatePicker
      disabled={isStudent}
      format={format}
      className={`custom_select_field date-input disabled:bg-slate-100/70 disabled:cursor-not-allowed ${className}`}
      onChange={onChange}
      defaultValue={dayjs(date, 'DD/MM/YYYY')}
      picker={picker}
    />
  ) : (
    <CustomDatePicker
      disabled={isStudent}
      format={format}
      className={`custom_select_field date-input disabled:bg-slate-100/70 disabled:cursor-not-allowed ${className}`}
      placeholder={placeHolder}
      onChange={onChange}
      picker={picker}
    />
  );
}
