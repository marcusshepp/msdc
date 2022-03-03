cd /root/msdc/msdc_ui
docker build --no-cache -t msdc/msdc -f ../Dockerfile .
docker run -d -p 80:80 msdc

# docker ps 
# docker stop 425fa9c9025c