#!/bin/bash
set -e

psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "$POSTGRES_DB" <<-EOSQL
    CREATE SCHEMA $POSTGRES_DEFAULT_SCHEMA;
    ALTER SCHEMA $POSTGRES_DEFAULT_SCHEMA OWNER TO $POSTGRES_USER;
EOSQL
