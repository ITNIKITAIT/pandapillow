# 🐼 PandaPillow – Custom Pillows with Unique Designs

PandaPillow is a web application that allows users to upload images and create personalized pillows. The website provides an intuitive interface for selecting pillow sizes, an interactive 3D preview, and seamless order processing with online payment integration.

## 🚀 Tech Stack

### **Frontend:**

-   **Next.js** – A library for building user interfaces
-   **Tailwind CSS** – A utility-first CSS framework for styling components
-   **React Query** – Data fetching and caching management
-   **Three.js** – 3D rendering for real-time pillow preview

### **Backend:**

-   **Next.js** – Server-side rendering and API handling
-   **Prisma ORM** – Database management
-   **PostgreSQL** – Relational database for storing user data and orders

### **Additional Services:**

-   **UploadThing** – Image hosting for user uploads
-   **Stripe** – Secure payment processing

---

## 📌 Features

✅ **Image Upload** – Users can upload images for pillow customization via UploadThing.  
✅ **3D Live Preview** – A real-time interactive preview using Three.js to visualize the final product.  
✅ **Size Selection** – Users can choose from multiple pillow sizes.  
✅ **Shopping Cart & Checkout** – Seamless cart management and checkout process.  
✅ **Online Payments via Stripe** – Secure payments with credit/debit card support.  
✅ **Admin Panel** – Manage orders, uploaded images, and available pillow sizes.

---

## 🛠 Installation & Setup

### **Prerequisites:**

-   Node.js (v18 or later)
-   PostgreSQL database
-   Stripe account for payment processing

1. **Clone the Repository:**
    ```sh
    git clone https://github.com/ITNIKITAIT/pandapillow.git
    cd pandapillow
    ```
2. **Install Dependencies:**
    ```sh
    npm install
    ```
3. ##### **Set Up Environment Variables:**

    Create a `.env` file in the root directory and add the required environment variables:

    ```sh
    DATABASE_URL=your_postgresql_database_url
    NEXT_PUBLIC_STRIPE_PUBLIC_KEY=your_stripe_public_key
    STRIPE_SECRET_KEY=your_stripe_secret_key
    UPLOADTHING_SECRET=your_uploadthing_secret
    UPLOADTHING_PUBLIC=your_uploadthing_public_key
    ```

4. **Run Database Migrations:**
    ```sh
    npx prisma migrate dev
    ```
5. **Start the Development Server:**
    ```sh
    npm run dev
    ```

The app will be available at http://localhost:3000.
