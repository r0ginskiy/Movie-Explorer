import React from "react";
import { useNavigate } from "react-router-dom";
import ReturnIcon from "../../assets/ReturnIcon";
import { routes } from "../../routes/routes";

interface ReturnButtonProps {
  prevPage: number;
}

const ReturnButton: React.FC<ReturnButtonProps> = ({ prevPage }) => {
  const navigate = useNavigate();
  const handleBack = () => {
    navigate(routes.HOME, { state: { page: prevPage } });
  };

  return (
    <button
      onClick={handleBack}
      className="w-full max-w-[100px] h-[40px] flex p-2 items-center justify-center rounded-[16px] border border-[#bdbdbd] bg-white"
    >
      <ReturnIcon />
    </button>
  );
};

export default ReturnButton;
