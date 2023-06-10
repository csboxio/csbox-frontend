import { SvelteComponentTyped } from "svelte";
import type { Appearance } from '../types';
declare const __propDef: {
    props: {
        loading?: boolean | undefined;
        color?: "default" | "primary" | undefined;
        appearance?: Appearance | undefined;
    };
    events: {
        click: MouseEvent;
    } & {
        [evt: string]: CustomEvent<any>;
    };
    slots: {
        default: {};
    };
};
export type ButtonProps = typeof __propDef.props;
export type ButtonEvents = typeof __propDef.events;
export type ButtonSlots = typeof __propDef.slots;
export default class Button extends SvelteComponentTyped<ButtonProps, ButtonEvents, ButtonSlots> {
}
export {};
