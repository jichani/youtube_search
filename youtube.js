var optionParams = {
    q: "동성로관광",
    part: "snippet",
    key: config,
    type: "video",
    maxResults: 4,
    regionCode: "KR",
    videoDuration: "medium"
};

optionParams.q = encodeURI(optionParams.q);

var url = "https://www.googleapis.com/youtube/v3/search?";
for (var option in optionParams) {
    url += option + "=" + optionParams[option] + "&";
}

url = url.substr(0, url.length - 1);

fetch(url)
    .then(response => response.json())
    .then(data => {
        var resultsDiv = document.getElementById("results");
        data.items.forEach(item => {
            var thumbnailUrl = item.snippet.thumbnails.high.url;
            var title = item.snippet.title;
            var videoId = item.id.videoId;

            var resultDiv = document.createElement("div");
            resultDiv.className = "result";
            resultDiv.innerHTML = `
                <a href="https://www.youtube.com/watch?v=${videoId}" target="_blank">
                    <img src="${thumbnailUrl}" alt="${title}">
                    <p>${title}</p>
                </a>
            `;
            resultsDiv.appendChild(resultDiv);
        });
    });