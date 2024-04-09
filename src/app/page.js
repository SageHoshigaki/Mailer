import ServerComponent from "@/components/serverComponent";
import Hope from "@/components/Hope";
import * as dotenv from "dotenv";
dotenv.config();

const HomePage = () => {
  return (
    <div>
      <Hope />
      <ServerComponent />
    </div>
  );
};

export default HomePage;
