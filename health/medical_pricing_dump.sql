--
-- PostgreSQL database dump
--

-- Dumped from database version 14.9 (Ubuntu 14.9-0ubuntu0.22.04.1)
-- Dumped by pg_dump version 14.9 (Ubuntu 14.9-0ubuntu0.22.04.1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: facilities; Type: TABLE; Schema: public; Owner: esand
--

CREATE TABLE public.facilities (
    id integer NOT NULL,
    facility_name character varying(255) NOT NULL
);


ALTER TABLE public.facilities OWNER TO esand;

--
-- Name: facilities_facility_id_seq; Type: SEQUENCE; Schema: public; Owner: esand
--

CREATE SEQUENCE public.facilities_facility_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.facilities_facility_id_seq OWNER TO esand;

--
-- Name: facilities_facility_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: esand
--

ALTER SEQUENCE public.facilities_facility_id_seq OWNED BY public.facilities.id;


--
-- Name: pricing; Type: TABLE; Schema: public; Owner: esand
--

CREATE TABLE public.pricing (
    pricing_id integer NOT NULL,
    procedure_id integer NOT NULL,
    facility_id integer NOT NULL,
    price numeric(10,2)
);


ALTER TABLE public.pricing OWNER TO esand;

--
-- Name: pricing_pricing_id_seq; Type: SEQUENCE; Schema: public; Owner: esand
--

CREATE SEQUENCE public.pricing_pricing_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.pricing_pricing_id_seq OWNER TO esand;

--
-- Name: pricing_pricing_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: esand
--

ALTER SEQUENCE public.pricing_pricing_id_seq OWNED BY public.pricing.pricing_id;


--
-- Name: procedures; Type: TABLE; Schema: public; Owner: esand
--

CREATE TABLE public.procedures (
    id integer NOT NULL,
    cpt_code character varying(10) NOT NULL,
    procedure_name text
);


ALTER TABLE public.procedures OWNER TO esand;

--
-- Name: procedures_procedure_id_seq; Type: SEQUENCE; Schema: public; Owner: esand
--

CREATE SEQUENCE public.procedures_procedure_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.procedures_procedure_id_seq OWNER TO esand;

--
-- Name: procedures_procedure_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: esand
--

ALTER SEQUENCE public.procedures_procedure_id_seq OWNED BY public.procedures.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: esand
--

CREATE TABLE public.users (
    id integer NOT NULL,
    username character varying(255) NOT NULL,
    password_hash character varying(255) NOT NULL,
    insurance_company character varying(255),
    copayment numeric(10,2) DEFAULT 0,
    coinsurance numeric(5,2) DEFAULT 0,
    deductible numeric(10,2) DEFAULT 0,
    "isAdmin" boolean DEFAULT false NOT NULL,
    saved_comparisons jsonb,
    CONSTRAINT users_coinsurance_check CHECK (((coinsurance >= (0)::numeric) AND (coinsurance <= (100)::numeric))),
    CONSTRAINT users_copayment_check CHECK ((copayment >= (0)::numeric)),
    CONSTRAINT users_deductible_check CHECK ((deductible >= (0)::numeric))
);


ALTER TABLE public.users OWNER TO esand;

--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: esand
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.users_id_seq OWNER TO esand;

--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: esand
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: facilities id; Type: DEFAULT; Schema: public; Owner: esand
--

ALTER TABLE ONLY public.facilities ALTER COLUMN id SET DEFAULT nextval('public.facilities_facility_id_seq'::regclass);


--
-- Name: pricing pricing_id; Type: DEFAULT; Schema: public; Owner: esand
--

ALTER TABLE ONLY public.pricing ALTER COLUMN pricing_id SET DEFAULT nextval('public.pricing_pricing_id_seq'::regclass);


--
-- Name: procedures id; Type: DEFAULT; Schema: public; Owner: esand
--

ALTER TABLE ONLY public.procedures ALTER COLUMN id SET DEFAULT nextval('public.procedures_procedure_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: esand
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Data for Name: facilities; Type: TABLE DATA; Schema: public; Owner: esand
--

COPY public.facilities (id, facility_name) FROM stdin;
1	NY-Presbyterian-Cornell
2	Mount Sinai
3	NYU Langone
4	Medicare
\.


--
-- Data for Name: pricing; Type: TABLE DATA; Schema: public; Owner: esand
--

COPY public.pricing (pricing_id, procedure_id, facility_id, price) FROM stdin;
1	1	1	2974.00
2	1	2	2000.00
3	1	3	1851.10
4	1	4	339.20
5	2	1	6678.61
6	2	2	2500.00
7	2	3	7245.00
8	2	4	2429.99
9	3	1	431.38
10	3	2	351.67
11	3	3	226.37
12	3	4	326.88
13	4	1	684.25
14	4	2	350.00
15	4	3	414.59
16	4	4	25.63
17	5	1	270.54
18	5	2	201.91
19	5	3	135.26
20	5	4	196.40
21	6	1	2786.79
22	6	2	4400.00
23	6	3	5281.00
24	6	4	310.91
25	7	1	859.66
26	7	2	750.00
27	7	3	746.20
28	7	4	117.17
29	8	1	1406.00
30	8	2	850.00
31	8	3	1719.00
32	8	4	158.45
33	9	1	256.59
34	9	2	20.00
35	9	3	2.70
36	9	4	0.00
37	10	1	256.59
38	10	2	300.00
39	10	3	10.33
40	10	4	0.00
41	11	1	242.31
42	11	2	60.00
43	11	3	124.00
44	11	4	0.00
45	12	1	176.93
46	12	2	140.00
47	12	3	642.50
48	12	4	20.64
49	13	1	178.84
50	13	2	350.00
51	13	3	136.79
52	13	4	172.10
53	14	1	280.82
54	14	2	261.12
55	14	3	265.65
56	14	4	148.46
57	15	1	330.00
58	15	2	180.00
59	15	3	128.88
60	15	4	3.66
61	16	1	119.96
62	16	2	250.00
63	16	3	139.39
64	16	4	51.60
65	17	1	618.00
66	17	2	450.00
67	17	3	773.30
68	17	4	167.10
69	18	1	229.00
70	18	2	450.00
71	18	3	439.95
72	18	4	56.59
73	19	1	238.00
74	19	2	450.00
75	19	3	528.15
76	19	4	90.57
77	20	1	264.00
78	20	2	450.00
79	20	3	733.64
80	20	4	128.16
81	21	1	280.82
82	21	2	300.00
83	21	3	616.27
84	21	4	132.48
85	22	1	280.82
86	22	2	300.00
87	22	3	616.27
88	22	4	128.82
89	23	1	280.82
90	23	2	300.00
91	23	3	616.27
92	23	4	148.46
93	24	1	280.82
94	24	2	300.00
95	24	3	616.27
96	24	4	161.11
\.


--
-- Data for Name: procedures; Type: TABLE DATA; Schema: public; Owner: esand
--

COPY public.procedures (id, cpt_code, procedure_name) FROM stdin;
1	45378	Colonoscopy
2	59400	Routine obstetric care 
3	70553	Brain MRI
4	71045	Chest x-ray,
5	72148	Spine MRI
6	74177	CT Scan
7	76801	Ultrasound
8	77066	Mammography
9	81000	Urinalysis
10	81025	Urine pregnancy test
11	83721	lab Test-Cholesterol
12	90471	Vaccine admin
13	90791	Psychiatric diagnostic evaluation
14	92004	Comprehensive eye exam for new patients
15	95004	Allergy Testing
16	96040	Medical Genetics counseling
17	99204	Office visit-New patient
18	99212	Office Visit- 10 Minutes
19	99213	office visit -20 minutes
20	99214	office visit - 30 minutes
21	99384	Preventive Exam ages 12-17
22	99385	Preventive Exam age 18-39
23	99386	Preventive Exam age 40-64
24	99387	Preventive Exam age 65+
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: esand
--

COPY public.users (id, username, password_hash, insurance_company, copayment, coinsurance, deductible, "isAdmin", saved_comparisons) FROM stdin;
71	admin8	$2b$10$YnIWvYtIjrWluACeIXCZzeESbjb9/oPNtlLeFXMkQ49W8Dwh5K.5K		1.00	1.00	1.00	t	[{"price": "2500.00", "facility_name": "Mount Sinai", "procedure_name": "Routine obstetric care "}, {"price": "7245.00", "facility_name": "NYU Langone", "procedure_name": "Routine obstetric care "}, {"price": "201.91", "facility_name": "Mount Sinai", "procedure_name": "Spine MRI"}, {"price": "135.26", "facility_name": "NYU Langone", "procedure_name": "Spine MRI"}]
69	admin6	$2b$10$1DhiCZMX5kKGR4e2okFceeIemrocOqycs1RX6zEQgLi0oa6yj8MTi		1.00	1.00	1.00	t	[]
13	admin	$2b$10$wXWWO9f6a2PsCwuVTAScz.g8x7FYozgtawV3CbGlrZVS7wR75UjY2	oxford	50.00	0.30	\N	t	[]
66	notadmin	$2b$10$WRi8Zx22XWZ6qH9R5vlKb.CaRm1EX/vwR1uXRef77F9aMpxsK81cC		\N	\N	\N	f	\N
65	admin2	$2b$10$G8ozpw/CMIJJIEfvMmRlhO3naExBb5sH9uHG/P6QHJovlbO89VjFK		\N	\N	\N	t	[]
67	admin3	$2b$10$hi/gMqxNVRmQVsHDhhADF.SwE/OfQu8Xp5f3EzEwGnxU9/vyeKTxK	Oxford	100.00	100.00	10000.00	f	\N
68	admin4	$2b$10$K6D6OqxHYM4qWw4fkzssE.Fl1nIIvhE3BLrDfa2HHfXUR4CwwKGYe		\N	\N	\N	f	\N
70	admin7	$2b$10$E9ePAo/BLvhYycHCTYiPOOmyaXIXBMdqewwdih4qdWpH9tvKDZjra		\N	\N	\N	f	\N
72	admin9	$2b$10$aISyKfnfdMMVCzLfqoj8M.I5shDtz/OaXqdV8ARbFqXaOAWssRBbS	cigggy	1.00	1.00	999.00	t	\N
\.


--
-- Name: facilities_facility_id_seq; Type: SEQUENCE SET; Schema: public; Owner: esand
--

SELECT pg_catalog.setval('public.facilities_facility_id_seq', 21, true);


--
-- Name: pricing_pricing_id_seq; Type: SEQUENCE SET; Schema: public; Owner: esand
--

SELECT pg_catalog.setval('public.pricing_pricing_id_seq', 102, true);


--
-- Name: procedures_procedure_id_seq; Type: SEQUENCE SET; Schema: public; Owner: esand
--

SELECT pg_catalog.setval('public.procedures_procedure_id_seq', 39, true);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: esand
--

SELECT pg_catalog.setval('public.users_id_seq', 72, true);


--
-- Name: facilities facilities_pkey; Type: CONSTRAINT; Schema: public; Owner: esand
--

ALTER TABLE ONLY public.facilities
    ADD CONSTRAINT facilities_pkey PRIMARY KEY (id);


--
-- Name: pricing pricing_pkey; Type: CONSTRAINT; Schema: public; Owner: esand
--

ALTER TABLE ONLY public.pricing
    ADD CONSTRAINT pricing_pkey PRIMARY KEY (pricing_id);


--
-- Name: procedures procedures_pkey; Type: CONSTRAINT; Schema: public; Owner: esand
--

ALTER TABLE ONLY public.procedures
    ADD CONSTRAINT procedures_pkey PRIMARY KEY (id);


--
-- Name: procedures unique_cpt_code_procedure_name; Type: CONSTRAINT; Schema: public; Owner: esand
--

ALTER TABLE ONLY public.procedures
    ADD CONSTRAINT unique_cpt_code_procedure_name UNIQUE (cpt_code, procedure_name);


--
-- Name: facilities unique_facility_name; Type: CONSTRAINT; Schema: public; Owner: esand
--

ALTER TABLE ONLY public.facilities
    ADD CONSTRAINT unique_facility_name UNIQUE (facility_name);


--
-- Name: pricing unique_procedure_facility; Type: CONSTRAINT; Schema: public; Owner: esand
--

ALTER TABLE ONLY public.pricing
    ADD CONSTRAINT unique_procedure_facility UNIQUE (procedure_id, facility_id);


--
-- Name: procedures unique_procedure_name; Type: CONSTRAINT; Schema: public; Owner: esand
--

ALTER TABLE ONLY public.procedures
    ADD CONSTRAINT unique_procedure_name UNIQUE (procedure_name);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: esand
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: pricing pricing_facility_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: esand
--

ALTER TABLE ONLY public.pricing
    ADD CONSTRAINT pricing_facility_id_fkey FOREIGN KEY (facility_id) REFERENCES public.facilities(id);


--
-- Name: pricing pricing_procedure_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: esand
--

ALTER TABLE ONLY public.pricing
    ADD CONSTRAINT pricing_procedure_id_fkey FOREIGN KEY (procedure_id) REFERENCES public.procedures(id);


--
-- PostgreSQL database dump complete
--

