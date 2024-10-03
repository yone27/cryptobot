export const handleFormFieldChange = (e) => {
  setToken({ ...token, [e.target.name]: e.target.value });
};
