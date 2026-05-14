# 🌾 Regional Crop Management System

A robust, full-stack agricultural management platform designed to track the complete lifecycle of crops across hierarchical administrative regions. The system is engineered for precision agriculture, regional reporting, and future AI-driven analytics using Retrieval-Augmented Generation (RAG).

---

# 🚀 Overview

The **Regional Crop Management System** enables agricultural authorities and administrators to monitor farming productivity, analyze crop performance, predict yields, and track losses with detailed geographical granularity:

**State → District → Block → Village**

The platform is designed with scalability, data consistency, and future AI integration in mind.

---

# ✨ Key Features

## 📍 Hierarchical Reporting

- Village-level crop tracking
- Block-wise agricultural summaries
- District and state-wide analytics
- Aggregated reporting dashboards

## 🔐 Role-Based Access Control (RBAC)

- **Super Admin**
    - Global access across all regions
    - Manage admins, crops, and reports

- **Block Admin**
    - Access restricted to assigned block
    - Manage local farming records and crop updates

## 📊 Yield & Loss Tracking

- Track:
    - Predicted yield
    - Actual harvested yield
    - Crop losses
- Automated loss calculations
- Seasonal performance monitoring

## 🧾 Farming Lifecycle Management

- Crop sowing records
- Growth stage tracking
- Harvest management
- Status transitions:
    - Sown
    - Growing
    - Harvested

## 🧠 AI-Ready Architecture

Database schema optimized for:

- Text-to-SQL systems
- RAG-based AI assistants
- Natural language agricultural analytics

---

# 🛠️ Tech Stack

| Layer    | Technology                 |
| -------- | -------------------------- |
| Frontend | Angular 17+                |
| Backend  | Node.js + Express / NestJS |
| Database | PostgreSQL                 |
| ORM      | Prisma                     |
| Language | TypeScript                 |

---

# 📂 Project Structure

````bash
regional-crop-management-system/
│
├── frontend/              # Angular frontend
├── backend/               # Node.js/NestJS backend
├── prisma/                # Prisma schema & migrations
├── docs/                  # Documentation
├── .env                   # Environment variables
├── package.json
└── README.md

## 🗄️ Database Schema Design

The platform follows a **highly normalized relational architecture** to maintain data consistency, scalability, and transactional reliability across thousands of agricultural records.

---

## 📂 Core Entities

### 🌱 Crops

Stores crop-related master data including:

- Crop names
- Crop varieties
- Seasonal requirements
- Expected yield benchmarks
- Harvest duration

---

### 👨‍🌾 Farmers

Maintains farmer profiles and ownership records.

Includes:

- Farmer details
- Contact information
- Linked farms
- Regional associations

---

### 🚜 Farms

Tracks farm-level geographical and agricultural information.

Includes:

- Farm location
- Acreage
- Soil type
- Assigned village/block
- Ownership mapping

---

### 📈 Farming Records

The central transactional entity of the platform.

Tracks:

- Crop lifecycle stages
- Sowing dates
- Harvest dates
- Yield predictions
- Actual production
- Loss calculations
- Farming remarks

---

### 🏢 Admins

Role-scoped administrative users with hierarchical access control.

#### Roles:
- Super Admin
- Block Admin

---

# 🔄 Workflow

```text
Super Admin
    ↓
District Monitoring
    ↓
Block Admin
    ↓
Village Farming Records
    ↓
Crop Lifecycle Tracking
    ↓
Yield Analysis & Reporting

# 🤖 Future Roadmap: AI Integration

This project is being developed with an **AI-First Architecture** to support intelligent agricultural analytics and assistant systems.

---

# 🧠 Planned AI Features

## ✅ Text-to-SQL Chatbot

Admins will be able to query agricultural statistics using natural language.

### Example

```text
"Which block had the highest wheat loss in 2025?"
````

---

## ✅ RAG-Based Agricultural Assistant

The platform will support:

- Vector embeddings
- Context-aware agricultural recommendations
- Intelligent document retrieval

### Potential Use Cases

- Disease recommendations
- Soil-specific crop suggestions
- Seasonal farming insights
- Farming advisory assistance

---

# ⚙️ Setup & Installation

## 1️⃣ Clone the Repository

```bash
git clone https://github.com/your-username/regional-crop-management-system.git

cd regional-crop-management-system
```

---

## 2️⃣ Install Dependencies

```bash
npm install
```

---

## 3️⃣ Configure Environment Variables

Create a `.env` file in the project root:

```env
DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE"
```

---

## 4️⃣ Initialize Prisma

```bash
npx prisma generate

npx prisma db push
```

---

## 5️⃣ Run the Application

```bash
npm run dev
```

---

# 📌 Example Use Cases

- Government agricultural monitoring
- Regional crop productivity analysis
- Yield prediction systems
- Agricultural research platforms
- AI-powered farming advisory systems

---

# 🔒 Security Considerations

- RBAC-based authorization
- Scoped database access
- Input validation
- Transaction-safe yield updates
- Secure environment variable handling

---

# 📈 Scalability Goals

The architecture is designed to support:

- Multi-state agricultural data
- Millions of farming records
- Distributed admin management
- AI/ML analytics pipelines

---

# 🧪 Future Enhancements

- Satellite integration
- GIS-based farm mapping
- Weather API integration
- Crop disease detection
- Mobile application support
- Real-time analytics dashboard

---

# 🤝 Contributing

Contributions are welcome.

## Steps

### 1. Fork the repository

### 2. Create your feature branch

```bash
git checkout -b feature/amazing-feature
```

### 3. Commit your changes

```bash
git commit -m "Add amazing feature"
```

### 4. Push to the branch

```bash
git push origin feature/amazing-feature
```

### 5. Open a Pull Request

---

# 📄 License

Distributed under the MIT License.

See `LICENSE` for more information.

---

# 👨‍💻 Author

## Mayan Prajapati

- LinkedIn: [Your LinkedIn]
- Portfolio: [Your Portfolio]
- GitHub: [Your GitHub]

---

# ⭐ Support

If you found this project useful, consider giving it a ⭐ on GitHub.

Recommended Immediate Next Steps

Build in this order:

Prisma Full Schema
Crop
FarmingRecord
Admin
Enums
Authentication System
Admin login
JWT
RBAC middleware
CRUD APIs
Farmers
Farms
Crops
Farming records
Reporting APIs
State-wise
District-wise
Block-wise
Swagger Documentation
AI-ready Query Layer
Analytics services
Structured reporting APIs

The next major step should be defining the complete Prisma schema properly before writing APIs.
