--
-- Name: facilities; Type: TABLE; Schema: public; Owner: esand
--

CREATE TABLE facilities (
    id SERIAL PRIMARY KEY,
    facility_name VARCHAR(255) NOT NULL UNIQUE
);

--
-- Name: procedures; Type: TABLE; Schema: public; Owner: esand
--

CREATE TABLE procedures (
    id SERIAL PRIMARY KEY,
    cpt_code VARCHAR(10) NOT NULL UNIQUE,
    procedure_name TEXT UNIQUE
);

--
-- Name: pricing; Type: TABLE; Schema: public; Owner: esand
--

CREATE TABLE pricing (
    pricing_id SERIAL PRIMARY KEY,
    procedure_id INTEGER NOT NULL,
    facility_id INTEGER NOT NULL,
    price NUMERIC(10,2),
    CONSTRAINT unique_procedure_facility UNIQUE (procedure_id, facility_id),
    CONSTRAINT pricing_facility_id_fkey FOREIGN KEY (facility_id) REFERENCES facilities(id),
    CONSTRAINT pricing_procedure_id_fkey FOREIGN KEY (procedure_id) REFERENCES procedures(id)
);

--
-- Name: users; Type: TABLE; Schema: public; Owner: esand
--

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    insurance_company VARCHAR(255),
    copayment NUMERIC(10,2) DEFAULT 0,
    coinsurance NUMERIC(5,2) DEFAULT 0,
    deductible NUMERIC(10,2) DEFAULT 0,
    isAdmin BOOLEAN DEFAULT false NOT NULL,
    saved_comparisons JSONB,
    CONSTRAINT users_coinsurance_check CHECK (coinsurance >= 0 AND coinsurance <= 100),
    CONSTRAINT users_copayment_check CHECK (copayment >= 0),
    CONSTRAINT users_deductible_check CHECK (deductible >= 0)
);

--
-- Data for Name: facilities; Type: TABLE DATA; Schema: public; Owner: esand
--

INSERT INTO facilities (facility_name) VALUES
('NY-Presbyterian-Cornell'),
('Mount Sinai'),
('NYU Langone'),
('Medicare');

--
-- Data for Name: procedures; Type: TABLE DATA; Schema: public; Owner: esand
--

INSERT INTO procedures (cpt_code, procedure_name) VALUES
('45378', 'Colonoscopy'),
('59400', 'Routine obstetric care'),
('70553', 'Brain MRI'),
('71045', 'Chest x-ray'),
('72148', 'Spine MRI'),
('74177', 'CT Scan'),
('76801', 'Ultrasound'),
('77066', 'Mammography'),
('81000', 'Urinalysis'),
('81025', 'Urine pregnancy test'),
('83721', 'lab Test-Cholesterol'),
('90471', 'Vaccine admin'),
('90791', 'Psychiatric diagnostic evaluation'),
('92004', 'Comprehensive eye exam for new patients'),
('95004', 'Allergy Testing'),
('96040', 'Medical Genetics counseling'),
('99204', 'Office visit-New patient'),
('99212', 'Office Visit- 10 Minutes'),
('99213', 'office visit -20 minutes'),
('99214', 'office visit - 30 minutes'),
('99384', 'Preventive Exam ages 12-17'),
('99385', 'Preventive Exam age 18-39'),
('99386', 'Preventive Exam age 40-64'),
('99387', 'Preventive Exam age 65+');

--
-- Data for Name: pricing; Type: TABLE DATA; Schema: public; Owner: esand
--

