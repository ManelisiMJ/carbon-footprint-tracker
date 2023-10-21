import json
import random
import string

companies = []

company_names = [
    "Stellar Solutions",
    "Fusion Technologies",
    "Nexus Innovations",
    "Elite Ventures",
    "Quantum Industries",
    "Optimum Systems",
    "Vertex Solutions",
    "Synergy Enterprises",
    "Prime Global",
    "Alpha Innovators",
    "Proxima Corp",
    "Innovex Solutions",
    "Apex Ventures",
    "Spectrum Industries",
    "Orion Technologies"
]

# Generate a random password for each company
def generate_random_password():
    characters = string.ascii_letters + string.digits
    password = ''.join(random.choice(characters) for _ in range(8))
    return password

# Generate companies with identifiers, unique IDs, passwords, and aliases
for i in range(15):
    identifier = f"Company {i}"
    password = generate_random_password()
    alias = identifier

    company = {
        "id": identifier,
        "password": password,
        "name": company_names[i]
    }

    companies.append(company)

# Save the data to a JSON file
with open('login_data.json', 'w') as json_file:
    json.dump(companies, json_file, indent=4)

print("Login data saved to login_data.json.")
