import "styled-components";

declare module 'styled-components' {
    export interface DefaultTheme {
        color?: string;
        bgColor?: string;
        accent?: string;
        borderColor?: string;
    }
}