INSERT INTO pricing (procedure_id, facility_id, price) VALUES
(1, 1, 2974.00),
(1, 2, 2000.00),
(1, 3, 1851.10),
(1, 4, 339.20),
(2, 1, 6678.61),
(2, 2, 2500.00),
(2, 3, 7245.00),
(2, 4, 2429.99),
(3, 1, 431.38),
(3, 2, 351.67),
(3, 3, 226.37),
(3, 4, 326.88),
(4, 1, 684.25),
(4, 2, 350.00),
(4, 3, 414.59),
(4, 4, 25.63),
(5, 1, 270.54),
(5, 2, 201.91),
(5, 3, 135.26),
(5, 4, 196.40),
(6, 1, 2786.79),
(6, 2, 4400.00),
(6, 3, 5281.00),
(6, 4, 310.91),
(7, 1, 859.66),
(7, 2, 750.00),
(7, 3, 746.20),
(7, 4, 117.17),
(8, 1, 1406.00),
(8, 2, 850.00),
(8, 3, 1719.00),
(8, 4, 158.45),
(9, 1, 256.59),
(9, 2, 20.00),
(9, 3, 2.70),
(9, 4, 0.00),
(10, 1, 256.59),
(10, 2, 300.00),
(10, 3, 10.33),
(10, 4, 0.00),
(11, 1, 242.31),
(11, 2, 60.00),
(11, 3, 124.00),
(11, 4, 0.00),
(12, 1, 176.93),
(12, 2, 140.00),
(12, 3, 642.50),
(12, 4, 20.64),
(13, 1, 178.84),
(13, 2, 350.00),
(13, 3, 136.79),
(13, 4, 172.10),
(14, 1, 280.82),
(14, 2, 261.12),
(14, 3, 265.65),
(14, 4, 148.46),
(15, 1, 330.00),
(15, 2, 180.00),
(15, 3, 128.88),
(15, 4, 3.66),
(16, 1, 119.96),
(16, 2, 250.00),
(16, 3, 139.39),
(16, 4, 51.60),
(17, 1, 618.00),
(17, 2, 450.00),
(17, 3, 773.30),
(17, 4, 167.10),
(18, 1, 229.00),
(18, 2, 450.00),
(18, 3, 439.95),
(18, 4, 56.59),
(19, 1, 238.00),
(19, 2, 450.00),
(19, 3, 528.15),
(19, 4, 90.57),
(20, 1, 264.00),
(20, 2, 450.00),
(20, 3, 733.64),
(20, 4, 128.16),
(21, 1, 280.82),
(21, 2, 300.00),
(21, 3, 616.27),
(21, 4, 132.48),
(22, 1, 280.82),
(22, 2, 300.00),
(22, 3, 616.27),
(22, 4, 128.82),
(23, 1, 280.82),
(23, 2, 300.00),
(23, 3, 616.27),
(23, 4, 148.46),
(24, 1, 280.82),
(24, 2, 300.00),
(24, 3, 616.27),
(24, 4, 161.11);

--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: esand
--

INSERT INTO users (username, password_hash, insurance_company, copayment, coinsurance, deductible, isAdmin, saved_comparisons) VALUES
('admin8', '$2b$10$YnIWvYtIjrWluACeIXCZzeESbjb9/oPNtlLeFXMkQ49W8Dwh5K.5K', NULL, 1.00, 1.00, 1.00, TRUE, '[{"price": "2500.00", "facility_name": "Mount Sinai", "procedure_name": "Routine obstetric care "}, {"price": "7245.00", "facility_name": "NYU Langone", "procedure_name": "Routine obstetric care "}, {"price": "201.91", "facility_name": "Mount Sinai", "procedure_name": "Spine MRI"}, {"price": "135.26", "facility_name": "NYU Langone", "procedure_name": "Spine MRI"}]'),
('admin6', '$2b$10$1DhiCZMX5kKGR4e2okFceeIemrocOqycs1RX6zEQgLi0oa6yj8MTi', NULL, 1.00, 1.00, 1.00, TRUE, '[]'),
('admin', '$2b$10$wXWWO9f6a2PsCwuVTAScz.g8x7FYozgtawV3CbGlrZVS7wR75UjY2', 'oxford', 50.00, 0.30, NULL, TRUE, '[]'),
('notadmin', '$2b$10$WRi8Zx22XWZ6qH9R5vlKb.CaRm1EX/vwR1uXRef77F9aMpxsK81cC', NULL, NULL, NULL, NULL, FALSE, NULL),
('admin2', '$2b$10$G8ozpw/CMIJJIEfvMmRlhO3naExBb5sH9uHG/P6QHJovlbO89VjFK', NULL, NULL, NULL, NULL, TRUE, '[]'),
('admin3', '$2b$10$hi/gMqxNVRmQVsHDhhADF.SwE/OfQu8Xp5f3EzEwGnxU9/vyeKTxK', 'Oxford', 100.00, 100.00, 10000.00, FALSE, NULL),
('admin4', '$2b$10$K6D6OqxHYM4qWw4fkzssE.Fl1nIIvhE3BLrDfa2HHfXUR4CwwKGYe', NULL, NULL, NULL, NULL, FALSE, NULL),
('admin7', '$2b$10$E9ePAo/BLvhYycHCTYiPOOmyaXIXBMdqewwdih4qdWpH9tvKDZjra', NULL, NULL, NULL, NULL, FALSE, NULL),
('admin9', '$2b$10$aISyKfnfdMMVCzLfqoj8M.I5shDtz/OaXqdV8ARbFqXaOAWssRBbS', 'cigggy', 1.00, 1.00, 999.00, TRUE, NULL);
