const forgotPasswordTemplate = ({ name, otp }) => {
  return `
    <div>
        <p>Dear ${name}</p>
        <p>Your requested password reset.please use following otp code to reset password.</p>
        <div style="background: yellow; font-size:20px;padding:20px;text-align:center; font-weight:800;">
        ${otp}
        </div>
        <p>this otp is valid for 1hr only. enter this otp on blinkit website to proceed with reseting password</p>
        </br></br>
        <p>Thanks</p>
        <p>Blinkit</p>
    </div>
    `;
};
export default forgotPasswordTemplate
