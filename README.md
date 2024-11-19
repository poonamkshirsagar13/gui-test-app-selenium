### To run Docker container with gui-react-test-app
```
docker rm -f gui-react-app
docker run -d --name gui-react-app -p 4000:80 amitkshirsagar13/gui-react-test-app
```