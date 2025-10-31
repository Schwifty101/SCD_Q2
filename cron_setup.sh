#!/bin/bash

# Cron Setup Script for Deploy User
# This script sets up a cron job that logs system checks at midnight

echo "Setting up cron job for deploy user..."

# Create the directory if it doesn't exist
sudo mkdir -p /home/deploy

# Create a script that will be executed by cron
cat > /tmp/system_check.sh << 'EOF'
#!/bin/bash
echo "$(date) - Nightly system check executed" >> /home/deploy/system_check.log
EOF

# Move the script to the deploy directory
sudo mv /tmp/system_check.sh /home/deploy/system_check.sh
sudo chmod +x /home/deploy/system_check.sh

# Add cron job for deploy user
# This runs at midnight (00:00) every day
echo "0 0 * * * /home/deploy/system_check.sh" | sudo crontab -u deploy -

echo "Cron job created successfully!"
echo "The job will run at midnight (00:00) every day"
echo "Logs will be written to /home/deploy/system_check.log"
