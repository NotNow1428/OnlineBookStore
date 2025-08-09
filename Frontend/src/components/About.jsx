import aboutImg from '../assets/about.png'

const About = () => {
  return (
    <main className="max-w-7xl mx-auto px-6 py-16 min-h-screen">
      {/* Hero Section */}
      <section className="flex flex-col md:flex-row items-center gap-12">
        <div className="md:w-1/2">
          <h1 className="text-5xl font-extrabold text-purple-500 mb-6">
            About <span className="text-white">PustakBindu</span>
          </h1>
          <p className="text-gray-300 text-lg mb-6 leading-relaxed">
            PustakBindu is your trusted online bookstore, bringing you a vast collection of books across all genres.
            Whether you’re looking for fiction, non-fiction, academic books, or rare finds, we’ve got you covered.
          </p>
          <p className="text-gray-300 text-lg mb-6 leading-relaxed">
            Since 2024, we’ve aimed to connect readers everywhere with their next favorite book through an easy-to-use platform and
            excellent customer service.
          </p>
          <p className="text-gray-300 text-lg leading-relaxed">
            Join thousands of happy readers who discover, explore, and enjoy great books every day at PustakBindu!
          </p>
        </div>
        <div className="md:w-1/2">
          <img
            src={aboutImg}
            alt="Bookshelf and reading"
            className="rounded-lg shadow-lg object-cover w-full h-72 md:h-96"
          />
        </div>
      </section>

      {/* Features Section */}
      <section className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-10 text-center">
        {[{
          icon: (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="mx-auto mb-4 h-12 w-12 text-purple-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18h12" />
            </svg>
          ),
          title: "Wide Selection",
          description: "Thousands of books from all genres to satisfy every reader's taste."
        }, {
          icon: (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="mx-auto mb-4 h-12 w-12 text-purple-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 10h18" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 6h18" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 14h18" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 18h18" />
            </svg>
          ),
          title: "Easy Navigation",
          description: "Intuitive search and browsing for a seamless shopping experience."
        }, {
          icon: (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="mx-auto mb-4 h-12 w-12 text-purple-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          ),
          title: "Trusted Service",
          description: "Reliable delivery and responsive support to keep you happy."
        }].map(({ icon, title, description }) => (
          <div
            key={title}
            className="bg-[#1c2541] p-8 rounded-lg shadow-lg hover:shadow-purple-600 transition-shadow"
          >
            {icon}
            <h3 className="text-xl font-semibold mb-2 text-purple-400">{title}</h3>
            <p className="text-gray-300">{description}</p>
          </div>
        ))}
      </section>
    </main>
  );
};

export default About;
