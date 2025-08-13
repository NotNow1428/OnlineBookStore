import React from 'react';

const SelectField = ({ label, name, options, register }) => {
  return (
    <div className="mb-4">
      <label className="block text-sm font-semibold text-gray-200 mb-2">
        {label}
      </label>
      <select
        {...register(name)}
        className="w-full p-2 rounded bg-slate-700 border border-slate-600 text-gray-100 focus:outline-none focus:border-purple-500"
      >
        {options.map(opt => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectField;

