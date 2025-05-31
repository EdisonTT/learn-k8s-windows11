# 📘 Kubernetes `service.yaml` Explained

This document explains each part of a Kubernetes **Service** YAML configuration, which is used to expose a Deployment or a set of Pods.

---

## ✅ Sample Service YAML

```yaml
apiVersion: v1
kind: Service
metadata:
  name: first-app-service
spec:
  type: NodePort
  selector:
    app: first-app
  ports:
    - protocol: TCP
      port: 80
      targetPort: 80
      nodePort: 30080
```

---

## 🧩 Explanation of Each Field

| Field                         | Description                                                                                                                                           |
| ----------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- |
| `apiVersion: v1`              | Specifies the API version for the Service. Services use `v1`.                                                                                         |
| `kind: Service`               | Declares this manifest as a **Service** resource.                                                                                                     |
| `metadata:`                   | Metadata that identifies the Service object.                                                                                                          |
| └── `name: first-app-service` | A unique name for the service.                                                                                                                        |
| `spec:`                       | Contains all the specifications for the Service.                                                                                                      |
| └── `type: NodePort`          | Exposes the service on each Node’s IP at a static port (useful for local access with Minikube). Other types include `ClusterIP`, `LoadBalancer`, etc. |
| └── `selector:`               | Used to find the set of Pods this Service should target.                                                                                              |
| └── `app: first-app`          | Must match the label in the pod/deployment (`app: first-app`).                                                                                        |
| └── `ports:`                  | Defines the port mappings for the Service.                                                                                                            |
| └── `protocol: TCP`           | Protocol used (usually TCP or UDP).                                                                                                                   |
| └── `port: 80`                | The port the service will expose inside the cluster (Cluster IP).                                                                                     |
| └── `targetPort: 80`          | The port on the container that the service should forward traffic to.                                                                                 |
| └── `nodePort: 30080`         | (Only for `NodePort` type) Port exposed externally on each node. Must be in range `30000-32767`.                                                      |

---

## 🌐 How It Works

* The **Service** acts as a stable endpoint to access a set of **Pods**.
* Using `type: NodePort`, the app can be accessed externally via:

  ```
  http://<NodeIP>:<nodePort>
  ```

  For Minikube:

  ```
  minikube service first-app-service --url
  ```

---

## 📝 Common Service Types

| Type           | Description                                                     |
| -------------- | --------------------------------------------------------------- |
| `ClusterIP`    | Default. Accessible only within the cluster.                    |
| `NodePort`     | Accessible on a static port across each node's IP.              |
| `LoadBalancer` | Provisions an external load balancer (used in cloud providers). |
| `ExternalName` | Maps a service to a DNS name (no actual selector or pods).      |

---

## 🔁 Summary

* **Services** expose one or more **Pods** to other parts of your application or the outside world.
* The **selector** connects the service to the pods by matching labels.
* With `NodePort`, you can access the app from your host machine using a static port.

