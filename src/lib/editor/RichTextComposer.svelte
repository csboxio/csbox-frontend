<script>
    import {
        Composer,
        ContentEditable,
        ToolbarRichText,
        ActionBar,
        RichTextPlugin,
        HistoryPlugin,
        ListPlugin,
        CheckListPlugin,
        HorizontalRulePlugin,
        ImagePlugin,
        KeywordPlugin,
        AutoFocusPlugin,
        FloatingLinkEditorPlugin,
        CodeNode,
        CodeHighlightNode,
        CodeHighlightPlugin,
        CodeActionMenuPlugin,
    } from 'svelte-lexical';
    import {
        HeadingNode,
        QuoteNode,
        ListNode,
        ListItemNode,
        HorizontalRuleNode,
        ImageNode,

    } from 'svelte-lexical';


    import PlaygroundEditorTheme from './themes/PlaygroundEditorTheme';
    import {
        $getRoot as getRoot,
        $createTextNode as createTextNode,
        $createParagraphNode as createParagraphNode,
    } from 'svelte-lexical';

    const initialConfig = {
        theme: PlaygroundEditorTheme,
        nodes: [
            HeadingNode,
            ListNode,
            ListItemNode,
            QuoteNode,
            HorizontalRuleNode,
            ImageNode,
            CodeNode,
            CodeHighlightNode,
        ],
        onError: (error) => {
            throw error;
        },
        editorState: () => {
            const root = getRoot();
            if (root.getFirstChild() === null) {
                const paragraph = createParagraphNode();
                paragraph.append(
                    createTextNode('Nothing here...'),
                );
                root.append(paragraph);
            }
        },
    };
</script>

<Composer {initialConfig}>
    <div class="editor-shell">
        <ToolbarRichText />
        <div class="editor-container">
            <div class="editor-scroller">
                <div class="editor">
                    <ContentEditable />
                </div>
            </div>
            <RichTextPlugin />
            <HistoryPlugin />
            <ListPlugin />
            <CheckListPlugin />
            <HorizontalRulePlugin />
            <ImagePlugin />
            <CodeHighlightPlugin/>
            <CodeActionMenuPlugin/>

            <ActionBar />
        </div>
    </div>
</Composer>