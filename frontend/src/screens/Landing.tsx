import { useNavigate } from "react-router";
import Button from "../components/Button";

const Landing = () => {
  const navigate = useNavigate();

  return (
    <>
      <div className="flex justify-center items-center w-full h-screen">
        <Button onClick={() => navigate("/chess")} buttonText="PLAY CHESS" />
      </div>
    </>
  );
};

export default Landing;
