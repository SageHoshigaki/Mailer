export default async function handler(req, res) {
  if (req.method === "GET") {
    res.status(200).json({
      success: true,
      message: "This is a GET request",
    });
  } else if (req.method === "POST") {
    res.status(200).json({
      success: true,
      message: "This is a POST request",
    });
  }
}
