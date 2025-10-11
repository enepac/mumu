#!/usr/bin/env bash
set -e

DATE=$(date +"%Y%m%d_%H%M%S")
SNAPSHOT_DIR="dev/snapshots"
SNAPSHOT_FILE="$SNAPSHOT_DIR/mumu_backup_$DATE.sql"

mkdir -p "$SNAPSHOT_DIR"

echo "Creating Supabase snapshot at $SNAPSHOT_FILE ..."
npx supabase db dump --data-only --linked --file "$SNAPSHOT_FILE"

echo "Snapshot complete: $SNAPSHOT_FILE"
