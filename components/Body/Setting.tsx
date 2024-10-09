import React, { useCallback, useEffect, useState } from 'react'
import { handleFieldChange, notifyError, notifySuccess } from '../../utils';
import { useDropzone } from 'react-dropzone';
import axios from 'axios';
import { InterfaceUserDetails } from './Profile';

const Setting = () => {
  const [displayImg, setDisplayImg] = useState("");
  const [userDetails, setUserDetails] = useState<InterfaceUserDetails>()
  const [user, setUser] = useState({
    name: "",
    username: "",
    walletAddress: "",
    privateKey: "",
    image: displayImg,
    biography: ""
  });

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("userProfile"))
    setUserDetails(user)
  }, [])


  const handleSubmit = (e) => {
    e.preventDefault();
    const requiredFields = ["name", "username", "walletAddress", "biography", "privateKey", "image"];
    const temporalUser = Object.fromEntries(
      requiredFields.map((field) => [field, user[field]])
    );

    if (Object.values(temporalUser).some((value) => value === ""))
      return notifyError("Please provide all data.")

    localStorage.setItem("userProfile", JSON.stringify(user));
    notifySuccess("Profile updated successfully");
  };

  const uploadToInfure = async (file) => {
    notifySuccess("Uploading file");

    if (file) {
      try {
        const formData = new FormData();
        formData.append("file", file);

        const response = await axios({
          method: "post",
          url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
          data: formData,
          maxBodyLength: Infinity,
          headers: {
            pinata_api_key: "004da6b7324280d4181d",
            pinata_secret_api_key:
              "7680bb76e46cec6d125e1c9ae9208e38e0ab1c860c5b569b79bee5fa591e1515",
            "Content-Type": "multipart/form-data"
          }
        });

        const ImgHash = `https://gateway.pinata.cloud/ipfs/${response.data.IpfsHash}`;
        setUser((prevState) => ({
          ...prevState,
          image: ImgHash
        }));
        setDisplayImg(ImgHash);

        notifySuccess("Uploaded  successfull");
      } catch (error) {
        notifyError("Unable to upload image to pinata");
        console.log(error);
      }
    }
  };

  const onDrop = useCallback(async (acceptedFile) => {
    await uploadToInfure(acceptedFile[0]);
  }, []);

  const {
    getInputProps,
    getRootProps,
    isDragAccept,
    isDragReject,
    isDragActive
  } = useDropzone({
    onDrop,
    maxSize: 500000000
  });

  return (
    <div className='techwave_fn_content'>
      <div className='techwave_fn_page'>
        <div className='techwave_fn_user_setting_page'>
          <div className='techwave_fn_pagetitle'>
            <h2 className='h2'>Add network</h2>
          </div>

          <div className='container small'>
            <div className='techwave_fn_user_setting'>
              <form onSubmit={handleSubmit}>
                <div className='user__settings'>
                  <div className='settings__left'>
                    <label htmlFor='input' className='fn_upload'>
                      {displayImg == "" ? (
                        <span className='upload_content' {...getRootProps()}>
                          <span className='title'>Drag & Drop a Image</span>
                          <span className='fn__lined_text'>
                            <span className='line'></span>
                            <span className='text'>Ok</span>
                            <span className='line'></span>
                          </span>
                          <span className='title'>Browse</span>
                          <span className='desc'>
                            Support JPG, JPGE and PNG
                          </span>
                          <input
                            type='file'
                            accept='image/*'
                            {...getInputProps()}
                          />
                        </span>
                      ) : (
                        <img src={displayImg} alt='' className='preview_img' />
                      )}
                    </label>
                  </div>

                  <div className='settings__right'>
                    <div className='item'>
                      <label htmlFor='data' className='input_label'>
                        Name
                      </label>

                      <div className='input_item'>
                        <input
                          name='name'
                          type='text'
                          className='input'
                          placeholder={userDetails?.name}
                          onChange={(e) => handleFieldChange(e, setUser)}
                        />
                      </div>
                    </div>

                    <div className='item'>
                      <label htmlFor='data' className='input_label'>
                        Username
                      </label>

                      <div className='input_item'>
                        <input
                          name='username'
                          type='text'
                          className='input'
                          placeholder={userDetails?.username}
                          onChange={(e) => handleFieldChange(e, setUser)}
                        />
                      </div>
                    </div>

                    <div className='item'>
                      <label htmlFor='data' className='input_label'>
                        Wallet Address
                      </label>

                      <div className='input_item'>
                        <input
                          name='walletAddress'
                          type='text'
                          className='input'
                          placeholder={userDetails?.walletAddress}
                          onChange={(e) => handleFieldChange(e, setUser)}
                        />
                      </div>
                    </div>

                    <div className='item'>
                      <label htmlFor='data' className='input_label'>
                        Private key
                      </label>

                      <div className='input_item'>
                        <input
                          name='privateKey'
                          type='text'
                          className='input'
                          placeholder={userDetails?.privateKey}
                          onChange={(e) => handleFieldChange(e, setUser)}
                        />
                      </div>
                    </div>

                    <div className='item'>
                      <label htmlFor='data' className='input_label'>
                        Biography
                      </label>

                      <div className='input_item'>
                        <input
                          name='biography'
                          type='text'
                          className='input'
                          placeholder={userDetails?.biography}
                          onChange={(e) => handleFieldChange(e, setUser)}
                        />
                      </div>
                    </div>

                    <div className='item'>
                      <div>
                        <button className='techwave_fn_button'>
                          Save profile
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Setting