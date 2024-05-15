<script lang="ts">
    import Textfield from '@smui/textfield';
    import Button from "@smui/button";

    import { form, field } from 'svelte-forms';
    import * as validator from "svelte-forms/validators";

    const handleSubmit = (e: SubmitEvent) => {
        //prevent default is already here
        console.log("Submited form !")
    }

    const validatorOptions = {
        validateOnChange: true,
        checkOnInit: true,
    }

    //username field
    const username = field('name', '', [
        validator.required(),
        //3 ~ 128 characters
        validator.min(3),
        validator.max(128)
    ], validatorOptions);

    const Email = field('email', '', [
        validator.required(),
        validator.email(),
    ], validatorOptions);

    const password = field('password', '', [
        validator.required(),
        validator.min(8),
        validator.max(64),
    ], validatorOptions);

    const passwordConfirm = field('passwordConfirm', '', [
        validator.matchField(password)
    ], validatorOptions);

    const registerForm = form(username, Email, password, passwordConfirm);
</script>

<form
    method="POST"
    on:submit|preventDefault={handleSubmit}>

    <Textfield
        type="text"
        label="Username"
        bind:value={$username.value}
    />

    <Textfield
        type="email"
        label="Email"
        bind:value={$Email.value}
    />

    <Textfield
        type="password"
        label="Password"
        bind:value={$password.value}
    />

    <Textfield
        type="password"
        label="Password"
        bind:value={$passwordConfirm.value}
    />

    <Button
        disabled={$registerForm.errors.length>0}
        type="submit">
        Envoyer
    </Button>


</form>

<style lang="css">

</style>