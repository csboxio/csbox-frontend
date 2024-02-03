<script>import { generateClassNames } from '@supabase/auth-ui-shared';
export let color = 'default';
export let appearance = {};
export let loading = false;

// Change (social)
export let social;

$: classNames = generateClassNames('button', color, appearance);

// Change button style.
let buttonStyle = 'border-radius: 20px; border-color: rgba(0,0,0,0); padding: 5px; margin: 10px; color: white;';

let socialButtonStyle = 'background-color: #3D485B;'
let normalButtonStyle = 'background-color: #2c5afb; font-weight: 500;'
</script>

<!-- Change to have difference between social button and non-social button -->
<button on:click {...$$restProps} disabled={loading} style={social ? buttonStyle + socialButtonStyle : buttonStyle + normalButtonStyle + classNames} class={social ? 'social' : ''}>
	<slot />
</button>

<style>
	button {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 8px;
		border-radius: var(--radii-borderRadiusButton);
		font-size: var(--fontSizes-baseButtonSize);
		padding: var(--space-buttonPadding);
		cursor: pointer;
		border-width: var(--borderWidths-buttonBorderWidth);
		border-style: solid;
		width: 100%;
		transition-property: background-color;
		transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
		transition-duration: 100ms;
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
		background-color: var(--colors-brand);
		color: var(--colors-brandButtonText);
		border-color: var(--colors-brandAccent);
	}
	button.primary:hover {
		background-color: var(--colors-brandAccent);
	}
</style>
