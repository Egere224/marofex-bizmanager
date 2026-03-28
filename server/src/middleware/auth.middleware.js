import jwt from "jsonwebtoken";

export const authMiddleware = (req, res, next) => {

  try {
    console.log("🔥 AUTH MIDDLEWARE HIT");
console.log("HEADERS:", req.headers.authorization);
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer")) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const token = authHeader.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "Invalid token format" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded;

    next();

  } catch (error) {
    return res.status(401).json({ message: "Unauthorized" });
  }
}
