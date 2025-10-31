#!/bin/bash


echo "Setting up cron job for deploy user..."

sudo mkdir -p /home/deploy


cat > /tmp/system_check.sh << 'EOF'
#!/bin/bash
echo "$(date) - Nightly system check executed" >> /home/deploy/system_check.log
EOF

sudo mv /tmp/system_check.sh /home/deploy/system_check.sh
sudo chmod +x /home/deploy/system_check.sh

echo "0 0 * * * /home/deploy/system_check.sh" | sudo crontab -u deploy -

echo "Cron job created successfully!"
echo "The job will run at midnight (00:00) every day"
echo "Logs will be written to /home/deploy/system_check.log"
