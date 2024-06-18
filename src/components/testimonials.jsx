import { useState, useEffect } from "react";
import axios from "axios";
import "../assets/css/testimonials.css";

const Testimonials = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await axios.get("https://jsonplaceholder.typicode.com/posts");
      if (response.data) {
        const postsData = response.data.slice(0, 25); // Adjusted to limit to 25 posts for demonstration
        const postsWithRatings = postsData.map((post) => ({
         ...post,
          rating: Math.floor(Math.random() * 5) + 1, // Generating random rating (1-5)
        }));
        setPosts(postsWithRatings);
      }
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  return (
    <div className="testimonials-container" style={{marginTop : "80px"}}>
      <div className="about-dealership">
        <h2>About Our Dealership</h2>
        <h3>
          ABC Car Dealership: Your Trusted Partner on the Road to Success
        </h3>
        <p>
          Welcome to ABC Car Dealership, where we believe every journey begins
          with the right vehicle. Since our inception, we&apos;ve been dedicated to
          providing exceptional automotive solutions tailored to meet the
          evolving needs of our valued customers. Nestled in the heart of
          Nairobi, our dealership stands as a testament to over 20 years of
          unwavering commitment to excellence and innovation.
        </p>
        <h3>Our Story</h3>
        <p>
          ABC Car Dealership was founded on the principle that every car buyer
          deserves a seamless, enjoyable experience. From our humble beginnings,
          we&apos;ve grown into a leading authority in the automotive industry,
          offering a wide array of vehicles that cater to every lifestyle and
          budget. Our journey has been marked by milestones of growth,
          innovation, and dedication to our community.
        </p>
      </div>

      <div className="testimonials">
        <h2>Customer Feedback</h2>
        <div className="testimonials-grid">
          {posts.length === 0? (
            <p>Loading testimonials...</p>
          ) : (
            posts.map((post) => (
              <div key={post.id} className="testimonial-card">
                <h3>{post.title.charAt(0).toUpperCase() + post.title.slice(1)}</h3>
                <p>{post.body.charAt(0).toUpperCase() + post.body.slice(1)}</p>
                <div className="rating">Rating: {post.rating} / 5</div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
