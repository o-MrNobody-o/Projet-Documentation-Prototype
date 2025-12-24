{
  "email": "test@example.com",
  "password": "user201296"
}


user201296
$2b$10$k0xnGqKDTg2v6OandpW9Q.4jb0kSRk1XKqF7lWBh5iO10e8JQ/HEW
INSERT INTO users (username, email, password_hash, role)
VALUES ('testuser', 'test@example.com', '$2b$10$k0xnGqKDTg2v6OandpW9Q.4jb0kSRk1XKqF7lWBh5iO10e8JQ/HEW', 'admin');

note : dont use "" in tokens 
"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsInJvbGUiOiJhZG1pbiIsImlhdCI6MTc2NjUwOTQwMywiZXhwIjoxNzY2NTk1ODAzfQ.PXQROpr9bm9cGNx7wB4ZXNBB7SmD2sAe3DkPEK_oTvQ"