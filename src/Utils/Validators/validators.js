
export const required = value => {
    if (value) return undefined;
    return 'field is required';
}
export const maxLength22 = value => {
    if (value && value.length > 22) return 'max length is 22 symbols';
    return undefined;
}
export const maxLength100 = value => {
    if (value && value.length > 100) return 'max length is 100 symbols';
    return undefined;
}
export const maxLengthCreator = (maxLength) => (value) => {
    if (value.length > maxLength) return `max length is ${maxLength} symbols`;
    return undefined;
}