const priceSpan = document.querySelector(".total-price span");
const urlParams = new URLSearchParams(window.location.search);
const priceFromCart = urlParams.get("price");

priceSpan.innerText = `USD ${parseFloat(priceFromCart || "0.00").toFixed(2)}`;

paypal
  .Buttons({
    createOrder: function (data, actions) {
      return actions.order.create({
        purchase_units: [
          {
            amount: {
              value: priceFromCart || "0.00",
            },
          },
        ],
      });
    },

    onApprove: function (data, actions) {
      return actions.order.capture().then(function (details) {
        document.getElementById("paypal-button-container").style.display =
          "none";
        document.querySelector(".total-price").style.display = "none";
        document.getElementById("success-message").style.display = "block";

        setTimeout(() => {
          window.location.href = "../homePage/home.html";
        }, 3000);
      });
    },

    onError: function (err) {
      console.error("An error occurred during the payment:", err);
      const errorMessage = document.getElementById("error-message");
      errorMessage.style.display = "block";
      errorMessage.innerText = `An error occurred during the payment at ${new Date().toLocaleTimeString()}. Please try again.`;
      setTimeout(() => {
        errorMessage.style.display = "none";
      }, 5000);
    },
  })
  .render("#paypal-button-container");
