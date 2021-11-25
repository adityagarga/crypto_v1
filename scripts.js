
get_da_data = async function() {
    let result = await makeRequest("GET", 'https://api.kraken.com/0/public/Ticker?pair=XBTEUR');
    var data = JSON.parse(result)
    document.querySelector("#crypto-price").innerText = `${data.result.XXBTZEUR.a[0]}`
    console.log(data)
}

var interval_call = setInterval(get_da_data, 500)

function makeRequest(method, url) {
    return new Promise(function (resolve, reject) {
        let xhr = new XMLHttpRequest();
        xhr.open(method, url);
        xhr.onload = function () {
            if (this.status >= 200 && this.status < 300) {
                resolve(xhr.response);
            } else {
                reject({
                    status: this.status,
                    statusText: xhr.statusText
                });
            }
        };
        xhr.onerror = function () {
            reject({
                status: this.status,
                statusText: xhr.statusText
            });
        };
        xhr.send();
    });
}