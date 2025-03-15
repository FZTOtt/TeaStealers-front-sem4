export interface ButtonProps {
    text?: string;
    imgSrc?: string;
    onClick?: () => void;
    disabled?: boolean;
    type?: "button" | "submit" | "reset";
    className?: string;
    size?: "sm" | "md" | "lg";
  }