import { useForm } from "react-hook-form";
import { useState } from "react";
import axios from "axios";

import AddMsg from "./AddMsg";
import AddMsg2 from "./AddMsg2";

// import "./App.css";

const Login = () => {
  // Add msg 1 comp.
  const [isSubmit, setIsSubmit] = useState(false);

  let close = () => {
    setIsSubmit(false);
  };
  let next = () => {
    setIsSubmit2(true);
    setIsSubmit(false);
  };

  // Add msg 2 comp.
  const [isSubmit2, setIsSubmit2] = useState(false);

  let close2 = () => {
    setIsSubmit2(false);
  };

  ///end the msg comp

  const { register, handleSubmit, errors } = useForm();

  const [userData, setUserData] = useState([]);

  const onSubmit = (data) => {
    // console.log(data);
    let a = { ...data };
    setUserData(a);
    setIsSubmit(true);
  };

  return (
    <div
      style={{ backgroundColor: "#f5f5f5" }}
      className="d-flex justify-content-center align-items-center  border border-black p-1 min-vh-100 "
    >
      <form
        className="border border-black p-5 bg-white"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h1
          style={{ fontSize: "6rem" }}
          className="h1 text-center font-weight-bold mx-5"
        >
          LOGO
        </h1>
        <div style={{ textAlign: "right" }}>
          <label class="col-md-4  "> الأسم</label>
        </div>
        <div className="input-group ">
          <br />
          <input
            id="name"
            name="name"
            className="form-control text-center input-lg"
            ref={register({
              required: "required",
              pattern: {
                value: /^[a-zA-Z]{4,}(?: [a-zA-Z]+){0,2}$/,
                message: "الرجاء ادخال الاسم في حدود الثلاث مقاطع ",
              },
            })}
            type="text"
          />
          <br />
        </div>
        <div>
          {errors.mobile && <span role="alert">{errors.mobile.message}</span>}
        </div>
        <br />

        <div style={{ textAlign: "right" }}>
          <label class="col-md-4  "> الجوال</label>
        </div>
        <div className="input-group ">
          <br />
          <input
            id="mobile"
            name="mobile"
            className="form-control text-center input-lg"
            ref={register({
              required: "required",
              minLength: {
                value: 10,
                message: "ادخل رقم موبايل يحوي 10 خانات",
              },
              pattern: {
                value: /^[0][7][7|8|9][0-9]{7}$/,
                message:
                  "الرجاء ادخال رقم موبايل اردني على هذا النمط 0770077777",
              },
            })}
            type="tel"
          />
          <br />
        </div>
        <div>
          {errors.mobile && <span role="alert">{errors.mobile.message}</span>}
        </div>
        <br />
        <div style={{ textAlign: "right" }}>
          <label class="col-md-4  ">البريد الإلكتروني</label>
        </div>
        <div className="input-group ">
          <br />
          <input
            id="email"
            name="email"
            className="form-control text-center"
            ref={register({
              required: "required",
              message: "الرجاء ادخال البريد الألكتروني",
            })}
            type="email"
          />
        </div>
        <div>
          {errors.email && <span role="alert">{errors.email.message}</span>}
        </div>
        <div className="input-group mt-5 justify-content-center ">
          <input
            type="submit"
            className="btn btn-primary px-3 py-2 text-sccuss btn-block "
            name="submit"
            value="ارسال"
          />
        </div>
      </form>

      <AddMsg
        show={isSubmit}
        onHide={close}
        next={next}
        userInfo={userData}
        setUserData={setUserData}
      />

      <AddMsg2
        show={isSubmit2}
        onHide={close2}
        userInfo={userData}
        setUserData={setUserData}
      />
    </div>
  );
};

export default Login;
