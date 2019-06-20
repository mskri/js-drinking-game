<script>
    import { fade } from "svelte/transition";
    import Logo from "./components/Logo.svelte";

    let isMatch = false;
    let isNotMatch = false;
    let inputWord = "";

    function startGame() {
        const inputElement = document.getElementById("input-word");
        const inputValue = inputElement.value;

        if (inputValue.length < 1) return;
        inputWord = inputValue;

        if (inputValue == "asd") {
            isMatch = true;
        } else {
            isNotMatch = true;
            // inputElement.style.webkitAnimationPlayState = "running";
            // setTimeout(() => {
            //     inputElement.style.webkitAnimationPlayState = "paused";
            // }, 2000);
        }
    }

    function randomWord() {
        const inputElement = document.getElementById("input-word");
        inputElement.value = "monkey";
    }

    function resetGame() {
        const inputElement = document.getElementById("input-word");

        isMatch = false;
        isNotMatch = false;
        inputWord = "";
        inputElement.value = "";
    }
</script>

<style lang="postcss">
    #app {
        flex-grow: 1;
        margin: 0 auto;
        padding: 40px 0 0 0;
        width: 60%;
        max-width: 800px;
        text-align: center;
    }

    h1 {
        text-align: center;
        font-size: 4.2rem;
        margin: 24px auto 0;
    }

    h2 {
        margin: 40px auto 12px;
        text-align: center;
        font-size: 2.6rem;
    }

    p {
        margin: 8px auto;
    }

    .start-game, .reset-game {
        cursor: pointer;
        margin: 24px 8px 16px;
        padding: 16px;
        font-size: 1.6rem;
        font-weight: bold;
        width: 40%;
        background: #0092e0;
        color: #fff;
        border: none;
        border-radius: 24px;
        box-shadow: 0 0 3px rgba(0, 0, 0, 0.08), 0 2px 8px rgba(0, 0, 0, 0.22);
    }

    .reset-game {
        background: #3ea379;
    }

    .random-word {
        display: block;
        cursor: pointer;
        margin: 0 auto;
        padding: 0;
        font-size: 1.4rem;
        background: transparent;
        border: none;
        border-bottom: 2px solid #0092e0;
        /* #3ea379; */
    }

    .input-container {
        position: relative;
        width: 80%;
        min-width: 300px;
        margin: 0 auto;
    }

    #input-word {
        text-align: center;
        width: 100%;
        padding: 16px 30px;
        font-family: inherit;
        font-size: 2.6rem;
        border: 4px solid var(--color-js-yellow);
        border-radius: 50px;
        box-shadow: 0 0 2px rgba(0, 0, 0, 0.08);
        background: #fffbe2;
        animation: invalid-input-blink 0.5s step-end infinite alternate;
        animation-play-state: paused;
    }

    .result {
        margin-top: 32px;
        font-size: 2rem;
    }

    #input-word.match {
        border: 4px solid #ef4f74;
        background: #ffeaef;
        /* animation: match-blink 0.5s step-end infinite alternate;
        animation-play-state: paused; */
    }

    #input-word.no-match {
        border: 4px solid #3ea379;
        background: #eafff6;
        /* animation: invalid-input-blink 0.5s step-end infinite alternate;
        animation-play-state: paused; */
    }

    @keyframes match-blink {
        50% {
            border-color: #3ea379;
        }
    }

    @keyframes invalid-input-blink {
        50% {
            border-color: #ef4f74;
        }
    }

    footer {
        margin: 16px auto;
        flex-shrink: 0;
        font-size: 1.2rem;
    }
</style>

<main id="app">
    <Logo />
    <h1>JS drinking game!</h1>
    <p>Rules are simple. Search for a word and if you get a match you drink. It's that simple!</p>
    <h2>My lucky word is</h2>
    <div class="input-container">
        <input id="input-word" class:no-match={isNotMatch} class:match={isMatch} placeholder="" type="text" />
        <!-- {#if isMatch}
            <button class="reset-word" type="reset">Reset</button>
        {/if} -->
    </div>
    {#if !isMatch && !isNotMatch}
        <button class="start-game" on:click={() => startGame()}>Play!</button>
        <button class="random-word" on:click={() => randomWord()}>Choose a word for me</button>
    {:else}
        <button class="reset-game" on:click={() => resetGame()}>Start a new game!</button>
    {/if}
     {#if isMatch}
        <div transition:fade={{ duration: 200 }} class="result">Drink up! There is exact match for "{inputWord}".</div>
    {/if}
    {#if isNotMatch}
        <div transition:fade={{ duration: 200 }} class="result">You are safe. There is no match for "{inputWord}".</div>
    {/if}
</main>

<footer>
    <p>Drink responsibly!</p>

</footer>
