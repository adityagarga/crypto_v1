const app = document.getElementById('root')

const container = document.createElement('div')
container.setAttribute('class', 'container')

app.appendChild(container)

// var request = new XMLHttpRequest()
// request.open('GET', 'https://api.kraken.com/0/public/Ticker?pair=XBTEUR', true)

const p = document.createElement('p')

get_da_data = async function() {
    let result = await makeRequest("GET", 'https://api.kraken.com/0/public/Ticker?pair=XBTEUR');
    console.log(result)

    // var request = new XMLHttpRequest()
    // request.open('GET', 'https://api.kraken.com/0/public/Ticker?pair=XBTEUR', true)
    // console.log(request.status)
    var data = JSON.parse(result)
    
    p.textContent = `${data.result.XXBTZEUR.a[0]}`
    console.log(data)
    container.appendChild(p)
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

// request.onload = function () {
//   // Begin accessing JSON data here
//   var data = JSON.parse(this.response)
//   if (request.status >= 200 && request.status < 400) {
//     data.forEach(movie => {
//       const card = document.createElement('div')
//       card.setAttribute('class', 'card')

//       const h1 = document.createElement('h1')
//       h1.textContent = movie.title

//       const p = document.createElement('p')
//       movie.description = movie.description.substring(0, 300)
//       p.textContent = `${movie.description}...`

//       container.appendChild(card)
//       card.appendChild(h1)
//       card.appendChild(p)
//     })
//   } else {
//     const errorMessage = document.createElement('marquee')
//     errorMessage.textContent = `Gah, it's not working!`
//     app.appendChild(errorMessage)
//   }
// }

// request.send()