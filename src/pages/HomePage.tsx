import React from 'react';

const HomePage: React.FC = () => {
  return (
    <div>
      <h1 className="text-4xl font-serif font-bold mb-6">Welcome to Forever Living</h1>
      <p className="mb-4">
        Forever Living is a platform dedicated to preserving and celebrating the memories of your loved ones.
        Create beautiful digital memorials to honor their legacy and share their stories with family and friends.
      </p>
      <h2 className="text-2xl font-serif font-bold mt-8 mb-4">Recent Memorials</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Placeholder for memorial cards */}
        {[1, 2, 3].map((i) => (
          <div key={i} className="bg-white shadow-md rounded-lg p-4">
            <h3 className="text-xl font-semibold mb-2">John Doe</h3>
            <p className="text-gray-600">1950 - 2023</p>
            <p className="mt-2">A loving father, husband, and friend.</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;