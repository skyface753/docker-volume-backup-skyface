#!/bin/bash

# Exit immediately on error
set -e

# Start API
npm install
screen -d -m node /root/backup-api.js 

# Write cronjob env to file, fill in sensible defaults, and read them back in
cat <<EOF > env.sh
BACKUP_SOURCES="${BACKUP_SOURCES:-/backup}"
BACKUP_CRON_EXPRESSION="${BACKUP_CRON_EXPRESSION:-@daily}"
AWS_S3_BUCKET_NAME="${AWS_S3_BUCKET_NAME:-}"
AWS_GLACIER_VAULT_NAME="${AWS_GLACIER_VAULT_NAME:-}"
AWS_EXTRA_ARGS="${AWS_EXTRA_ARGS:-}"
BACKUP_FILENAME=${BACKUP_FILENAME:-"backup-%Y-%m-%dT%H-%M-%S.tar.gz"}
BACKUP_ARCHIVE="${BACKUP_ARCHIVE:-/archive}"
BACKUP_UID=${BACKUP_UID:-0}
BACKUP_GID=${BACKUP_GID:-$BACKUP_UID}
BACKUP_WAIT_SECONDS="${BACKUP_WAIT_SECONDS:-0}"
BACKUP_HOSTNAME="${BACKUP_HOSTNAME:-$(hostname)}"
GPG_PASSPHRASE="${GPG_PASSPHRASE:-}"
INFLUXDB_URL="${INFLUXDB_URL:-}"
INFLUXDB_DB="${INFLUXDB_DB:-}"
INFLUXDB_CREDENTIALS="${INFLUXDB_CREDENTIALS:-}"
INFLUXDB_MEASUREMENT="${INFLUXDB_MEASUREMENT:-docker_volume_backup}"
BACKUP_CUSTOM_LABEL="${BACKUP_CUSTOM_LABEL:-}"
BACKUP_MAX_NUMBERS="${BACKUP_MAX_NUMBERS:-0}"
PRE_POST_USER="${PRE_POST_USER:-0}"
EOF
chmod a+x env.sh
source env.sh

# Configure AWS CLI
mkdir -p .aws
cat <<EOF > .aws/credentials
[default]
aws_access_key_id = ${AWS_ACCESS_KEY_ID}
aws_secret_access_key = ${AWS_SECRET_ACCESS_KEY}
EOF
if [ ! -z "$AWS_DEFAULT_REGION" ]; then
cat <<EOF > .aws/config
[default]
region = ${AWS_DEFAULT_REGION}
EOF
fi

# Add our cron entry, and direct stdout & stderr to Docker commands stdout
echo "Installing cron.d entry: docker-volume-backup"
echo "$BACKUP_CRON_EXPRESSION root /root/backup.sh > /root/output.log" > /etc/cron.d/docker-volume-backup

# Let cron take the wheel
echo "Starting cron in foreground with expression: $BACKUP_CRON_EXPRESSION"
#cron -f
/usr/bin/supervisord
