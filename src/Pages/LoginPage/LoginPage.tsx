import Button from "../../components/Button/Button";
import Heading from "../../components/Heading/Heading";
import Input from "../../components/Input/Input";
import { FieldValues, useForm } from "react-hook-form";
import { clearErrors, logIn } from "../../store/auth/auth.actions";
import { useDispatch, useSelector } from "react-redux";
import { AppState } from "../../store";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";

const LoginPage = () => {
  const { register, handleSubmit } = useForm<FieldValues>();
  const dispatch = useDispatch();
  const authError = useSelector((state: AppState) => state.authReducer.error);
  const isLoading = useSelector(
    (state: AppState) => state.authReducer.isLoading
  );

  const submitForm = (data: FieldValues) => {
    dispatch(logIn(data.username?.trim(), data.password?.trim()));
  };

  return (
    <div className="container mx-auto">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <Heading text="Sign in to your account" />
            <form
              className="space-y-4 md:space-y-6"
              action="#"
              onSubmit={handleSubmit(submitForm)}
            >
              <div>
                <label
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  htmlFor="username"
                >
                  Username
                </label>
                <Input
                  name="username"
                  type="text"
                  placeholder="username"
                  register={register}
                />
              </div>
              <div>
                <label
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  htmlFor="password"
                >
                  Password
                </label>
                <Input
                  name="password"
                  type="password"
                  placeholder="••••••••"
                  register={register}
                />
              </div>
              {isLoading ? (
                <LoadingSpinner />
              ) : (
                <Button text="Sign in" type="submit" />
              )}
            </form>
            {!!authError && (
              <div
                className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
                role="alert"
              >
                <span className="block sm:inline">
                  <strong>Invalid</strong> username or password!
                </span>
                <span
                  className="absolute top-0 bottom-0 right-0 px-4 py-3"
                  onClick={() => {
                    dispatch(clearErrors());
                  }}
                >
                  <svg
                    className="fill-current h-6 w-6 text-red-500"
                    role="button"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <title>Close</title>
                    <path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" />
                  </svg>
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
