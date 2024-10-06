import React, { useState } from 'react';
import { Star } from 'lucide-react';
import Masonry from 'react-masonry-css';

interface Testimonial {
  id: string;
  name: string;
  image: string;
  text: string;
  rating: number;
  date: string;
}

const testimonials: Testimonial[] = [
  {
    id: '1',
    name: 'Emma Wilson',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=150&q=80',
    text: 'Forever Living has given our family a beautiful way to remember my grandfather. It\'s so comforting to have all his memories in one place, accessible to our entire family. The timeline feature is particularly touching.',
    rating: 5,
    date: '2023-05-15',
  },
  {
    id: '2',
    name: 'Liam Thompson',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80',
    text: 'Creating a memorial for my sister brought our family closer. Sharing stories and photos has been a healing experience for all of us.',
    rating: 5,
    date: '2023-06-02',
  },
  {
    id: '3',
    name: 'Olivia Chen',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80',
    text: 'The media gallery is fantastic. It\'s like a digital scrapbook of my mum\'s life.',
    rating: 4,
    date: '2023-07-10',
  },
  {
    id: '4',
    name: 'Noah Taylor',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
    text: 'I was hesitant at first, but Forever Living has truly helped me cope with my loss. It\'s a beautiful tribute to my wife\'s memory.',
    rating: 5,
    date: '2023-08-22',
  },
  {
    id: '5',
    name: 'Ava Nguyen',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=150&q=80',
    text: 'The collaborative aspect is wonderful. Family members from all over Australia have contributed memories I\'d never heard before.',
    rating: 5,
    date: '2023-09-05',
  },
  {
    id: '6',
    name: 'Jack O\'Connor',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80',
    text: 'Forever Living has given me a place to visit my dad every day. It\'s been incredibly comforting.',
    rating: 4,
    date: '2023-10-18',
  },
  {
    id: '7',
    name: 'Charlotte Smith',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80',
    text: 'The customer service team at Forever Living has been so supportive and understanding. They\'ve made this difficult process much easier.',
    rating: 5,
    date: '2023-11-30',
  },
  {
    id: '8',
    name: 'William Jones',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
    text: 'I appreciate how easy it is to use the platform. Even my less tech-savvy relatives have been able to contribute.',
    rating: 4,
    date: '2024-01-07',
  },
  {
    id: '9',
    name: 'Mia Anderson',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=150&q=80',
    text: 'Forever Living has helped me feel connected to my grandma even though she\'s no longer with us. It\'s like she\'s still a part of our daily lives.',
    rating: 5,
    date: '2024-02-14',
  },
  {
    id: '10',
    name: 'Ethan Brown',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80',
    text: 'The timeline feature is brilliant. It\'s helped me piece together my father\'s life story in a way I never could before.',
    rating: 5,
    date: '2024-03-22',
  },
  // Add more testimonials here...
];

const Testimonials: React.FC = () => {
  const [visibleTestimonials, setVisibleTestimonials] = useState(6);

  const loadMore = () => {
    setVisibleTestimonials(prevVisible => Math.min(prevVisible + 6, testimonials.length));
  };

  const breakpointColumnsObj = {
    default: 3,
    1100: 2,
    700: 1
  };

  return (
    <section id="testimonials" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center text-[#2a2a2a] mb-12">What Our Users Say</h2>
        <Masonry
          breakpointCols={breakpointColumnsObj}
          className="flex w-auto -ml-4"
          columnClassName="pl-4 bg-clip-padding"
        >
          {testimonials.slice(0, visibleTestimonials).map(testimonial => (
            <div
              key={testimonial.id}
              className="bg-[#2a2a2a] rounded-lg overflow-hidden shadow-lg flex flex-col mb-4"
              style={{ minHeight: `${Math.floor(Math.random() * (400 - 250 + 1)) + 250}px` }}
            >
              <div className="relative flex-shrink-0">
                <img src={testimonial.image} alt={testimonial.name} className="w-full h-48 object-cover" />
              </div>
              <div className="p-4 flex-grow flex flex-col justify-between">
                <div>
                  <h3 className="font-bold text-lg text-[#efffff] mb-2">{testimonial.name}</h3>
                  <div className="flex items-center mb-2">
                    {[...Array(5)].map((_, index) => (
                      <Star
                        key={index}
                        size={16}
                        className={index < testimonial.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}
                      />
                    ))}
                  </div>
                  <p className="text-[#efffff] text-sm">{testimonial.text}</p>
                </div>
                <p className="text-gray-400 text-xs mt-2">{testimonial.date}</p>
              </div>
            </div>
          ))}
        </Masonry>
        {visibleTestimonials < testimonials.length && (
          <div className="text-center mt-8">
            <button
              onClick={loadMore}
              className="bg-[#ff4d79] text-white px-6 py-3 rounded-full font-semibold hover:bg-opacity-90 transition-colors duration-300"
            >
              Load More
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default Testimonials;