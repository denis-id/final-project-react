import Hero from "../components/Hero";

export default function About() {
  return (
    <div>
      {/** Complete props hero */}
      <Hero />
      <div className="max-w-7xl mx-auto px-4 py-16">{/** About Content */}</div>
    </div>
  );
}
