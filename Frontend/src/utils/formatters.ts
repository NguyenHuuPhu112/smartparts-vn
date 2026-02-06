/**
 * Format number to Vietnamese currency
 * @param amount - Number to format
 * @returns Formatted string (e.g., "1.000.000đ")
 */
export const formatPrice = (amount: number): string => {
    return amount.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, '.') + 'đ';
};

/**
 * Format phone number to Vietnamese standard
 * @param phone - Phone number string
 * @returns Formatted phone number
 */
export const formatPhoneNumber = (phone: string): string => {
    // Remove all non-digit characters
    const cleaned = phone.replace(/\D/g, '');

    // Format as: 0XXX.XXX.XXX
    if (cleaned.length === 10) {
        return cleaned.replace(/(\d{4})(\d{3})(\d{3})/, '$1.$2.$3');
    }

    return phone;
};

/**
 * Truncate text with ellipsis
 * @param text - Text to truncate
 * @param maxLength - Maximum length
 * @returns Truncated text
 */
export const truncateText = (text: string, maxLength: number): string => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
};
