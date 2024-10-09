import React, { useEffect, useState } from 'react'

export interface InterfaceUserDetails {
  image: string,
  name: string,
  username: string,
  walletAddress: string,
  privateKey: string,
  biography: string,
}

const Profile = ({ setActiveComponent }) => {
  const [userDetails, setUserDetails] = useState<InterfaceUserDetails>()

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("userProfile"))
    setUserDetails(user)
  }, [])

  return (
    <div className='techwave_fn_content'>
      <div className="techwave_fn_page">
        <div className="techwave_fn_user_profile_page">
          <div className="techwave_fn_pagetitle">
            <h2 className="title">User Profile</h2>
          </div>

          <div className="container small">
            <div className="techwave_fn_user_profile">
              <div className="user_avatar">
                <img src={userDetails?.image || "img/crypto.png"} alt="" />
              </div>

              <div className="user_details">
                <ul>
                  <li>
                    <div className="item">
                      <h4 className="subtitle">
                        Name
                      </h4>
                      <h3 className="title">
                        {userDetails?.name || "Update"}
                      </h3>
                    </div>
                  </li>

                  <li>
                    <div className="item">
                      <h4 className="subtitle">
                        Username
                      </h4>
                      <h3 className="title">
                        {userDetails?.username || "Update"}
                      </h3>
                    </div>
                  </li>

                  <li>
                    <div className="item">
                      <h4 className="subtitle">
                        Address
                      </h4>
                      <h3 className="title">
                        {userDetails?.walletAddress || "Update"}
                      </h3>
                    </div>
                  </li>
                </ul>
              </div>
              <a onClick={() => setActiveComponent("Setting")} className='user_edit fn__icon_button'>
                <img src="img/lighticon/light-4.png" alt="icon" />
              </a>
            </div>

            <div className="user__plan">
              <div className="plan_left">
                <h4 className="subtitle">Your Key</h4>

                <p className="info">
                  <span>PrivateKey</span>
                  {userDetails?.privateKey || "privatekey"}
                </p>
              </div>
            </div>

            <div className="user__interests">
              <h4 className="title">Your Bigraphy</h4>
              <p>
                {userDetails?.biography}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile