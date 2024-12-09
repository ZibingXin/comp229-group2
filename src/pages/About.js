import React from 'react';
import "../style/about&contact.css"


function About() {
  return (
    <div className='about-container'>
      <img
            src="Logo.png"
            alt="Group Logo"
            className="logo-image"
          />
        <p>Members：</p>
        <p>Zibing Xin – 301427981</p>
        <p>Ngoc Ut Huong Ho - 301299380</p>
        <p>Ping Hei Chau - 301409281</p>
        <p>Xiaoyu Shi – 301352206</p>
        <p>Qingyao Liu – 301318128</p>
        <p>Yujuan Cui – 301396163</p>

    </div>
  );
}

export default About;