import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

function VerifyOTP() {
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  const email = location.state?.email;

  const verifyOTP = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      const res = await axios.post(
        "https://focussphere-uppl.onrender.com/verify-otp",
        {
          email,
          otp,
        }
      );

      toast.success(res.data.message);

      setTimeout(() => {
        navigate("/reset-password", {
          state: {
            email,
            otp,
          },
        });
      }, 1000);

    } catch (error) {
      toast.error(
        error.response?.data?.message || "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
      <h2 className="verify-title">Verify OTP</h2>
        <form onSubmit={verifyOTP}>
          <p>{email}</p>

          <input
            type="text"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            disabled={loading}
            required
          />

          <br />
          <br />

          <button type="submit" disabled={loading}>
            {loading ? "Verifying..." : "Verify OTP"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default VerifyOTP;