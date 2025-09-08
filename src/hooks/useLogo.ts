import LogoContext from "@contexts/LogoContext";
import { useContext } from "react";

export const useLogo = () => {
  const context = useContext(LogoContext); 
  if (!context) {
    throw new Error('useLogo must be used within a ModalProvider');
  }
  return context;
}
