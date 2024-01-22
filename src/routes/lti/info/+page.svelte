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
        <div class="  bg-gray-800 shadow-lg shadow-gray-600 rounded pt-8 h-screen">
            <div class="flex justify-center mb-6">
                <img src="/logo-text-white.png" alt="Logo" class="h-12 ">
            </div>
            <section class="flex flex-col items-center space-y-6 py-4 px-2 w-screen">
                <h2 class="text-2xl font-bold text-blue-500 bg-gradient-to-r from-blue-400 via-teal-500 to-purple-200 bg-clip-text text-transparent animate-pulse">LTI Integration with CSBOX</h2>
                <div class="bg-gray-800 p-8 rounded-lg shadow-lg">
                    <p class="text-xl mb-4 font-bold text-white">What is LTI?</p>
                    <p class="mb-6 text-white">LTI (Learning Tools Interoperability) is a standard used by Learning Management Systems (LMSs) like Canvas, Moodle, Blackboard to seamlessly integrate with tools such as CSBOX.</p>

                    <p class="text-xl mb-4 font-bold text-white">Benefits for Instructors</p>
                    <p class="mb-6 text-white">Connect your LMS to CSBOX for streamlined functions directly within CSBOX. Easily manage submissions, grades, all without leaving the platform.</p>

                    <p class="text-xl mb-4 font-bold text-white">Benefits for Students</p>
                    <p class="mb-6 text-white">Students can access assignments with one click, instantly accessing a comprehensive environment with instructions, unit testing, and easy submission. Future features include built-in git management and instructor comments.</p>

                    <p class="text-xl mb-4 font-bold text-white">Why CSBOX?</p>
                    <p class="mb-6 text-white">CSBOX stands out for its affordability, versatility, and scalability. Unlike typical education cloud developer environments, CSBOX runs on Debian, supporting all programming languages and environments including front-end, back-end, databases, dev-ops, and mobile device emulation. It adapts seamlessly to your workload and offers an intuitive interface through a flavor of VS Code, one of the most popular editors available.</p>

                    <p class="text-xl mb-4 font-bold text-white">Steps to Utilize LTI with CSBOX:</p>
                    <ol class="list-decimal ml-8 text-lg text-white">
                        <li>Register by having your LMS administrator send an email to <span class="font-bold text-blue-300">dev@csbox.io</span> for access.</li>
                        <ol><button type="button" on:click={openForm} class="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Email Template</button></ol>
                        <li>Receive setup instructions for the external tool in your LMS.</li>
                        <li>Find and add CSBOX in the external tools section of your LMS.</li>
                        <li>Verify the tool's status by launching it from your LMS.</li>
                        <li>Link your LMS account to CSBOX and connect courses using the LMS external tool.</li>
                        <li>Now seamlessly link assignments between LMS and CSBOX.</li>
                    </ol>

                    <p class="mt-6 text-lg text-gray-400 text-white">For detailed instructions, refer to CSBOX's documentation.</p>
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
