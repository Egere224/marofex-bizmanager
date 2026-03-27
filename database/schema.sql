-- ========================
-- FUNCTION
-- ========================
CREATE OR REPLACE FUNCTION update_sale_payment_status()
RETURNS trigger
LANGUAGE plpgsql
AS $$
BEGIN
    UPDATE sales
    SET 
        amount_paid = COALESCE((
            SELECT SUM(amount)
            FROM sale_payments
            WHERE sale_id = NEW.sale_id
        ), 0),

        balance = total_amount - COALESCE((
            SELECT SUM(amount)
            FROM sale_payments
            WHERE sale_id = NEW.sale_id
        ), 0),

        payment_status = CASE
            WHEN total_amount - COALESCE((
                SELECT SUM(amount)
                FROM sale_payments
                WHERE sale_id = NEW.sale_id
            ), 0) <= 0 THEN 'paid'
            WHEN COALESCE((
                SELECT SUM(amount)
                FROM sale_payments
                WHERE sale_id = NEW.sale_id
            ), 0) > 0 THEN 'partial'
            ELSE 'unpaid'
        END
    WHERE id = NEW.sale_id;

    RETURN NEW;
END;
$$;


-- ========================
-- USERS
-- ========================
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    full_name VARCHAR(120) NOT NULL,
    email VARCHAR(150) UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    phone VARCHAR(20) NOT NULL,
    trial_used BOOLEAN DEFAULT false,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


-- ========================
-- BUSINESSES
-- ========================
CREATE TABLE businesses (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    name VARCHAR(150) NOT NULL,
    currency VARCHAR(10) DEFAULT 'NGN',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


-- ========================
-- CUSTOMERS
-- ========================
CREATE TABLE customers (
    id SERIAL PRIMARY KEY,
    business_id INTEGER NOT NULL REFERENCES businesses(id) ON DELETE CASCADE,
    name VARCHAR(120) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    address TEXT,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


-- ========================
-- PRODUCTS
-- ========================
CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    business_id INTEGER NOT NULL REFERENCES businesses(id) ON DELETE CASCADE,
    name VARCHAR(150) NOT NULL,
    price NUMERIC(12,2) NOT NULL CHECK (price >= 0),
    cost_price NUMERIC(12,2) DEFAULT 0,
    quantity INTEGER DEFAULT 0 CHECK (quantity >= 0),
    low_stock_level INTEGER DEFAULT 5,
    barcode VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


-- ========================
-- SALES
-- ========================
CREATE TABLE sales (
    id SERIAL PRIMARY KEY,
    business_id INTEGER NOT NULL REFERENCES businesses(id) ON DELETE CASCADE,
    customer_id INTEGER REFERENCES customers(id) ON DELETE SET NULL,
    total_amount NUMERIC(12,2) NOT NULL,
    amount_paid NUMERIC(12,2) DEFAULT 0,
    balance NUMERIC(12,2) DEFAULT 0,
    payment_status VARCHAR(20) DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


-- ========================
-- SALE ITEMS
-- ========================
CREATE TABLE sale_items (
    id SERIAL PRIMARY KEY,
    sale_id INTEGER NOT NULL REFERENCES sales(id) ON DELETE CASCADE,
    product_id INTEGER NOT NULL REFERENCES products(id),
    quantity INTEGER NOT NULL CHECK (quantity > 0),
    unit_price NUMERIC(12,2) NOT NULL CHECK (unit_price >= 0),
    subtotal NUMERIC(12,2) NOT NULL
);


-- ========================
-- SALE PAYMENTS
-- ========================
CREATE TABLE sale_payments (
    id SERIAL PRIMARY KEY,
    sale_id INTEGER NOT NULL REFERENCES sales(id) ON DELETE CASCADE,
    amount NUMERIC(12,2) NOT NULL CHECK (amount > 0),
    payment_method VARCHAR(20) DEFAULT 'cash',
    note TEXT,
    paid_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


-- ========================
-- PAYMENT REQUESTS
-- ========================
CREATE TABLE payment_requests (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    amount NUMERIC(12,2) NOT NULL,
    payment_note TEXT,
    status VARCHAR(20) DEFAULT 'pending',
    proof_url TEXT,
    approved_by INTEGER,
    requested_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    approved_at TIMESTAMP
);


-- ========================
-- SUBSCRIPTIONS
-- ========================
CREATE TABLE subscriptions (
    id SERIAL PRIMARY KEY,
    business_id INTEGER REFERENCES businesses(id) ON DELETE CASCADE,
    status VARCHAR(20) DEFAULT 'inactive',
    plan_type VARCHAR(20) DEFAULT 'monthly',
    businesses_allowed INTEGER CHECK (businesses_allowed > 0),
    start_date TIMESTAMP,
    end_date TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);