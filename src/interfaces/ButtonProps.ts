export interface ButtonProps {
    text?: string;
    imgSrc?: string;
    onClick?: () => void;
    disabled?: boolean;
    type?: "button" | "submit" | "reset";
    className?: string;
    size?: "sm" | "md" | "lg" | "logo_sm" | "logo_md" | "logo_lg";
    children?: React.ReactNode;
    divClass?: string;
  }