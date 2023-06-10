import { SvelteComponentTyped } from "svelte";
import type { Appearance } from '../types';
declare const __propDef: {
    props: {
        href: string;
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
export type AnchorProps = typeof __propDef.props;
export type AnchorEvents = typeof __propDef.events;
export type AnchorSlots = typeof __propDef.slots;
export default class Anchor extends SvelteComponentTyped<AnchorProps, AnchorEvents, AnchorSlots> {
}
export {};
