import axios from "axios";
import { config } from "dotenv";

config();

export const createOrder = async (shoppingCart) => {
  try {
    const order = {
      intent: "CAPTURE",
      purchase_units: [
        {
          amount: {
            currency_code: "USD",
            value: shoppingCart.total, 
          },
        },
      ],
      application_context: {
        brand_name: process.env.APPLICATION_NAME,
        landing_page: "NO_PREFERENCE",
        user_action: "PAY_NOW",
        return_url: `${process.env.PAYMENT_CALLBACK_URLS}/capture-order`,
        cancel_url: `${process.env.PAYMENT_CALLBACK_URLS}/cancel-payment`,
      },
    };

    const params = new URLSearchParams();
    params.append("grant_type", "client_credentials");

    // Generate an access token
    const {
      data: { access_token },
    } = await axios.post(
      "https://api-m.sandbox.paypal.com/v1/oauth2/token",
      params,
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        auth: {
          username: process.env.CLIENT_ID_PAYPAL,
          password: process.env.SECRET_KEY_PAYPAL,
        },
      }
    );

    console.log("access_token: " + access_token);

    // make a request
    const response = await axios.post(
      "https://api-m.sandbox.paypal.com/v2/checkout/orders",
      order,
      {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${access_token}`,
        },
      }
    );

    console.log(response.data);
    return response.data; // Devuelve la respuesta de PayPal

  } catch (error) {
    console.error("Error:", error.response ? error.response.data : error.message);
    throw new Error("Something goes wrong");
  }
};

export const captureOrder = async (req, res) => {
  const { token } = req.query;
  console.log("hola")
  try {
    const response = await axios.post(
      `https://api-m.sandbox.paypal.com/v2/checkout/orders/${token}/capture`,
      {},
      {
        auth: {
          username: process.env.CLIENT_ID_PAYPAL,
          password: process.env.SECRET_KEY_PAYPAL,
        },
      }
    );
    return res.json(response.data);
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: "Internal Server error" });
  }
};

export const cancelPayment = (req, res) => {
  const response = {
    status: "cancelled",
    message: "The payment has been successfully cancelled.",
    additionalInfo: "You can try to make the payment again later if you wish."
  };
  return res.status(200).json(response);
};
