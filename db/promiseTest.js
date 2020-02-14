new Promise ((resolve, reject) => {
    setTimeout( function() {
        resolve("Success!")  // Yay! Everything went well!
      }, 250)
}).then((result) => {
        return result + "foo"
    })
    .then((result) => {
        console.log(result + "fee")
    })