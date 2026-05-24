// Creates the right-click menu item when the extension is installed
chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "audit-claim",
    title: "Audit Sports Claim",
    contexts: ["selection"]
  });
});

// Listens for when you actually click the button
chrome.contextMenus.onClicked.addListener(async (info, tab) => {
  if (info.menuItemId === "audit-claim") {
    const claimText = info.selectionText;
    
    // A tiny invisible image so Chrome doesn't crash trying to load an icon
    const blankIcon = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAFElEQVR4XgXAAQ0AAABAMP1L30IDCPwC/o5WcS4AAAAASUVORK5CYII=';

    // Show a loading notification immediately
    chrome.notifications.create("loading", {
      type: "basic",
      iconUrl: blankIcon, 
      title: "Auditing Claim...",
      message: "Groq AI is checking the stats..."
    });

    try {
      // Send the text to your local Python server using 127.0.0.1 instead of localhost
      const response = await fetch("http://127.0.0.1:8000/audit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: claimText })
      });
      const data = await response.json();
      
      // Clear the loading notification and show the final verdict
      chrome.notifications.clear("loading");
      chrome.notifications.create("result", {
        type: "basic",
        iconUrl: blankIcon,
        title: `Verdict: ${data.verdict}`,
        message: data.reasoning
      });
    } catch (e) {
      console.error(e);
      chrome.notifications.clear("loading");
      chrome.notifications.create("error", {
        type: "basic",
        iconUrl: blankIcon,
        title: "Error",
        message: "Server disconnected. Make sure your Python terminal is running!"
      });
    }
  }
});