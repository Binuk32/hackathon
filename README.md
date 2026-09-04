# Induni Hardware - Rental & Inventory Management System

A business-specific web-based rental and inventory management system developed for **Indunil Hardware**, a local construction and power-tool rental business in Sri Lanka.

---

## Project Information

**Module:** SE3090 - Software Engineering Frameworks  
**Project:** Mini Hackathon  
**Team:** WE.SE-19  
**Institute:** Sri Lanka Institute of Information Technology (SLIIT)  
**Academic Year:** 2026

---

# 1. Selected Problem

Small-scale rental businesses in Sri Lanka often manage their rental equipment and records using manual paper-based systems.

For a hardware and equipment rental business such as Induni Hardware, this can make it difficult to:

- Keep track of available equipment.
- Identify equipment that is currently rented out.
- Record customer rental information.
- Keep track of expected return dates.
- Maintain an organized inventory.
- Avoid forgotten returns or missing equipment.
- Quickly find specific equipment when required.

Manual record-keeping can therefore lead to confusion and make the rental management process less efficient.

The selected problem focuses on **digitalizing manual inventory and rental management for a small-scale Sri Lankan rental business**.

---

# 2. Proposed Solution

We developed a **business-specific Rental and Inventory Management System for Indunil Hardware**.

Instead of creating a general-purpose rental application, our solution is specifically designed around the requirements of **Indunil Hardware's construction and power-tool rental operations**.

The system provides an **Admin/Staff interface** through which the business can digitally manage its equipment inventory and rental activities.

The solution allows the Admin/Staff to:

- View equipment inventory.
- Search for equipment.
- Filter equipment based on availability.
- Identify available and rented equipment.
- Rent equipment to customers.
- Enter and manage customer rental information.
- Validate rental information before submission.
- Organize rental information digitally.

The main purpose of the solution is to reduce the business's dependence on physical books and manual records and provide a more organized digital system for managing rental operations.

---

# 3. Target User

The primary user of the application is:

**Induni Hardware Admin / Staff / Store Manager**

The current system focuses on the **internal administration side** of the business.

There is **no separate customer portal** in this implementation.

The Admin/Staff uses the system to manage equipment and rental transactions.

---

# 4. Main Features

## 4.1 Admin Dashboard

The Admin Dashboard provides a centralized interface for managing the equipment rental operation.

The Admin can access the main inventory and rental-related functionality from the dashboard.

---

## 4.2 Equipment Inventory

The system provides an organized view of the equipment belonging to the business.

Equipment information can include:

- Equipment name
- Equipment category
- Availability status
- Rental information

Equipment can be identified as:

- **Available**
- **Currently Rented Out**

This makes it easier for staff to understand the current inventory status.

---

## 4.3 Equipment Search

The Admin can search for equipment within the inventory.

This allows staff to quickly find a particular tool or piece of equipment instead of manually checking through physical records.

The search can be performed using relevant equipment information such as the equipment name or category.

---

## 4.4 Equipment Filtering

The inventory provides filtering functionality to help the Admin view equipment according to its current status.

For example:

```text
All Equipment
Available
Rented Out

 ## 4.5 Rental Checkout

The Admin can rent an available equipment item to a customer using the rental checkout form.

The form records important information such as:

Customer name
Customer phone number
Selected equipment
Expected return date

## 4.6 Input Validation

The rental checkout form includes validation to prevent invalid or incomplete information from being submitted.

Validation includes:

Required field validation
Sri Lankan mobile number validation
Return date validation

 # 5. Technologies Used

The application is developed using the MERN technology stack.

Technology	        Purpose
React.js	        Frontend and Admin user interface
Node.js	            Backend runtime environment
Express.js	        Backend framework and REST API
MongoDB Atlas	    Database for equipment and rental information
HTML	            Structure of the web interface
CSS / Tailwind CSS	Styling and responsive user interface
Git	                Version control
GitHub	            Source code management and team collaboration
Vercel              Frontend deployment. 
Render              Backend deployment.


# 6. System Architecture
 +-----------------------------+
|       Presentation Layer    |
|                             |
|          React.js           |
|       Admin Interface       |
+-------------+---------------+
              |
              | HTTP / REST API
              v
+-----------------------------+
|      Application Layer      |
|                             |
|    Node.js + Express.js     |
|       Business Logic        |
|          REST API           |
+-------------+---------------+
              |
              | Database Operations
              v
+-----------------------------+
|          Data Layer         |
|                             |
|        MongoDB Atlas        |
|   Equipment & Rental Data   |
+-----------------------------+


#7 AI Tools Used

AI tools were used as development assistance during the implementation of the project.

ChatGPT

ChatGPT was used to assist the development team with:


## 8. Installation and Setup

### Prerequisites

Before running the application, make sure the following are installed:

- Node.js
- npm
- Git
- MongoDB Atlas account

---

### Step 1 - Clone the Repository

Clone the project repository:

```bash
git clone https://github.com/Binuk32/hackathon.git


