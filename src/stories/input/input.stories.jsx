import { InputCustom } from "./input";
import { fn } from "@storybook/test";
const meta = {
    title: 'CustomInput',
    component: InputCustom,
    parameters: {
        // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
        layout: 'centered',
    },
    // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
    tags: ['autodocs'],
    // More on argTypes: https://storybook.js.org/docs/api/argtypes
    argTypes: {
        //    placeholder:'123'
    },
    // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
    args: { onChange: fn() },
};
export const Text = {
    args: {
        placeholder: 'I am standart input',
        type: 'text',
    },
};
export const Radio = {
    args: {
        type: 'radio',
    },
};
export const Button = {
    args: {
        placeholder: 'I am button',
        type: 'button',
        value: 'Strange button'
    },
};

export default meta;