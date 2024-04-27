import { config } from "dotenv";
import axios from "axios";

export const createOrder = async (req, res) => {
  try {
    const order = {
      intent: "CAPTURE",
      purchase_units: [
        {
          amount: {
            currency_code: "USD",
            value: "10.00",
          },
        },
      ],
      application_context: {
        brand_name: "mycompany.com",
        landing_page: "NO_PREFERENCE",
        user_action: "PAY_NOW",
        return_url: `http://localhost:4000/api/v1/capture-order`,
        cancel_url: `http://localhost:4000/api/v1/cancel-payment`,
      },
    };

    // format the body
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

    return res.json(response.data);
  } catch (error) {
    console.error("Error:", error.response ? error.response.data : error.message);
    return res.status(500).json("Something goes wrong");
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

    console.log(response.data);
    console.log("ya fue pagado xd");
    //res.redirect("/payed.html");
    return res.json(response.data);
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: "Internal Server error" });
  }
};

export const cancelPayment = (req, res) => res.json("se cancelo");
