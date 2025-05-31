# Kubernetes & Docker Setup on Windows (with WSL2)

## 🧰 System Environment
- **OS**: Windows 11
- **WSL2**: Installed and enabled (but not used in final setup)
- **Docker Desktop**: Installed with WSL2 backend support
- **Minikube**: Installed and running with `docker` driver

---

## ✅ Final Setup Architecture

### Docker
- **Docker Desktop** manages containers using the Docker Engine on Windows.
- Docker is configured with **WSL2 integration**, but **Ubuntu was removed** later to avoid confusion.
- Containers are running natively via Docker Desktop (not inside WSL).

### Minikube
- Installed via Windows terminal (`choco` or `installer`)
- Started with Docker driver:
  ```bash
  minikube start --driver=docker
  
```
Your Machine (Windows)
├── Docker
│   └── Minikube container
│       └── Kubernetes cluster (single node)
│           └── Pods (your app containers)
```

