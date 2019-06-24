<script>
    import { fade } from "svelte/transition";
    import Logo from "./components/Logo.svelte";

    let showResult = false;
    let isMatch = null;
    let inputValue = "";

    $: showResult = isMatch !== null;
    $: console.log(showResult);
    async function startGame() {
        if (inputValue.length < 1) return;
        findMatch(inputValue);
        //document.getElementById("reset-game-button").focus();
    }

    function findMatch(packageName) {
        fetch(`https://api.npms.io/v2/package/${packageName}`)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                if (data.code === "NOT_FOUND") {
                    isMatch = false;
                } else {
                    // console.log(data.collected.links.npm);
                    isMatch = true;
                }
            });
    }

    function randomWord() {
        inputValue = "monkey";
    }

    function resetGame() {
        isMatch = null;
        inputValue = "";
        document.getElementById("input-word").focus();
    }

    function handleKeydown(event) {
        if (inputValue.length < 1) return;

        // Handle only enter keys
        if (event.keyCode === 13) {
            startGame();
        }
    }
</script>

<style lang="postcss">
    #app {
        flex-grow: 1;
        margin: 0 auto;
        padding: 40px 0 0 0;
        width: 60%;
        min-width: 320px;
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

    button {
        min-width: 200px;
    }

    .start-game,
    .reset-game {
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
        min-width: 0;
    }

    .input-container {
        position: relative;
        width: 80%;
        min-width: 300px;
        margin: 0 auto;
        height: 100px;
        display: flex;
        flex-direction: row;
        justify-content: center;
    }

    .input-shape {
        line-height: 3rem;
        min-height: 72px;
        max-width: 460px;
        margin: auto 0;
        text-align: center;
        width: 100%;
        padding: 16px 30px;
        font-family: inherit;
        font-size: 2.6rem;
        border: 4px solid var(--color-js-yellow);
        border-radius: 50px;
        box-shadow: 0 0 2px rgba(0, 0, 0, 0.08);
        background: #fffbe2;
    }

    .match {
        font-size: 2rem;
        border: 4px solid #ef4f74;
        background: #ffeaef;
        padding: 16px 30px;
    }

    .no-match {
        font-size: 2rem;
        border: 4px solid #3ea379;
        background: #eafff6;
    }
</style>

<main id="app">
    <Logo />
    <h1>JS drinking game!</h1>
    <p>Rules are simple. Search for a word and if you get a match you drink. It's that simple!</p>
    {#if !showResult}
        <h2>Enter your lucky word</h2>
        <div class="input-container">
            <input
                id="input-word"
                class="input-shape"
                bind:value={inputValue}
                class:no-match={showResult && !isMatch}
                class:match={showResult && isMatch}
                placeholder=""
                readonly={showResult}
                on:keydown={handleKeydown}
                type="text" />
        </div>
    {/if}
    {#if showResult && isMatch}
        <h2>Drink up!</h2>
        <div class="input-container">
            <div class="input-shape match">There is "{inputValue}" package.</div>
        </div>
    {/if}
    {#if showResult && !isMatch}
        <h2>You are safe</h2>
        <div class="input-container">
            <div class="input-shape no-match">There is no "{inputValue}" package.</div>
        </div>
    {/if}
    {#if !showResult}
        <button class="start-game" on:click={() => startGame()}>Play!</button>
        <button class="random-word" on:click={() => randomWord()}>Choose a word for me</button>
    {:else}
        <button id="reset-game-button" class="reset-game" on:click={() => resetGame()}>Start a new game!</button>
    {/if}
</main>
