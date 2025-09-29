const fs = require("fs-extra");
const csv = require("csv-parser");
const path = require("path");
const { execSync } = require("child_process");

const results = [];

fs.createReadStream("websites.csv")
  .pipe(csv())
  .on("data", (data) => results.push(data))
  .on("end", () => {
    results.forEach((site) => {
      const appPath = path.join(__dirname, "..", "build", site.domain);
      fs.ensureDirSync(appPath);

      // --- 1️⃣ Create App.jsx ---
      const appCode = `
        import React from "react";
        import ReactDOM from "react-dom/client";

        function Hero() {
          return <h1>Quick delivery service in dhaka.</h1>;
        }

        function Contact() {
          return (
            <>
              <p>Phone: ${site.phone}</p>
              <p>Address: ${site.address}</p>
            </>
          );
        }

        function App() {
          return (
            <div>
              <Hero />
              <Contact />
            </div>
          );
        }

        ReactDOM.createRoot(document.getElementById("root")).render(<App />);
      `;
      fs.writeFileSync(path.join(appPath, "App.jsx"), appCode);

      // --- 2️⃣ Create index.html ---
      const indexHtml = `
        <!DOCTYPE html>
        <html lang="en">
          <head>
            <meta charset="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <title>${site.title}</title>
          </head>
          <body>
            <div id="root"></div>
            <script type="module" src="./App.jsx"></script>
          </body>
        </html>
      `;
      fs.writeFileSync(path.join(appPath, "index.html"), indexHtml);

      // --- 3️⃣ Create package.json ---
      const packageJson = {
        name: site.domain.replace(/\./g, "-"),
        version: "1.0.0",
        type: "module",
        scripts: {
          start: "vite",
          build: "vite build",
          preview: "vite preview"
        },
        dependencies: {
          react: "^18.3.0",
          "react-dom": "^18.3.0"
        },
        devDependencies: {
          vite: "^5.0.0",
          "@vitejs/plugin-react": "^4.0.0"
        }
      };
      fs.writeFileSync(
        path.join(appPath, "package.json"),
        JSON.stringify(packageJson, null, 2)
      );

      // --- 4️⃣ Create vite.config.js ---
      const viteConfig = `
        import { defineConfig } from "vite";
        import react from "@vitejs/plugin-react";

        export default defineConfig({
          plugins: [react()],
        });
      `;
      fs.writeFileSync(path.join(appPath, "vite.config.js"), viteConfig);

      // --- 5️⃣ Auto-install dependencies ---
      console.log(`Installing dependencies for ${site.domain}...`);
      execSync("npm install", { cwd: appPath, stdio: "inherit" });

      console.log(` ${site.domain} is ready! Run 'npm start' inside this folder.`);
    });

    console.log("🎉 All apps generated and ready to run!");
  });
