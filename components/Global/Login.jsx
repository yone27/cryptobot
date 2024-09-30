import React, { useState } from "react";

const Login = ({ axios, setActiveComponent, notifyError, notifySuccess }) => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const handleFormFieldChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const login = async (e) => {
    e.preventDefault();

    if (Object.values(user).some((value) => value === "")) {
      return notifyError("Please provide email and password.");
    }

    notifySuccess("Wait login to your account please...");

    try {
      const response = await axios({
        method: "POST",
        url: `/api/v1/users/login`,
        withCredentials: true,
        data: {
          email: user.email,
          password: user.password,
        }
      });

      if (response.data.status === "success") {
        notifySuccess("Login successfully");
        localStorage.setItem(
          "USER_MEMBERSHIP",
          response.data.data.user.membershipType
        );
        localStorage.setItem("CryptoBot_Backend", response.data.data.user._id);
        localStorage.setItem("CryptoAUT_TOKEN", response.data.token);

        window.location.reload();
      } else {
        notifyError("Something went work, try again later");
      }
    } catch (error) {
      notifyError("Something went work, try again later");
    }
  };

  return (
    <div className='techwave_fn_sign'>
      <div className='sign__content'>
        <h1 className='logo'>Design by yone</h1>
        <form className='login' onSubmit={login}>
          <div className='form__content'>
            <div className='form__title'>Sign in</div>

            <div className='form__username'>
              <label htmlFor='user_login'>Email</label>
              <input
                type='text'
                name='email'
                className='input'
                onChange={(e) => handleFormFieldChange(e)}
              />
            </div>
            <div className='form__username'>
              <label htmlFor='user_login'>Password</label>
              <input
                type='text'
                className='input'
                name='password'
                onChange={(e) => handleFormFieldChange(e)}
              />
            </div>

            <div className='form__alternative'>
              <button className="techwave_fn_button">
                <span>Login</span>
              </button>
            </div>
          </div>
        </form>

        <div className='sign__desc'>
          <p>
            Not a member?
            <a onClick={() => setActiveComponent("Signup")}> Signup</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
