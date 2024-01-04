import React from 'react';

const TextAreaField = (props) => {
  const { label, defaultValue = '', idRegister, className, rows, register } = props;
  return (
    <div>
      <label className="block text-sm font-medium leading-6 text-gray-900">{label}</label>
      <div className="mt-2">
        {register ? (
          <textarea
            {...register(idRegister)}
            rows={rows}
            className={`border-0 p-1.5 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 ${className}`}
            defaultValue={defaultValue}
          />
        ) : (
          <textarea
            rows={rows}
            className={` ${className} border-0 p-1.5 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600`}
            defaultValue={defaultValue}
          />
        )}
      </div>
    </div>
  );
};

export default TextAreaField;
