let current;
let firstInit = true;

async function main(url, oldUrl) {
    // First init
    if (firstInit) {
        firstInit = false;
        console.log('Thanks for using my userscript! <3');
        console.log(' - cakes');

        // Add listener to get element changes
        const observer = new MutationObserver((mutations) => {
            mutations.forEach(async (mutation) => {
                if (mutation.type === 'childList') {
                    if (mutation.addedNodes.length > 0) {
                        // If the element has been added
                        const element = mutation.addedNodes[0];
                        await getUser(element);
                    }
                }
            });
        });

        // Observe the element
        const element = document.querySelector('#app');
        observer.observe(element, { childList: true, subtree: true });
    }
}

let mainLoop = setInterval(async () => {
    if (document.URL !== current) {
        let oldURL = current + "";
        current = document.URL;
        await main(current, oldURL)
    }
}, 200);