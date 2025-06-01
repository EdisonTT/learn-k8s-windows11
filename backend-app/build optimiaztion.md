## 🧱 Build Strategy & Optimization Notes

### 🔨 Building Outside the Container

In this project, we build the NestJS application **outside the Docker container** using:

```bash
npm install
npm run build
```

This approach is clean and efficient during development and testing because:

* It avoids unnecessary complexity inside Docker.
* Build artifacts (`dist/`) are manually copied into the Docker context.
* Docker only installs **runtime** dependencies (`--omit=dev`), making images smaller.

---

### 🎯 Why We Still Run `npm install` in Docker

Even after building the app, we still need to install production dependencies because NestJS apps rely on packages at **runtime**, including:

* `@nestjs/core`
* `rxjs`
* `class-transformer`, etc.

These dependencies are **not embedded** in the compiled JS — they are dynamically required at runtime.

```dockerfile
COPY dist ./dist
COPY package*.json ./
RUN npm install --omit=dev
```

---

### 🚀 Future Optimization: Bundling & Tree-Shaking

Eventually, we can eliminate the need for `npm install` in Docker by **bundling the application** using tools like:

* [Webpack](https://webpack.js.org/)
* [esbuild](https://esbuild.github.io/)
* [Rollup](https://rollupjs.org/)

Benefits of bundling:

* **Tree-shaking** removes unused code.
* Generates a **single lightweight file** (or few minimal chunks).
* Eliminates `node_modules` in the final Docker image.
* Reduces image size, memory usage, and cold-start time.

Example of a slim Dockerfile after bundling:

```dockerfile
FROM node:20-slim
WORKDIR /app
COPY dist/bundle.js ./app.js
CMD ["node", "app.js"]
```