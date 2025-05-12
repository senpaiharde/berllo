export const loginUser = async (email,password) => {
    const res = await fetch("http://localhost:4000/auth/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
    });

    if (!res.ok) {
        const error = await res.json();
        throw new Error(error.error || "Login failed");
    }

    const { token} = await res.json();
    return token
};

export const SignupUser = async (email,password,name) => {
    const res = await fetch('http://localhost:4000/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password ,name}),

      });

      if(!res.ok){
        const error =await res.json();
        throw new Error(error.error  || "Problem at signup");
        
      }
      const {token} = await res.json()
      token
}



