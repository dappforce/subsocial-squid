# Subsocial squid

## Quick running

```bash
# 1. Update Squid SDK and install dependencies
npm run update
npm ci
# 2. Compile typescript files
make build
# 3. Start target Postgres database and detach
make up
# 4. Start the processor
make process
# 5. The command above will block the terminal
#    being busy with fetching the chain data, 
#    transforming and storing it in the target database.
#
#    To start the graphql server open the separate terminal
#    and run
make serve
```