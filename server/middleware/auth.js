import jwt from "jsonwebtoken";

const auth = async (request, response, next) => {
  try {
    const token =
      request.cookies.accessToken ||
      request.headers?.authorization.split(" ")[1]; //['bearer',' token']
    console.log("token", token);

    if (!token) {
      return response.status(400).json({
        message: "Provide token",
      });
    }

    const decode = await jwt.verify(token, process.env.SECRET_KEY_ACCESS_TOKEN);

    if (!decode) {
      return response.status(401).json({
        message: "UnAuthorized access",
        error: true,
        success: false,
      });
    }
    request.userId = decode.id;
    console.log("✅ request.userId set to:", request.userId);
    next();
    console.log("decode".decode);
  } catch (error) {
    return response.status(500).json({
      message: "You have not login",
      error: true,
      success: false,
    });
  }
};

export default auth;
