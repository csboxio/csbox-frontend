<script>import {generateClassNames} from '@supabase/auth-ui-shared';

export let color;
export let appearance = {};
export let loading = false;
$: classNames = generateClassNames('button', color, appearance);
</script>

<button on:click {...$$restProps} disabled={loading} style={appearance?.style?.button} class={color}>
    <slot/>
</button>

<style>
    button {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 8px;
        border-radius: 5px;
        margin-bottom: 10px;
        padding: 5px;
        font-size: var(--fontSizes-baseButtonSize);
        cursor: pointer;
        border-width: var(--borderWidths-buttonBorderWidth);
        border-style: solid;
        width: 100%;
        transition-property: background-color;
        transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    }

    button.default {
        background-color: var(--colors-defaultButtonBackground);
        color: var(--colors-defaultButtonText);
        border-color: var(--colors-defaultButtonBorder);
    }

    button.default:hover {
        background-color: var(--colors-defaultButtonBackgroundHover);
    }

    button.primary {
        margin-top: 20px;
        margin-bottom: 20px;
        font-weight: 500;
        background-color: #1890FF;
        color: #FFFFFF;
        border-color: #1890FF;
    }

    button.primary:hover {
        background-color: #157bda;
        border-color: #157bda;
    }

    button.primary:active {
        background-color: #1890FF;
    }

    button.social {
        background-color: #232B3A;
        color: #3D485B;
        border-color: #232B3A;
    }

    button.social:hover {
        background-color: #212836;
        border-color: #212836;
    }

    button.social:active {
        background-color: #232B3A;
        border-color: #232B3A;
    }
</style>