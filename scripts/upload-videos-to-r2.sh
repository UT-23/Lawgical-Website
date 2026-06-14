#!/usr/bin/env bash
#
# Upload the site's videos to a Cloudflare R2 bucket.
#
# Prereq: AWS CLI installed (`brew install awscli`). R2 is S3-compatible.
#
# 1) In Cloudflare dashboard → R2 → create a bucket (e.g. "lawgical-media").
# 2) R2 → Manage API Tokens → create a token with Object Read & Write.
#    Note the Access Key ID, Secret Access Key, and your Account ID.
# 3) Bucket → Settings → enable "Public access" (r2.dev) OR attach a custom
#    domain. Copy the public base URL (looks like https://pub-xxxx.r2.dev).
# 4) Put the 10 video files in a local folder matching this layout:
#       <SRC_DIR>/clients/collection-reel.mp4
#       <SRC_DIR>/clients/jalpa-testimonial.mp4
#       <SRC_DIR>/clients/mostafa-testimonial.mp4
#       <SRC_DIR>/clients/shadhad-testimonial.mp4
#       <SRC_DIR>/clients/srinivas-singh-testimonial.mp4
#       <SRC_DIR>/csr/breast-cancer-awareness.mov
#       <SRC_DIR>/csr/education-day.mp4
#       <SRC_DIR>/csr/stress-awareness-day.mp4
#       <SRC_DIR>/csr/un-post.mov
#       <SRC_DIR>/csr/world-gratitude-day.mov
# 5) Fill in the vars below and run: bash scripts/upload-videos-to-r2.sh ./my-videos
#
set -euo pipefail

# ---- fill these in ----
ACCOUNT_ID="${R2_ACCOUNT_ID:?set R2_ACCOUNT_ID}"
BUCKET="${R2_BUCKET:?set R2_BUCKET}"           # e.g. lawgical-media
export AWS_ACCESS_KEY_ID="${R2_ACCESS_KEY_ID:?set R2_ACCESS_KEY_ID}"
export AWS_SECRET_ACCESS_KEY="${R2_SECRET_ACCESS_KEY:?set R2_SECRET_ACCESS_KEY}"
# -----------------------

SRC_DIR="${1:?usage: $0 <local-videos-dir>}"
ENDPOINT="https://${ACCOUNT_ID}.r2.cloudflarestorage.com"

content_type() { case "${1,,}" in *.mp4) echo video/mp4;; *.mov) echo video/quicktime;; *) echo application/octet-stream;; esac; }

for f in \
  clients/collection-reel.mp4 \
  clients/jalpa-testimonial.mp4 \
  clients/mostafa-testimonial.mp4 \
  clients/shadhad-testimonial.mp4 \
  clients/srinivas-singh-testimonial.mp4 \
  csr/breast-cancer-awareness.mov \
  csr/education-day.mp4 \
  csr/stress-awareness-day.mp4 \
  csr/un-post.mov \
  csr/world-gratitude-day.mov
do
  local_path="$SRC_DIR/$f"
  if [[ ! -f "$local_path" ]]; then
    echo "!! MISSING: $local_path  (skipping)"; continue
  fi
  echo ">> uploading $f"
  aws s3 cp "$local_path" "s3://${BUCKET}/videos/$f" \
    --endpoint-url "$ENDPOINT" \
    --content-type "$(content_type "$f")" \
    --cache-control "public, max-age=31536000, immutable"
done

echo
echo "Done. Now set in Vercel (Project → Settings → Environment Variables):"
echo "  NEXT_PUBLIC_VIDEO_CDN = https://pub-xxxxxxxx.r2.dev"
echo "(your bucket's public r2.dev URL, no trailing slash) and redeploy."
