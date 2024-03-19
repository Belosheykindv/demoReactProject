
export const required = (value: string) => {
    if (value) return undefined
    return 'Это поле не должно пустовать'
}
export const maxLength22 = (value: string) => {
    if (value && value.length > 22) return 'max length is 22 symbols';
    return undefined;
}
export const maxLength100 = (value: string) => {
    if (value && value.length > 100) return 'max length is 100 symbols';
    return undefined;
}
export const maxLengthCreator = (maxLength: number) => (value: string) => {
    if (value && value.length > maxLength) return `max length is ${maxLength} symbols`;
    return undefined;
}