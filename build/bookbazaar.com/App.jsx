
        import React from "react";
        import ReactDOM from "react-dom/client";

        function Hero() {
          return <h1>Quick delivery service in dhaka.</h1>;
        }

        function Contact() {
          return (
            <>
              <p>Phone: 01911223344</p>
              <p>Address: Shop 22, New Market, Chittagong</p>
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
      