
# 📄 Load Testing & Replica Scaling – Findings Documentation

## 🧪 Overview

This document outlines the approach, observations, and conclusions from a load testing experiment conducted on a static website deployed in a Kubernetes cluster using NGINX.

The goal was to observe the effect of increasing pod replicas on application performance under load.

---

## ⚙️ Kubernetes Setup

* **Application:** Static website served using `nginx`
* **Deployment Target:** Minikube (local Kubernetes cluster)
* **Service Type:** ClusterIP exposed via port-forward or Minikube service URL

---

## 📌 Scaling the Deployment

To increase the number of pod replicas:

```bash
kubectl scale deployment <deployment-name> --replicas=10
```

This command updates the running deployment to spin up 10 instances (pods) of the application.

To verify:

```bash
kubectl get pods
kubectl get endpoints <service-name>
```

---

## ❌ Initial Load Test Using Node.js Script

### Approach:

A custom Node.js script was written using a `for` loop to send multiple HTTP requests to the service:

```js
for (let i = 0; i < 400; i++) {
  requestArray.push(createSingleRequest(url));
}
```

### Observations:

* Requests beyond \~300 started to fail.
* Response times were inconsistent.
* Node.js hit limits on socket concurrency and connection reuse.
* There was no control over request rate or concurrency level.
* Difficult to simulate real-world traffic patterns.

### Conclusion:

> ❌ Node.js scripts are **not ideal** for high-concurrency load testing without advanced handling for sockets, throttling, retries, and metrics.

---

## ✅ Switched to Artillery for Load Testing

Artillery is a dedicated load testing tool that provides:

* Controlled virtual user (VU) simulation
* Configurable arrival rates
* Real-time metrics (latency percentiles, request throughput)
* Stable execution under high load

### Example Test Config:

```yaml
phases:
  - duration: 30
    arrivalRate: 50

scenarios:
  - flow:
      - get:
          url: "/"
```

### Result Sample:

```
http.codes.200: .................... 1500
http.request_rate: ................ 22/sec
http.response_time.mean: .......... 13ms
http.response_time.p95: ........... 34.1ms
http.response_time.p99: ........... 45.2ms
```

✅ All requests successful <br>
✅ Low and consistent latency <br>
✅ No pod failures

---

## 🧠 Why a Single Pod Was Enough

Despite increasing replicas, results were the same.

### Why?

* **NGINX is highly optimized** for serving static content.
* Serving a static HTML page requires **minimal CPU or memory**.
* A single NGINX pod on a local machine can easily handle thousands of requests per second.
* No dynamic computation, database interaction, or intensive processing involved.

> 💡 This means that under this specific test scenario, a single pod was never saturated — hence no visible gain from adding replicas.

---

## ⚠️ Important Insight: **This Is Not a Valid Pod Scaling Test**

### Reasons:

* The app being tested (static NGINX site) is not resource-intensive.
* Load generation was initially insufficient or not truly concurrent.
* Scaling benefits only emerge when:

  * Pods are **individually maxed out**
  * There’s **dynamic logic** (e.g. database, computation)
  * Traffic needs **horizontal distribution** for reliability or latency reduction

---

## ✅ Final Takeaways

* Use tools like **Artillery** or **k6** for serious load testing.
* Static content on NGINX is not a realistic candidate for replica scaling tests.
* Always verify actual pod count and status using `kubectl get pods`.
* Add **logging inside the pods** (e.g., print `process.env.HOSTNAME`) to confirm load is spread.
* To test replica scaling properly, use a **Node.js app** or **API server** with logic that stresses CPU/memory.