import { useDispatch } from "react-redux";
import Button from "../../common/Button/Button";
import Heading from "../../common/Heading/Heading";
import Input from "../../common/Input/Input";
import { FieldValues, useForm } from "react-hook-form";
import { logIn } from "../../store/auth/auth.actions";

const LoginPage = () => {
  const { register, handleSubmit } = useForm<FieldValues>();
  const dispatch = useDispatch();

  const submitForm = (data: FieldValues) => {
    dispatch(logIn(data.username?.trim(), data.password?.trim()) as any);
  };

  return (
    <>
      <section className="bg-gray-50 dark:bg-gray-900">
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
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
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
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Password
                  </label>
                  <Input
                    name="password"
                    type="password"
                    placeholder="••••••••"
                    register={register}
                  />
                </div>
                <Button text="Sign in" type="submit" />
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default LoginPage;
