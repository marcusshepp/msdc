cd /root/msdc/msdc_ui
docker build --no-cache -t msdc_ui -f Dockerfile .
# docker ps 
# docker stop 425fa9c9025c
docker run -d -p 80:80 msdc_ui