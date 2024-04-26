// Error handling middleware
const handleError = async (err) => {
  console.error("Error in middleware:", error);
  res.status(500).json({ success: false, error: error.message });
};

export default handleError;
