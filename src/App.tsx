import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppState } from "./store";
import { checkAuthentication } from "./store/auth/auth.actions";
import Pages from "./routes/Pages";

const App = () => {
  const dispatch = useDispatch();
  const authChecked = useSelector(
    (state: AppState) => state.authReducer.authChecked
  );

  useEffect(() => {
    dispatch(checkAuthentication() as any);
  }, [dispatch]);

  const app = authChecked ? <Pages /> : null;

  return app;
};

export default App;
