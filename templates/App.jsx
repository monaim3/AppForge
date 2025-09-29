import Hero from "./Hero";
import Contact from "./Contact";

export default function App({ phone, address }) {
  return (
    <div>
      <Hero />
      <Contact phone={phone} address={address} />
    </div>
  );
}
