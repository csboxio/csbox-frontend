<script>
    let name = '';
    let email = '';
    let message = '';

    function handleSubmit() {
        console.log('Submitted:', { name, email, message });
    }
</script>

<div class="flex justify-center items-center h-screen bg-gray-600">
    <div class="bg-gray-800 p-8 rounded-lg shadow-lg max-w-2xl">
        <h2 class="text-white text-2xl font-bold mb-4">Contact Us</h2>
        <form on:submit|preventDefault={handleSubmit} class="">
            <div class="mb-4">
                <label for="name" class="block text-gray-200 font-semibold mb-2">Name</label>
                <input type="text" id="name" bind:value={name} placeholder="Your name" class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
            </div>
            <div class="mb-4">
                <label for="email" class="block text-gray-200 font-semibold mb-2">Email</label>
                <input type="email" id="email" bind:value={email} placeholder="Your email" class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
            </div>
            <div class="mb-4">
                <label for="message" class="block text-gray-200 font-semibold mb-2">Message</label>
                <textarea id="message" bind:value={message} placeholder="Your message" rows="4" class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"></textarea>
            </div>
            <button type="submit" class="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600">Submit</button>
        </form>
    </div>
</div>

