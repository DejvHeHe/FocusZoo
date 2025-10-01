import AsyncStorage from "@react-native-async-storage/async-storage";
export async function register(data) {
  try {
    const response = await fetch("http://:5000/users/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data),
    });
    const result = await response.json();

    if (!response.ok) {
      return { error: true, message:result.message};
    }

    return result;
  } catch (error) {
    console.error("Error during registration:", error);
  }
}

export async function login(data) {
  try {
    const response = await fetch("http://:5000/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data),
    });
     

    const result = await response.json();    
    console.log(result)
    if (!response.ok) {
      return { error: true, message:result.message};
    }

    // ✅ Ensure you're saving only the token string
    if (typeof result.token === "string") {
      await AsyncStorage.setItem("token", result.token);
      return result.token;
    } else {
      console.error("Login result.token is not a string:", result.token);
      return null;
    }

  } catch (error) {
    console.error("Error during login:", error);
    return null;
  }
}
export async function generatePasswordResetCode(data) {
  try {
    const response = await fetch("http://:5000/users/generate-password-reset-code", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data),
    });
    const result = await response.json();
    

    if (!response.ok) {
      return { error: true, message:result.message};
    }

    return result;
  } catch (error) {
    console.error("Error generating coden:", error);
  }
}
export async function resetPassword(data) {
  try {
    const response = await fetch("http://:5000/users/reset-password", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data),
    });
    const result = await response.json();
    console.log(result);
    

    if (!response.ok) {
      return { error: true, message:result.message};
    }

    return result;
  } catch (error) {
    console.error("Error during reset password:", error);
  }
}