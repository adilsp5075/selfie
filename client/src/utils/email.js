function email(tomail) {
console.log("Seding Request to Selfie Mail service ");

fetch("http://localhost:8080/send_mail", {
    method: "post",
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    },

    body: JSON.stringify({
        from: "noreply@selfie.com",
        to: tomail,
        subject: "Order Placed ",
        text: "PazhamPori and Samosa : )"
    })
})
    .then((response) => response.json())
    .then((json) => {
        console.log("Selfie Mail response : ", json);
    });
}

export default email