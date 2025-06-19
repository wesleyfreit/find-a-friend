## 📝 Requirements

### 🛠️ Functional Requirements

- ✅ It must be possible to register a pet
- ✅ It must be possible to list all of the pets available for adoption
- ✅ It must be possible to filter pets by their characteristics
- ✅ It must be possible to obtain details of a pet for adoption
- ✅ It must be possible to register as an NGO (ONG)
- ✅ It must be possible to authenticate as an NGO

### 📚 Business Rules

- ✅ To list the pets, you must provide the city
- ✅ An NGO needs to have an address and a Whatsapp number
- ✅ A pet needs to be linked to an NGO
- ✅ Users who wish to adopt a pet must contact the NGO via Whatsapp
- ✅ All of the filters, besides de city, they are optional
- ✅ For an NGO to access an application as an admin, it needs to be logged in.

### 🛠️ Non-Functional Requirements

- ✅ The user password must be encrypted
- ✅ The application data must be persisted in a PostgreSQL database
- ✅ Every data list must be paginated with 20 items per page
- ✅ The user must be identified by a JWT (JSON Web Token)
