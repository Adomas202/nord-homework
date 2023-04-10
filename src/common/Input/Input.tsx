import { FieldValues, UseFormRegister } from "react-hook-form";

interface Props {
  name: string;
  type: string;
  placeholder: string;
  register: UseFormRegister<FieldValues>;
}

const Input = (props: Props) => {
  const { name, type, placeholder, register } = props;
  return (
    <input
      {...register(name)}
      type={type}
      name={name}
      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      placeholder={placeholder}
    />
  );
};

export default Input;
