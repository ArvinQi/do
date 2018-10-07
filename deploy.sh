# /bin/bash!
npm run build
docker rmi arvinqi/do
docker build -t arvinqi/do .
docker push arvinqi/do
