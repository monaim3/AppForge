
        import React from "react";
        import ReactDOM from "react-dom/client";

        function Hero() {
          return <h1>Quick delivery service in dhaka.</h1>;
        }

        function Contact() {
          return (
            <>
              <p>Phone: 01712345678</p>
              <p>Address: House 12, Road 5, Banani, Dhaka</p>
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
      