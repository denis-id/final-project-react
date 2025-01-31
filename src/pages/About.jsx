import Hero from "../components/Hero";

export default function About() {
  return (
    <div>
      <Hero
        title="About Us"
        description="Welcome to APPAREL, your premier destination for contemporary fashion. Established in 2024, we've been dedicated to providing"
        image={
          "https://img.freepik.com/free-photo/group-business-workers-listening-boss-conference-meeting-office_839833-22630.jpg?t=st=1737963581~exp=1737967181~hmac=894a64dbd04ced746a2b52f72b7c5d176252535b92efb4d2c107558d89e20ab9&w=1800"
        }
      />
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-4xl font-bold mb-6">About Us</h1>
            <p className="text-gray-600 mb-4">
              Welcome to APPAREL, your premier destination for contemporary
              fashion. Established in 2024, we've been dedicated to providing
              high-quality clothing that combines style, comfort, and
              sustainability.
            </p>
            <p className="text-gray-600 mb-4">
              Our mission is to make fashion accessible while maintaining the
              highest standards of quality and ethical production. Each piece in
              our collection is carefully curated to ensure it meets our
              exacting standards.
            </p>
            <p className="text-gray-600">
              We believe in sustainable fashion and work closely with
              manufacturers who share our values of ethical production and
              environmental responsibility.
            </p>
          </div>
          <div>
            <img
              src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800"
              alt="Store interior"
              className="rounded-lg shadow-lg"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
