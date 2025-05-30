(async function() {
    'use strict';

    try {
        // Fetch custom loading text from file
        const customLoadingText = await (await fetch("https://raw.githubusercontent.com/PXIFusionX/Fusion-Loader/main/Custom-Load-Screen/Load%20Screen%20Text")).text().then(data => data.split("\n"));

        // Initialize index for randomizing text
        let index = 0;

        // Update custom loading text index every 2 seconds
        setInterval(() => {
            index = Math.floor(Math.random() * customLoadingText.length);
        }, 2000);

        // Override the loading text every 100 ms
        setInterval(() => {
            const LT = document.getElementById("loading-text");
            if (LT) LT.innerHTML = customLoadingText[index];
        }, 100);

    } catch (error) {
        console.error('Error fetching or processing the text file:', error);
    }
})();
