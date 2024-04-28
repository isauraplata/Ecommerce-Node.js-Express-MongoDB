# Ecommerce with Node.js, Express, and MongoDB

Description

This project is a comprehensive ecommerce application developed in Node.js, utilizing Express.js for the backend and MongoDB as the database. The application allows users to browse a variety of products, add products to their shopping cart, and make payments using PayPal integration.

Features

- **User Authentication:** Users can register, log in, and manage their accounts.
- **Product Management:** Admin users can add, edit, and delete products and categories.
- **Shopping Cart:** Users can add products to their shopping cart and update quantities.
- **Order Management:** Users can view their order history and status.
- **PayPal Integration:** Secure payment processing with PayPal integration.

## Getting Started

1. **Clone the Repository:**

    ```bash
    https://github.com/isauraplata/Ecommerce-Node.js-MongoDB.git
    ```

2. **Install Dependencies:**

    ```bash
    cd ecommerce-nodejs
    npm install
    ```

3. **Configure Environment Variables:**

    - Create a `.env` file in the root directory.
    - Add the following environment variables:

        ```plaintext
        PORT_SERVER=
        MONGODB_URI=
        SALT=
        SECRET_KEY_PAYPAL=
        CLIENT_ID_PAYPAL=
        ACCESS_TOKEN_PRIVATE_KEY=
        DB_HOST=
        ```

4. **Start the Server:**

    ```bash
    npm start
    ```

5. **Access the Application:**

    Open your web browser and navigate to `http://localhost:4000` to access the application.

## Usage

- Register as a new user or log in with existing credentials.
- Browse products and add them to your shopping cart.
- Proceed to checkout and complete the payment process using PayPal.
- View order history and manage account settings.

## Authors

- [@isauraplata](https://github.com/isauraplata)
