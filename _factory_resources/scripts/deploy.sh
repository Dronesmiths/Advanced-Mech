#!/bin/bash

# Configuration Search
INTAKE="CLIENT_INTAKE.md"

if [ ! -f "$INTAKE" ]; then
    echo "❌ CLIENT_INTAKE.md not found!"
    exit 1
fi

BUCKET=$(grep "AWS Bucket Name" "$INTAKE" | cut -d: -f2 | xargs)
DIST_ID=$(grep "CloudFront Distribution ID" "$INTAKE" | cut -d: -f2 | xargs)

if [[ "$BUCKET" == "[AWS_S3_BUCKET_NAME]" || -z "$BUCKET" ]]; then
    echo "❌ AWS Bucket Name not set in CLIENT_INTAKE.md"
    exit 1
fi

echo "🚀 Deploying to S3 Bucket: $BUCKET"
aws s3 sync public/ s3://$BUCKET --delete

if [[ "$DIST_ID" != "[AWS_CLOUDFRONT_ID]" && ! -z "$DIST_ID" ]]; then
    echo "🧹 Invalidating CloudFront Cache: $DIST_ID"
    aws cloudfront create-invalidation --distribution-id $DIST_ID --paths "/*"
else
    echo "⚠️ Skipping CloudFront invalidation (ID not set or default)"
fi

echo "✅ Deployment Complete!"
