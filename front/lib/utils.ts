// Format a date nicely
export function formatDate(date: string | Date) {
    return new Date(date).toLocaleDateString("en-IN", {
        year: "numeric",
        month: "short",
        day: "numeric",
    });
}

// Capitalize first letter
export function capitalize(text: string) {
    if (!text) return "";
    return text.charAt(0).toUpperCase() + text.slice(1);
}

// Validate email
export function isValidEmail(email: string) {
    return /\S+@\S+\.\S+/.test(email);
}

// Generate random ID
export function generateId() {
    return Math.random().toString(36).substring(2, 10);
}
