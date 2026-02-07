export const validateUser = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

interface fielDef{
    key: string;
    label: string;
    type: string;
    required?: boolean;
}

export const validateFields = (
    fields: fielDef[],
    formData: Record<string, any>,
): Record<string, string> => {
    const errors: Record<string, string> = {};

    for (const field of fields) {
        const value = formData[field.key];
        if (field.required &&(!value || String(value).trim() === '')) {
            errors[field.key] = `${field.label} es requerido.`;
        } else if (field.type === 'email' && value && !validateUser(value)) {
            errors[field.key] = `${field.label} no es un correo electrónico válido.`;
        } 
    }

    return errors;
};