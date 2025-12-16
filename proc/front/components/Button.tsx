interface ButtonProps {
    label: string;
    onClick?: () => void;
    variant?: "primary" | "secondary";
    full?: boolean;
    disabled?: boolean;
}

export default function Button({
    label,
    onClick,
    variant = "primary",
    full = false,
    disabled = false,
}: ButtonProps) {
    const base = "px-4 py-2 rounded-md font-medium transition";

    const styles = {
        primary: "bg-blue-600 text-white hover:bg-blue-700",
        secondary: "bg-gray-200 hover:bg-gray-300 text-gray-800",
    };

    return (
        <button
            onClick={onClick}
            disabled={disabled}
            className={`${base} ${styles[variant]} ${full ? "w-full" : ""} ${disabled ? "opacity-50 cursor-not-allowed" : ""
                }`}
        >
            {label}
        </button>
    );
}
