import secrets

# Generate a secure random secret key with 32 bytes
secret_key = secrets.token_hex(32)

print(secret_key)
