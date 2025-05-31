## 📘 Understanding `deployment.yaml` in Kubernetes

Here’s an annotated example followed by a detailed explanation of each term:

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: first-app
spec:
  replicas: 2
  selector:
    matchLabels:
      app: first-app
  template:
    metadata:
      labels:
        app: first-app
    spec:
      containers:
        - name: first-app-container
          image: first-app:latest
          ports:
            - containerPort: 80
```

---

### 🧩 Breakdown of Each Term

| **Field**               | **Explanation**                                                                                |
| ----------------------- | ---------------------------------------------------------------------------------------------- |
| `apiVersion: apps/v1`   | Specifies the API version used by Kubernetes. `apps/v1` is required for Deployments.           |
| `kind: Deployment`      | Tells Kubernetes this is a Deployment object, which manages pod replicas and rollout strategy. |
| `metadata:`             | Metadata about the object. Includes:                                                           |
| └── `name: first-app`   | The name of the deployment (must be unique within the namespace).                              |
| `spec:`                 | The desired state and configuration for the Deployment.                                        |
| └── `replicas: 2`       | Number of pod replicas Kubernetes should run. Helps with scaling and fault tolerance.          |
| └── `selector:`         | Defines how to identify the set of Pods targeted by this Deployment.                           |
| └── `matchLabels:`      | Used to match pods with the same labels.                                                       |
| └── `app: first-app`    | Ensures the Deployment manages only Pods with this label.                                      |
| `template:`             | Defines the **pod template** used to create Pods managed by the Deployment.                    |
| └── `metadata:`         | Metadata for the Pod template.                                                                 |
| └── `labels:`           | Labels to apply to the Pod. These must match the selector.                                     |
| └── `spec:`             | Pod-level specification. Describes containers to be run.                                       |
| └── `containers:`       | A list of containers to run in the Pod.                                                        |
| └── `- name:`           | Name of the container.                                                                         |
| └── `image:`            | The Docker image to be used. Can be from Docker Hub, local image, or private repo.             |
| └── `ports:`            | List of container ports that should be exposed.                                                |
| └── `containerPort: 80` | The port on which the app inside the container listens.                                        |

---

### 🔁 Summary

* A **Deployment** helps manage **multiple replicas** of a pod.
* It ensures **zero downtime deployments**, **rollbacks**, and **updates**.
* Pods are created using the **template** under `spec.template`.
* Pods match the **labels** to get linked with the **Deployment** and optionally a **Service**.