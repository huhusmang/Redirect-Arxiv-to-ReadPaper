chrome.runtime.onInstalled.addListener(function () {
    chrome.contextMenus.create({
        id: "redirectToReadPaper",
        title: "Redirector to ReadPaper",
        contexts: ["page"]
    });
});

chrome.contextMenus.onClicked.addListener(function (info, tab) {
    if (info.menuItemId === "redirectToReadPaper" && tab.url && tab.url.includes("arxiv.org")) {
        chrome.scripting.executeScript({
            target: { tabId: tab.id },
            function: redirectToReadPaper
        });
    }
});

function redirectToReadPaper() {
    const titleElement = document.querySelector('h1.title.mathjax');
    if (titleElement) {
        let fullTitleText = titleElement.textContent || titleElement.innerText;
        const titleText = fullTitleText.replace(/^Title:\s*/, '');
        const targetUrl = `https://readpaper.com/home/search/${encodeURIComponent(titleText)}`;
        window.open(targetUrl, '_blank');
    }
}
