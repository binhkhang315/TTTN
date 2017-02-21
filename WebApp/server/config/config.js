module.exports =
{
    "development": {
        "dialect": "mysql",
        "username": "root",
        "password": "root",
        "database": "tttn_development",
        "host": "127.0.0.1",
        "pool": {
            "max": 5,
            "min": 0,
            "idle": 10000
        },
        port: 3311,
        "logging": false
    },
    "production": {
        "dialect": "mysql",
        "username": "root",
        "password": "root",
        "database": "tttn_production",
        "host": "192.168.100.3",
        "pool": {
            "max": 5,
            "min": 0,
            "idle": 10000
        },
        port: 3311,
        "logging": false
    }
}