Navigate into the project directory:

```bash
cd hackathon
 ## Backend Installation
   ```bash
   cd server

   ```bash
   npm install

 ## Backend Environment Variables
    MONGO_URI=your_mongodb_connection_string
    PORT=5000

 ## Start the Backend
    npm start

 ## Frontend Installation
    cd client
    npm install

 # Start the frontend development server:
    npm run dev

### Project Structure
 
hackathon/
│
├── client/                          ← React + Vite + TailwindCSS (Frontend)
│   ├── public/
│   ├── src/
│   │   ├── assets/
│   │   │
│   │   ├── components/              ← Reusable UI Components
│   │   │   ├── AddToolModal.jsx     
│   │   │   ├── Features.jsx
│   │   │   ├── Footer.jsx
│   │   │   ├── HeroSlider.jsx
│   │   │   ├── LoginModal.jsx       
│   │   │   ├── Navbar.jsx
│   │   │   ├── ProblemContext.jsx
│   │   │   └── ToolCard.jsx         
│   │   │
│   │   ├── context/
│   │   │   └── AuthContext.jsx      ← Global auth state (user, login, logout)
│   │   │
│   │   ├── pages/
│   │   │   ├── AdminDashboard.jsx   ← Protected admin inventory page
│   │   │   └── LandingPage.jsx      ← Public landing page
│   │   │
│   │   ├── services/
│   │   │   ├── api.js               ← Base fetchWithAuth helper
│   │   │   └── toolService.js       ← fetchTools / createTool API calls
│   │   │
│   │   ├── App.jsx                  ← BrowserRouter + Routes
│   │   ├── App.css
│   │   ├── index.css                ← Tailwind base/components/utilities
│   │   └── main.jsx                 ← Entry point (AuthProvider wraps App)
│   │
│   ├── index.html
│   ├── .env                         ← VITE_API_BASE_URL (optional)
│   ├── package.json
│   ├── tailwind.config.js
│   └── vite.config.js
│
├── server/                          ← Node.js + Express + MongoDB (Backend)
│   ├── config/
│   │   └── db.js                    ← Mongoose connection (indunil_hardware DB)
│   │
│   ├── controllers/
│   │   ├── authController.js        ← loginAdmin, registerAdmin
│   │   └── toolController.js        ← getTools, createTool
│   │
│   ├── middleware/
│   │   └── authMiddleware.js        ← JWT protect() middleware
│   │
│   ├── models/
│   │   ├── User.js                  ← Admin user schema 
│   │   └── Tool.js                  ← Tool inventory schema
│   │
│   ├── routes/
│   │   ├── authRoutes.js            ← POST /api/auth/login|register
│   │   └── toolRoutes.js            ← GET|POST /api/tools
│   │
│   ├── services/
│   ├── .env                         ← PORT, MONGO_URI, JWT_SECRET
│   ├── createAdmin.js               ← Admin user seeding script
│   ├── package.json
│   └── server.js                    ← Express app entry point
│
└── README.md

### Team Contributions

Sanjana P K D (IT24100033)

Contributions:
Admin login → automatic redirect to /admin/dashboard
Inventory dashboard with summary metrics (Total Types, Total Units, Available, Low Stock)
Tool cards displaying image, name, description, Available: X / Y, progress bar
Visual status badges: Available / Low Stock / Unavailable
Add New Tool form with image file upload (auto-resized) or URL input
Loading, empty state, and error handling on dashboard


Pinsara R.W.B (IT24101124)

Contributions:



Kameshika GKHP (IT24100185) 

Contributions:


 
Rajapaksha RPPS (IT24100365)

Contributions:





### Deployed Application

Application URL:
backend: https://indunilrents.onrender.com
frontend: https://indunil-rents.vercel.app/

### Demonstration Video

https://drive.google.com/file/d/1cL8QMrx_2fdShIMF6tskNC7BeMy4P-ib/view?usp=drive_link

### AI tools used
  * Chatgpt
  * Gemini
