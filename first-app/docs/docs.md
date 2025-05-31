# 🚀 HTML App Deployment using Docker + Kubernetes + Minikube

## 📁 Files Structure

```bash
first-app/
├── index.html
├── Dockerfile
├── deployment.yaml
```

---

## 📄 1. index.html

A simple HTML file to serve.


## 🐳 2. Dockerfile

This Dockerfile builds a lightweight container using Nginx to serve the HTML:

```Dockerfile
FROM nginx:alpine
COPY index.html /usr/share/nginx/html/index.html
```

### 🔧 Build the Docker Image

```bash
docker build -t first-app .
```

> Make sure to use the same image name (`first-app`) in your Kubernetes deployment.

---

## 📦 3. deployment.yaml

Defines both **Deployment** and **Service** in one YAML.

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: first-app
spec:
  replicas: 1
  selector:
    matchLabels:
      app: first-app
  template:
    metadata:
      labels:
        app: first-app
    spec:
      containers:
        - name: first-app
          image: first-app:latest
          ports:
            - containerPort: 80
---
apiVersion: v1
kind: Service
metadata:
  name: first-app-service
spec:
  type: NodePort
  selector:
    app: first-app
  ports:
    - port: 80
      targetPort: 80
      nodePort: 30080
```

---

## ⚙️ Setup Summary

### ✅ Tools Used

- Docker Desktop (with Docker Engine)
- Minikube (running with Docker driver)
- WSL2 for Linux terminal (Ubuntu)

### ✅ Minikube Setup

- Minikube runs a **single-node Kubernetes cluster** using Docker.
- All Pods are scheduled inside a Docker container named `minikube`.
- Docker images built on the host must be manually loaded into Minikube:
  
```bash
minikube image load first-app:latest
```

---

## 🧱 Deployment vs Service in Kubernetes

| Component   | Role                                                       |
|-------------|------------------------------------------------------------|
| Deployment  | Manages Pods, replicas, updates, and app rollout/rollback |
| Service     | Exposes Pods, balances traffic to Pods                     |

---

## 🔌 Accessing the App

1. Apply the deployment:

```bash
kubectl apply -f deployment.yaml
```

2. Verify everything is running:

```bash
kubectl get pods
kubectl get svc
```

3. Access the app using:

```bash
minikube service first-app-service --url
```

⚠️ This will only work as long as the terminal is open if you're using Docker driver.

---

## 🧠 Concepts Recap

| Component     | Description                                                   |
|---------------|---------------------------------------------------------------|
| Dockerfile    | Instructions to build a Docker image                          |
| Minikube      | Local single-node Kubernetes cluster                          |
| Deployment    | Manages desired state of Pods                                 |
| Service       | Exposes Pods via network                                      |
| NodePort      | Type of service to expose at `localhost:<port>`              |
| kubectl       | CLI to interact with Kubernetes                               |

---

## 🧼 Cleanup

```bash
kubectl delete -f deployment.yaml
minikube delete
docker rmi first-app
```

---

## ✅ Final Result

You successfully deployed a static HTML page to Kubernetes on your local Windows machine using:

- Docker (to build image)
- Minikube (as a local K8s cluster)
- YAML (to define your deployment and service)

🎉 Deployed at: `http://127.0.0.1:<your-node-port>`
