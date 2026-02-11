# SportzStore Database Architecture

## Overview
SportzStore uses **MongoDB** (NoSQL) as the database with **Mongoose** as the ODM (Object Data Modeling) library. The application uses **Firebase Authentication** for user management and stores additional user data and equipment information in MongoDB.

---

## Collections

### 1. **Users Collection**
Stores user account information synced from Firebase Authentication.

**Schema:**
```javascript
{
  uid: String,           // Firebase UID (Primary Key, Unique)
  email: String,         // User email (Required, Unique)
  createdAt: DateTime,   // Auto-generated
  updatedAt: DateTime    // Auto-generated
}
```

**Indexes:**
- `uid`: Unique index for fast lookups
- `email`: Unique index

**File:** `backend/models/User.js`

---

### 2. **Equipment Collection**
Stores sports equipment/products added by users.

**Schema:**
```javascript
{
  _id: ObjectId,              // MongoDB auto-generated (Primary Key)
  userId: String,             // Foreign Key to Users (uid)
  image: String,              // Product image URL
  product_name: String,       // Equipment name
  category: String,           // Category (Cricket, Football, Tennis, etc.)
  description: [String],      // Array of product details
  price: String,              // Price in BDT
  rating: Number,             // Rating (0-5)
  customization: String,      // Customization options
  processingTime: String,     // Delivery/processing time
  stock_status: String,       // 'In-stock', 'Out of stock', 'Made to Order'
  dateAdded: Date,            // Date product was added
  createdAt: DateTime,        // Auto-generated
  updatedAt: DateTime         // Auto-generated
}
```

**Indexes:**
- `userId`: Index for user-specific queries
- `category`: Index for filtering by category
- Text index on `product_name` and `description` for search functionality

**File:** `backend/models/Equipment.js`

---

## Relationships

```
Users (1) ------- adds -------> (Many) Equipment
```

- **One-to-Many Relationship**: A user can add multiple equipment items
- **Foreign Key**: `Equipment.userId` references `Users.uid`

---

## API Endpoints Structure

### Users
- `POST /api/users` - Create/register user (syncs with Firebase)
- `GET /api/users/:uid` - Get user by Firebase UID

### Equipment
- `POST /api/equipment` - Add new equipment (requires authentication)
- `GET /api/equipment` - Get all equipment
- `GET /api/equipment/:id` - Get single equipment by ID
- `GET /api/equipment/user/:userId` - Get all equipment by specific user
- `PUT /api/equipment/:id` - Update equipment (owner only)
- `DELETE /api/equipment/:id` - Delete equipment (owner only)

---

## Authentication Flow

1. **Sign Up/Login**: User authenticates via Firebase (Google Auth)
2. **User Creation**: Frontend sends `uid` and `email` to backend
3. **Database Storage**: Backend stores user info in MongoDB Users collection
4. **Token Management**: Firebase handles JWT tokens
5. **Authorization**: Backend verifies Firebase token for protected routes

---

## Data Validation

### Users
- `uid`: Required, unique
- `email`: Required, unique, valid email format

### Equipment
- `userId`: Required (must exist in Users)
- `image`: Required, valid URL
- `product_name`: Required, 3-100 characters
- `category`: Required
- `description`: Required, array with at least 1 item
- `price`: Required
- `rating`: Number between 0-5
- `stock_status`: Must be one of: 'In-stock', 'Out of stock', 'Made to Order'

---

## Future Enhancements

### Potential New Collections:
1. **Orders** - Track user purchases
2. **Reviews** - User reviews for equipment
3. **Categories** - Predefined category list
4. **Cart** - Shopping cart items
5. **Wishlist** - User favorites

### Potential Schema Updates:
1. Add **seller ratings** to Users
2. Add **multiple images** to Equipment
3. Add **inventory count** to Equipment
4. Add **discount/offers** to Equipment

---

## Connection String
The database connection is configured in `backend/.env`:
```
MONGO_URI='mongodb+srv://sportzstore:password@cluster0.xxx.mongodb.net/sportzstore'
```

Database name: `sportzstore`

---

## Backup & Maintenance
- Enable MongoDB Atlas automated backups
- Regular data exports for critical collections
- Monitor collection sizes and indexes
- Review slow queries using MongoDB Atlas Performance Advisor
