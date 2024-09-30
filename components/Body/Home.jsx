import React from "react";
import Footer from "../Global/Footer";

// INTERNAL IMPORT

const Home = () => {
  return (
    <div className='techwave_fn_content'>
      <div className='techwave_fn_page'>
        <div className='techwave_fn_home'>
          <div className='section_home'>
            <div className='section_left'>
              <div className='techwave_fn_title_holder'>
                <h1 className='title'>Automate your cryupto trading</h1>
                <p className='desc'>
                  Carypto financila bot for buying and sell crypto
                </p>
              </div>
              <div className='techwave_fn_interactive_list'>
                <ul>
                  <li>
                    <div className='item'>
                      <a>
                        <span className='icon'>
                          <img
                            src='img/lighticon/light-19.png'
                            alt=''
                            className='fn__svg'
                          />
                        </span>
                        <h2 className='title'> buy any token</h2>
                        <p className='desc'>
                          Lorem ipsum dolor sit amet consectetur adipisicing
                          elit. Ipsa quam ex explicabo delectus molestiae saepe
                          facilis eveniet, consequatur cupiditate culpa itaque
                          voluptatibus, odit quas repudiandae deleniti voluptas
                          repellendus laudantium amet.
                        </p>
                        <span className='arrow'>
                          <img
                            src='img/lighticon/light-22.png'
                            className='fn__svg'
                            alt=''
                          />
                        </span>
                      </a>
                    </div>
                  </li>

                  <li>
                    <div className='item'>
                      <a>
                        <span className='icon'>
                          <img
                            src='img/lighticon/light-16.png'
                            alt=''
                            className='fn__svg'
                          />
                        </span>
                        <h2 className='title'>Sell any token</h2>
                        <p className='desc'>
                          Lorem ipsum dolor sit amet consectetur adipisicing
                          elit. Ipsa quam ex explicabo delectus molestiae saepe
                          facilis eveniet, consequatur cupiditate culpa itaque
                          voluptatibus, odit quas repudiandae deleniti voluptas
                          repellendus laudantium amet.
                        </p>
                        <span className='arrow'>
                          <img
                            src='img/lighticon/light-16.png'
                            className='fn__svg'
                            alt=''
                          />
                        </span>
                      </a>
                    </div>
                  </li>
                </ul>
              </div>
            </div>

            <div className='section_right'>
              <div className='company_info'>
                <img src='img/light-logo.png' alt='' />
                <p className='fn__animated_text'>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Voluptates, ea tenetur alias quasi omnis molestiae distinctio
                  a? Sequi commodi repellat sed fugit accusamus nulla, molestiae
                  vel labore repudiandae consequatur soluta.
                </p>
                <hr />
                <div className='fn__members'>
                  <div className='active item'>
                    <span className='circle'></span>
                    <span className='text'>1111 online</span>
                  </div>
                  <div className='item'>
                    <span className='circle'></span>
                    <span className='text'>22222 members</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Home;
