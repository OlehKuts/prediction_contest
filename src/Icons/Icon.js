import { iconsConfig } from "./iconsConfig";
// import "./style.css";

export const Icon = ({
  name = "",
  color = "black",
  size = "14px",
  ...props
}) => {
  const IconC = iconsConfig[name];
  return <IconC name={name} color={color} size={size} {...props} />;
};
