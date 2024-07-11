export const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
};

export const validatePhoneNumber = (number) => {
    // Regular expression to validate phone number
    const phoneRegex = /^[+]?[0-9]{1,4}?[-.s]?([(]?[0-9]{1,6}[)]?[-.s]?)[0-9]{1,4}[-.s]?[0-9]{1,4}[-.s]?[0-9]{1,9}$/;
    return phoneRegex.test(number);
};