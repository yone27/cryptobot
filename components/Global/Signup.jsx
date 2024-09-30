import React, { useState } from "react";

const Signup = ({ axios, setActiveComponent, notifyError, notifySuccess }) => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    passwordConfirm: ""
  });

  const handleFormFieldChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const createAccount = async (e) => {
    e.preventDefault();

    if (Object.values(user).some((value) => value === "")) {
      return notifyError("Please provide all the details.");
    }

    notifySuccess("Wait creating your account...");

    try {
      const response = await axios({
        method: "POST",
        url: `/api/v1/users/signup`,
        withCredentials: true,
        data: {
          name: user.name,
          email: user.email,
          password: user.password,
          passwordConfirm: user.passwordConfirm
        }
      });


      if (response.data.status === "success") {

        notifySuccess("Account created successfully");
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
        <form className='login' onSubmit={createAccount}>
          <div className='form__content'>
            <div className='form__title'>Sign up</div>

            <div className='form__username'>
              <label htmlFor='user_login'>Name</label>
              <input
                type='text'
                name="name"
                className='input'
                onChange={(e) => handleFormFieldChange(e)}
              />
            </div>
            <div className='form__username'>
              <label htmlFor='user_login'>Email</label>
              <input
                type="email"
                name="email"
                className='input'
                onChange={(e) => handleFormFieldChange(e)}
              />
            </div>
            <div className='form__username'>
              <label htmlFor='user_login'>Password</label>
              <input
                type='text'
                className='input'
                name="password"
                onChange={(e) =>
                  handleFormFieldChange(e)
                }
              />
            </div>
            <div className='form__username'>
              <label htmlFor='user_login'>Password Confirm</label>
              <input
                type='text'
                className='input'
                name="passwordConfirm"
                onChange={(e) =>
                  handleFormFieldChange(e)
                }
              />
            </div>

            <div className='form__alternative'>
              <button className="techwave_fn_button">
                <span>Create Account</span>
              </button>
            </div>
          </div>
        </form>

        <div className='sign__desc'>
          <p>
            Your are a member?
            <a onClick={() => setActiveComponent("Login")}> Login</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
