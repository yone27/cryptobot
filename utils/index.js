import toast from "react-hot-toast";

// NOTIFICATIONS
export const notifyError = (msg) => toast.error(msg, { duration: 2000 });
export const notifySuccess = (msg) => toast.success(msg, { duration: 2000 });


// HANDLE FORMS
export const handleFieldChange = (e, setState) => {
  const { name, value } = e.target;
  setState(prevState => ({
    ...prevState,
    [name]: value,
  }));
};