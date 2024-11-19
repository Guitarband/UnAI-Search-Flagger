chrome.webNavigation.onBeforeNavigate.addListener((details) => {
    const url = new URL(details.url)
    if(url.href.indexOf("google.com/search") > -1){
        chrome.storage.local.get(["aiFlagEnabled", "selectedFileType"], (data) => {
            let query = url.searchParams.get("q")
            let queryChange = false

            if(data.selectedFileType){
                if(query.indexOf(`filetype:${data.selectedFileType}`) === -1 && data.selectedFileType !== "all"){
                    query += " filetype:" + data.selectedFileType
                    queryChange = true
                }
            }

            if(data.aiFlagEnabled && data.aiFlagEnabled === true){
                if (query.indexOf("ai") === -1) {
                    query += " -ai";
                    queryChange = true
                }
            }

            if(queryChange){
                url.searchParams.set("q", query)
                chrome.tabs.update(details.tabId, {url: url.href})
            }
            else{
                return;
            }
            return {cancel:false}
        })
    }else{
        return {cancel: false}
    }
})