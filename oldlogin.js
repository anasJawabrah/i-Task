import { useForm } from "react-hook-form";
import axios from "axios";
// import "./App.css";

const Login = () => {
  const { register, handleSubmit, errors } = useForm();
  const onSubmit = (data) => {
    console.log(data);
    let a = { ...data };
    console.log(a);

    axios
      .post("http://localhost/classA/api/loginForm.php", a)
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <div  className='d-flex justify-content-center align-items-center  border border-black p-5 min-vh-100 '>
      <form
        className="border border-white p-5"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h4>Login form</h4>
        <div className="input-group m-3">
          <div className="input-group-append">
            <span className="input-group-text" id="basic-addon2">
              email
            </span>
          </div>
          <input
            id="email"
            name="email"
            ref={register({
              required: "required",
            })}
            type="email"
          />
        </div>
        <div className="input-group m-3">
          <div className="input-group-append">
            <span className="input-group-text" id="basic-addon1">
              Password
            </span>
          </div>
          <input
            id="password"
            name="password"
            ref={register({
              required: "required",
              minLength: {
                value: 5,
                message: "min length is 5",
              },
              pattern: {
                value: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^\w\s]).{8,}$/,
                message: "shoud contain S q ! 4",
              },
            })}
            type="password"
          />
          {errors.password && (
            <span role="alert">{errors.password.message}</span>
          )}
        </div>
        <div
          className="input-group mt-5
  justify-content-center "
        >
          <input
            type="submit"
            className="btn btn-primary px-3 py-2 text-sccuss  "
            name="submit"
            value="submit"
          />
        </div>
      </form>
    </div>
  );
};

export default Login;

<div className="input-group m-3">
          <div className="input-group-append">
            <span className="input-group-text" id="basic-addon1">
              Password
            </span>
          </div>
          <input
            id="password"
            name="password"
            ref={register({
              required: "required",
              minLength: {
                value: 5,
                message: "min length is 5",
              },
              pattern: {
                value: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^\w\s]).{8,}$/,
                message: "shoud contain S q ! 4",
              },
            })}
            type="password"
          />
          {errors.password && (
            <span role="alert">{errors.password.message}</span>
          )}
</div>

   