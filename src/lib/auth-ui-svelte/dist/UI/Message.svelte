<script>import { css } from '@stitches/core';
import { generateClassNames } from '@supabase/auth-ui-shared';
const messageDefaultStyles = css({
    fontFamily: '$bodyFontFamily',
    fontSize: '$baseBodySize',
    marginBottom: '$labelBottomMargin',
    display: 'block',
    textAlign: 'center',
    variants: {
        color: {
            default: {
                color: '$messageText'
            },
            danger: {
                color: '$messageTextDanger'
            }
        }
    }
});
export let color = 'default';
export let appearance = {};
$: classNames = generateClassNames('message', messageDefaultStyles({ color }), appearance);
</script>

<span {...$$restProps} style={appearance?.style?.message} class={classNames.join(' ')}>
	<slot />
</span>
