import React from 'react';
const InputField = ({ label, name, placeholder, register, type = "text" }) => {
  return (
    <div className="mb-4">
      <label className="block text-sm font-semibold text-gray-200 mb-2">
        {label}
      </label>
      {type === "textarea" ? (
        <textarea
          {...register(name)}
          placeholder={placeholder}
          className="w-full p-2 rounded bg-slate-700 border border-slate-600 text-gray-100 placeholder-gray-400 focus:outline-none focus:border-purple-500"
        />
      ) : (
        <input
          type={type}
          {...register(name)}
          placeholder={placeholder}
          className="w-full p-2 rounded bg-slate-700 border border-slate-600 text-gray-100 placeholder-gray-400 focus:outline-none focus:border-purple-500"
        />
      )}
    </div>
  );
};


export default InputField;