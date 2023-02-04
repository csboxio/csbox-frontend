<script>
    import InputField from '$lib/components/InputField.svelte';
    export let active_step;
    let formData = {
        name: '',
        surname: '',
        email: '',
        password: '',
        address: '',
        city: '',
        country: '',
        postcode: '',
        account_name: '',
        card_no: ''
    }

    const handleSubmit = () => {
        console.log("Your form data => ",formData)
    }

</script>

<form class="form-container" on:submit={handleSubmit}>
    {#if active_step === 'Create'}
        <InputField label={'Name'} bind:value={formData.name}/>
        <InputField label={'Surname'} bind:value={formData.surname}/>
        <InputField label={'Email'} bind:value={formData.email}/>
        <InputField type={'password'} label={'Password'} bind:value={formData.password}/>
    {:else if active_step === 'More'}
        <InputField label={'Address'} bind:value={formData.address}/>
        <InputField label={'City'} bind:value={formData.city}/>
        <InputField label={'Country'} bind:value={formData.country}/>
        <InputField label={'Postcode'} bind:value={formData.postcode}/>
    {:else if active_step === 'Confirm'}
        <div class="message">
            <h2>Thank you for choosing us</h2>
            <button class="btn submit">Finish </button>
        </div>
    {/if}
</form>