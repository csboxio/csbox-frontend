<script lang="ts">
    let isFormVisible = false;

    function openForm() {
        isFormVisible = !isFormVisible;
    }

    function prepareEmail(event) {
        event.preventDefault();
        const email = event.target.email.value;
        const lmsType = event.target.lmsType.value;
        const university = event.target.university.value;

        const subject = `LTI Integration Request for ${university}`;
        const body = `Dear CSBOX Team,\n\nI am the LMS administrator for ${university} using ${lmsType} as our LMS. I would like to request access to integrate CSBOX via LTI.\n\nLMS Administrator Email: ${email}\nType of LMS: ${lmsType}\nUniversity / School Name: ${university}\n\nPlease provide instructions for setting up the external tool within our LMS.\n\nThank you.`;

        const mailtoLink = `mailto:dev@csbox.io?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        window.location.href = mailtoLink;
    }
</script>
    <div class="flex justify-center items-center h-screen bg-gray-700">
        <div class="  bg-gray-800 shadow-lg shadow-gray-600 rounded p-8 h-screen">
            <div class="flex justify-center mb-6">
                <img src="/logo-text-white.png" alt="Logo" class="h-12 w-auto">
            </div>
            <section class="flex flex-col items-center space-y-4 py-8">
                <h2 class="text-xl block truncate text-sm font-bold text-blue-500 animate-text bg-gradient-to-r from-blue-400 via-teal-500 to-purple-200 bg-clip-text text-transparent  font-black">LTI Integration</h2>
                <div class="bg-gray-600 p-8 rounded-lg shadow-lg">
                    <p class="text-xl mb-6 font-bold text-white">
                        To utilize LTI with CSBOX, follow these steps:
                    </p>
                    <ol class="list-decimal ml-8 text-xl space-y-2 text-white">
                        <ol>Register with us by having your LMS administrator send an email to <span class="font-bold text-blue-300">dev@csbox.io</span> requesting access.</ol>
                        <button type="button" on:click={openForm} class="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Email Template</button>
                        <ol>Receive instructions on setting up the external tool within your LMS.</ol>
                        <ol>Once added to the LMS, find the CSBOX tool in the external tools section.</ol>
                        <ol>Launch the tool from your LMS to verify its status.</ol>
                        <ol>Link your LMS account to CSBOX and connect courses using the LMS external tool.</ol>
                        <ol>Now you can link assignments in LMS to CSBOX or vise versa.</ol>
                    </ol>
                    <p class="mt-6 text-lg text-gray-custom text-white">
                        For detailed instructions, please refer to the documentation provided by CSBOX.
                    </p>
                </div>
            </section>
            {#if isFormVisible}
                <form on:submit={prepareEmail} class="mt-8">
                    <label for="email" class="block mb-2 text-white">LMS Administrator Email:</label>
                    <input type="email" id="email" name="email" class="block w-full border-gray-300 rounded-md p-2 mb-4" required>

                    <label for="lmsType" class="block mb-2 text-white">Type of LMS:</label>
                    <input type="text" id="lmsType" name="lmsType" class="block w-full border-gray-300 rounded-md p-2 mb-4" required>

                    <label for="university" class="block mb-2 text-white">University / School Name:</label>
                    <input type="text" id="university" name="university" class="block w-full border-gray-300 rounded-md p-2 mb-4" required>

                    <button type="submit" class="bg-blue-custom text-white px-4 py-2 rounded-md">Submit</button>
                </form>
            {/if}
        </div>
    </div>
