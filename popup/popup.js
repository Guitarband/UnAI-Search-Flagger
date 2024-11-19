chrome.storage.local.get(["aiFlagEnabled", "selectedFileType"], (data) => {
    if(data.aiFlagEnabled){
        document.getElementById('toggleAI').innerText = "Enable AI responses"
    }else{
        document.getElementById('toggleAI').innerText = "Disable AI responses"
    }
    if(data.selectedFileType){
        document.getElementById(data.selectedFileType).checked = true
    }
})

document.getElementById('toggleAI').addEventListener('click', function() {
    chrome.storage.local.get("aiFlagEnabled", (data) => {
        let aiFlagEnabled = data.aiFlagEnabled || false
        if(aiFlagEnabled) {
            aiFlagEnabled = false
            document.getElementById('toggleAI').innerText = "Disable AI responses"
        } else{
            aiFlagEnabled = true
            document.getElementById('toggleAI').innerText = "Enable AI responses"
        }
        chrome.storage.local.set({aiFlagEnabled: aiFlagEnabled})
    })
})

function handleFileTypeChange(){
    const selectedFileType = document.querySelector('input[name="fileType"]:checked').value ||  "all"
    chrome.storage.local.set({selectedFileType: selectedFileType})
}

document.querySelectorAll('input[name="fileType"]').forEach((elem) => {
    elem.addEventListener('change', handleFileTypeChange)
})