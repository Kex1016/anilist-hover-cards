let current;
let firstInit = true;

async function main(url, oldUrl) {
    // First init
    if (firstInit) {
        firstInit = false;
        console.log('Thanks for using my userscript! <3');
        console.log(' - cakes');

        // just some temporary stuff
        //const user = await getAnilistUser('cakes');
        //const card = await makeCard(user);
    }

    // Add listener to get element changes
    const observer = new MutationObserver((mutations) => {
        mutations.forEach(async (mutation) => {
            if (mutation.type === 'childList') {
                if (mutation.addedNodes.length > 0) {
                    // If the element has been added
                    const element = mutation.addedNodes[0];
                    await getUser(element);
                    // Store user data in localstorage!!!
                    // Then when the user is hovered over, it can be retrieved
                    // from localstorage and then the card can be made.
                    // Only store for 10 minutes, then replace with new data.
                    // If user hasn't been used in 3 days, remove from localstorage.
                }
            }
        });
    });

    // Observe the element
    const element = document.querySelector('#app');
    observer.observe(element, { childList: true, subtree: true });
}

let mainLoop = setInterval(async () => {
    if (document.URL !== current) {
        let oldURL = current + "";
        current = document.URL;
        await main(current, oldURL)
    }
}, 200);