<script>
  import { quill } from "svelte-quill";

  const options = {
    modules: {
      toolbar: [
        [{ header: [1, 2, 3, false] }],
        ["bold", "italic", "underline", "strike"],
        ["link", "code-block"]
      ]
    },
    placeholder: "Type something...",
    theme: "snow"
  }

  let content;


</script>
<svelte:head>
  <link href="//cdn.quilljs.com/1.3.6/quill.snow.css" rel="stylesheet">
</svelte:head>

<div class="editor"
     use:quill={options}
     on:text-change={e => content = e.detail}>
</div>