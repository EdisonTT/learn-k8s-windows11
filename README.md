# Learn Kubernetes on Windows 11

🚀 This repository helps you set up and learn **Kubernetes (K8s)** on a **Windows 11** system. It’s perfect for beginners and developers who want a solid local Kubernetes environment using **Docker Desktop**, **WSL 2**, and related tools.

---

## 🧰 Prerequisites

Make sure the following are set up before starting:

* **Windows 11 Pro or Enterprise** – Required for Hyper-V.
* **Docker Desktop** – For container management.
* **WSL 2** – Enables a Linux-based development experience.
* **kubectl** – Command-line tool to interact with Kubernetes clusters.
* **Git** – To clone this repository.

---

## 🛠 Installation Steps

### 1. Enable Hyper-V and WSL 2

Open **PowerShell as Administrator** and run:

```powershell
dism.exe /online /enable-feature /featurename:Microsoft-Hyper-V /all /norestart
dism.exe /online /enable-feature /featurename:VirtualMachinePlatform /all /norestart
```

👉 Restart your system.

---

### 2. Install WSL 2 and a Linux Distro

```powershell
wsl --install
wsl --set-default-version 2
```

➡ Install **Ubuntu** or another distro from the Microsoft Store.

---

### 3. Install Docker Desktop

* Download from: [docker.com/products/docker-desktop](https://www.docker.com/products/docker-desktop)
* During setup, enable **WSL 2 backend** and integrate with your Linux distro.

---

### 4. Install `kubectl`

Using **Chocolatey**:

```powershell
choco install kubernetes-cli
```

Or refer to: [Install kubectl on Windows](https://kubernetes.io/docs/tasks/tools/install-kubectl-windows/)

---

### 5. Clone This Repository

```bash
git clone https://github.com/EdisonTT/learn-k8s-windows11.git
cd learn-k8s-windows11
```

---

## 📁 Repository Structure

| Folder          | Description                                      |
| --------------- | ------------------------------------------------ |
| `general-docs/` | Learning resources and basic Kubernetes concepts |
| `first-app/`    | Your first Kubernetes deployment example         |
| `backend-app/`  | Sample backend application with Kubernetes setup |

---

## 📚 Learning Path

1. **Start with Basics** – Go through `general-docs/` to build a strong foundation.
2. **First Kubernetes App** – Follow `first-app/` to deploy your first service.
3. **Backend Deployment** – Learn real-world deployment from `backend-app/`.

---

## 🔗 Resources

* [Docker Desktop](https://www.docker.com/products/docker-desktop)
* [Install WSL](https://docs.microsoft.com/en-us/windows/wsl/install)
* [Kubernetes Official Docs](https://kubernetes.io/docs/)
* [kubectl Install Guide](https://kubernetes.io/docs/tasks/tools/install-kubectl-windows/)

---

## 🤝 Contributing

Feel free to fork, improve, and create pull requests. Any suggestions or bug reports are welcome via [issues](https://github.com/EdisonTT/learn-k8s-windows11/issues).

---

## 🧠 Acknowledgment

> 📝 **This README and accompanying documentation were created with the assistance of [ChatGPT](https://chat.openai.com/)** to ensure clarity, completeness, and structure.

---

## 📄 License

This project is licensed under the **MIT License**. See the [LICENSE](LICENSE) file for more info.
