# ClearCost Health

ClearCost Health is an application designed to compare medical procedure pricing sourced by various hospitals in New York City. Users can view, compare, and save procedure costs and see estimated out-of-pocket expenses based on their health insurance details.

## Deployment URL

```https://clear-code-yg4uz2ct5a-uc.a.run.app/```

## Tech Stack

- PostgreSQL
- Vite
- React
- Express
- Node.js
- SQL
- Material-UI
- Bootstrap

## Features

- User Registration and Login
- Admin Registration with additional functionalities (Add, Delete, Update procedures, prices, and facilities)
- User Profile with optional data: Health Insurance Company, Copayment ($), Coinsurance (%), Deductible ($)
- Compare medical procedure costs across hospitals
- Save and delete comparisons for future reference
- Estimate out-of-pocket expenses based on user profile data
- Secure login and logout functionality

## Installation

Follow these steps to install and run the application locally.

### Prerequisites

- Node.js (v14 or later)
- PostgreSQL
- Git

### Setup

1. **Clone the repository**

   ```bash
   git clone https://github.com/EddieSandler/ClearCost-Health.git
   cd ClearCost-Health ```

2. **Install dependencies**

 bash
 ```npm install```

3.**Set up PostgreSQL database**

bash
```npm install```

4.**Run database migrations**
bash
```npm run migrate```

5.**Start the server**
bash
```npm run dev```

6.**Start the client**
bash
    ```cd client
    npm install
    npm start```

### Creating a Database Dump

To create a backup of your PostgreSQL database, use the following steps:

Ensure you have pg_dump installed:
pg_dump is a utility for backing up a PostgreSQL database. It should come with the PostgreSQL installation.

Create the dump file:
Open your terminal and run the following command to create a dump of your database:

bash

```pg_dump -U your_username -h your_host -F c -b -v -f clearcost_health.dump your_database_name```

Replace your_username, your_host, and your_database_name``` with your PostgreSQL username, host, and database name, respectively. The -F c flag specifies the custom format, which is suitable for backups.

### Restoring the Database Dump

To restore the database on the client side, follow these directions:

Ensure you have pg_restore installed:
pg_restore is a utility for restoring a PostgreSQL database from an archive created by pg_dump.

### Download the dump file

Ensure that the dump file (medical_pricing_dump.sql) is available on the client machine.

### Create the database

Before restoring, you need to create an empty database in PostgreSQL. Open your terminal and run:

```bash

createdb -U your_username -h your_host new_database_name
Replace your_username, your_host, and new_database_name with your PostgreSQL username, host, and the name of the new database. ```

Restore the dump file:

``` bash
pg_restore -U your_username -h your_host -d new_database_name -v medical_pricing_dump.sql```

Replace your_username, your_host, and new_database_name with your PostgreSQL username, host, and the name of the new database.
