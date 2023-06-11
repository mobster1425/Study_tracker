const API_URI="http://localhost:5000/api/v1/auth/";


//login
const login=async(userData)=>{
    const response=await fetch(API_URI+"login",{
        method:"POST",
        headers:{
            Accept:"application/json",
            "Content-type":"application/json",
        },
        body:JSON.stringify(userData),
    });

    const data=await response.json();
    if(response.status!== 200){
        throw new Error(data.message);
    }

    if(data){
        localStorage.setItem("studytrackeruser",JSON.stringify(data));
    }
    return data;
}

//register
const register = async (userData) => {
    const response = await fetch(API_URI + "register", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });
  
    const data = await response.json();
    
    if (data) {
      localStorage.setItem("studytrackeruser", JSON.stringify(data));
    }
    return data;
  };

  //logout
  const logout = async () => {
   // await fetch(API_URI + "logout");
    localStorage.removeItem("studytrackeruser")

};

const authService={
    logout,
    login,
    register
};

export default authService;
