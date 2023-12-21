import React, { useState } from "react";
import "./style/index.css";
import OTPInput from "react-otp-input";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../../../API";

const OtpVerify = () => {
  const [OTP, setOTP] = useState("");
  const [click,setClick] = useState(false)
  const navigate = useNavigate()
  function handleChange(OTP) {
    setOTP(OTP);
  }
  const onSumbit = async(e) => {
    const _id =  localStorage.getItem("id")
    const forgot =  localStorage.getItem("forgot")
    await axios.post(`${API_URL}/verfiy`,{_id,otp:OTP}).then((data)=>{
    console.log(data)
    navigate(forgot?"/newPassword":`/`)
    }).catch((err)=>{
      console.log(err)
    })
  };
  return (
    <div className="user-registration-form">
      <h1>Opt Verify</h1>
      <div className="user-manage-verify">
      <div className="otp-user-registration">
      <OTPInput
        onChange={handleChange}
        value={OTP}
        inputStyle="inputStyle"
        numInputs={4}
        separator={<span></span>}
        renderInput={(props) => <input {...props} />}
      />
      </div>
      <input type="submit" value="Verify" onClick={onSumbit}/>
      <div onClick={()=>setClick(true)} style={{marginTop:10,fontSize:"16px",fontFamily:"Poppins",fontWeight:600,color:click?"rgba(0,0,0,0.3)":"red",cursor:"pointer"}}>
      Resend Otp {click?<span style={{color:"rgba(0,0,0,0.2)"}}>Enable After 3min</span>:<></>}
      </div>
      </div>
    </div>
  );
};

export default OtpVerify;
