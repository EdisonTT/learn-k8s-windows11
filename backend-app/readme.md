# Kubernetes (Minikube) NestJS Deployment - Learning Project

This repository is focused on learning and testing Kubernetes (k8s) using Minikube on a local Windows 11 machine with Docker Desktop and WSL enabled.

## Prerequisites

Before you begin, ensure the following are installed and set up on your system:

- **Windows 11**
- **WSL 2** enabled
- **Docker Desktop** installed and configured to use WSL 2 backend
- **Minikube** installed and running
- **kubectl** CLI installed
- **Git**

## Project Structure

This repository includes Kubernetes manifests and Dockerfile(s) needed to containerize and deploy a NestJS application locally on Minikube.

However, the actual NestJS application is hosted in a separate repository.

## Step-by-Step Instructions

### 1. Clone the NestJS Project

Clone the NestJS application from its repository (replace with your actual repo link):

```bash
git clone https://github.com/EdisonTT/nest-js-intro
```

### 2. Build the NestJS Project

Navigate to the cloned NestJS project and install dependencies:

```bash
cd nest-js-intro
npm install
```

Then build the project:

```bash
npm run build
```

This will generate a `dist/` folder containing the compiled JavaScript output.

### 3. Copy the Build Output

Copy the `dist/` folder and the `package.json` (and optionally any necessary config files like `.env`) into this Kubernetes project directory:

```
/backend-app/
  └── dist/
  └── package.json
```

### 4. Build Docker Image

Make sure Docker Desktop is running and set your environment to use Minikube's Docker daemon:

```bash
minikube docker-env
```


Run the command it outputs to point Docker CLI to Minikube's internal registry.

On Bash
```bash
eval $(minikube -p minikube docker-env)
```
On Powershell
```powershell
& minikube -p minikube docker-env --shell powershell | Invoke-Expression
```

Then build your Docker image (replace `nestjs-app` with your desired image name):

```bash
docker build -t nestjs-app:latest .
```

Test the image using
```bash
 docker run -p 3000:3000 <image-name>
 docker run -p 3000:3000 nestjs-app:latest
 ```

 Now Visit `http://localhost:3000` and see it is working.

### 5. Deploy to Minikube

Apply the Kubernetes deployment and service YAML files:

```bash
kubectl apply -f deployment.yaml
kubectl apply -f service.yaml
```

### 6. Access the Application

Check the status of pods and services:

```bash
kubectl get pods
kubectl get services
```

Use Minikube to access the service in your browser:

```bash
minikube service nestjs-service
```

This will open the service endpoint in your default web browser.

Use the address to call your APIs. A sample address looks like.
```powershell
minikube service nestjs-service
|-----------|----------------|-------------|---------------------------|
| NAMESPACE |      NAME      | TARGET PORT |            URL            |
|-----------|----------------|-------------|---------------------------|
| default   | nestjs-service |        3000 | http://192.168.49.2:30081 |
|-----------|----------------|-------------|---------------------------|
🏃  Starting tunnel for service nestjs-service.
|-----------|----------------|-------------|------------------------|
| NAMESPACE |      NAME      | TARGET PORT |          URL           |
|-----------|----------------|-------------|------------------------|
| default   | nestjs-service |             | http://127.0.0.1:58000 |
|-----------|----------------|-------------|------------------------|
🎉  Opening service default/nestjs-service in default browser...
❗  Because you are using a Docker driver on windows, the terminal needs to be open to run it.
```

Use the tunnel URL to access the application.

## Project Files

* `Dockerfile`: Used to build the NestJS application Docker image.
* `deployment.yaml`: Kubernetes Deployment configuration.
* `service.yaml`: Kubernetes Service to expose the application.

## Application overview

The application has following endpoints for testing purpose

| Route                  | HTTP Method | Purpose                                           |
| ---------------------- | ----------- | ------------------------------------------------- |
| `/greet/say-hello`     | GET         | Returns a simple "Hello World!" message           |
| `/greet/delayed-hello` | GET         | Returns "Hello World!" after a specified delay    |
| `/greet/load-cpu`      | GET         | Simulates CPU load for a given duration           |
| `/greet/crash-app`     | GET         | Crashes the application immediately (for testing) |
| `/health`              | GET         | Health check endpoint for Kubernetes probes       |

