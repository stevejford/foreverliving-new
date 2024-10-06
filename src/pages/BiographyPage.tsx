import React, { useState } from 'react';
import { ArrowLeft, ChevronUp } from 'lucide-react';
import { Link } from 'react-router-dom';

const BiographyPage: React.FC = () => {
  const [showScrollTop, setShowScrollTop] = useState(false);

  const handleScroll = (event: React.UIEvent<HTMLDivElement>) => {
    const { scrollTop } = event.currentTarget;
    setShowScrollTop(scrollTop > 300);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="flex flex-col min-h-screen bg-warm-beige text-dark-text">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 bg-warm-beige shadow-md z-10">
        <div className="container mx-auto px-4 py-3 flex items-center">
          <Link to="/" className="text-primary">
            <ArrowLeft size={24} />
          </Link>
          <h1 className="text-xl font-serif font-medium text-center flex-grow">Biography</h1>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-grow mt-16 mb-16" onScroll={handleScroll}>
        <div className="container mx-auto px-4 py-6">
          {/* Profile section */}
          <div className="text-center mb-8">
            <img
              src="https://example.com/profile-image.jpg"
              alt="John Doe"
              className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
            />
            <h2 className="text-2xl font-serif font-bold mb-2">John Doe</h2>
            <p className="text-sm text-gray-600">1950 - 2023</p>
          </div>

          {/* Biography content */}
          <div className="prose prose-sm sm:prose lg:prose-lg mx-auto">
            <h3>Early Life</h3>
            <p>
              John Doe was born on a sunny day in 1950 in the small town of Millbrook. From an early age,
              he showed a keen interest in the world around him, often spending hours exploring the nearby woods
              and streams. His parents, Mary and Robert Doe, nurtured his curiosity and encouraged his love for nature.
            </p>

            <h3>Education and Career</h3>
            <p>
              After graduating from Millbrook High School in 1968, John pursued his passion for environmental science
              at State University. He graduated with honors in 1972 and immediately began working for the local
              conservation department. Over the next four decades, John dedicated his life to preserving the natural
              beauty of his home state, rising to the position of Chief Environmental Officer before his retirement in 2015.
            </p>

            <h3>Family Life</h3>
            <p>
              In 1975, John married his college sweetheart, Sarah Thompson. Together, they raised two children,
              Emily and Michael, instilling in them the same love for nature that John had cultivated throughout his life.
              The family spent many weekends camping, hiking, and participating in local conservation efforts.
            </p>

            <h3>Legacy</h3>
            <p>
              John Doe's impact on his community and the environment will be felt for generations to come. He was
              instrumental in establishing the Millbrook Nature Preserve, a 500-acre sanctuary that protects local
              wildlife and provides educational opportunities for schools and families. His dedication to conservation
              earned him numerous accolades, including the State Environmental Protection Award in 2010.
            </p>

            <p>
              Beyond his professional achievements, John will be remembered as a loving husband, father, and grandfather.
              His kindness, wisdom, and unwavering commitment to making the world a better place touched the lives of
              all who knew him. John's legacy lives on through his family, his work, and the countless individuals he
              inspired to become stewards of the environment.
            </p>
          </div>
        </div>
      </main>

      {/* Bottom navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-warm-beige shadow-md">
        <div className="container mx-auto px-4 py-3 flex justify-around">
          <Link to="/" className="text-primary">Home</Link>
          <Link to="/timeline" className="text-primary">Timeline</Link>
          <Link to="/media" className="text-primary">Media</Link>
          <Link to="/tributes" className="text-primary">Tributes</Link>
          <Link to="/stories" className="text-primary">Stories</Link>
        </div>
      </nav>

      {/* Scroll to top button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-20 right-4 bg-primary text-white p-2 rounded-full shadow-lg"
        >
          <ChevronUp size={24} />
        </button>
      )}
    </div>
  );
};

export default BiographyPage;