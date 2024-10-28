import { useState, useEffect } from "react";
import axios from "axios";
import { Domain } from "@/utils/constent";

const SignOut = () =>{
    const handleLogout = () => {
        sessionStorage.removeItem("token");
        sessionStorage.removeItem("user");
        navigate("/login");
        showToast("Logged out successfully", "success");
      };
      return(
        <div>
            <button onClick={handleLogout}>Sign Out</button>
        </div>
      )
}
export default SignOut;