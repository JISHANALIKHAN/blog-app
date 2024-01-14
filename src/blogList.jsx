// Import React and useState hook from 'react' package
import React, { useState } from "react";
// Import CSS file for styling
import './index.css';

// BlogList component definition
function BlogList() {
    // State variables to manage blogs and new blogs input
    const [blogs, setBlogs] = useState([
        { name: "Summer vacation", content: "In the bustling city of Mumbai, I eagerly awaited the arrival of summer vacation. As the scorching sun signaled the beginning of a two-month-long adventure filled with joy, exploration, and the unmistakable aroma of my grandmother's homemade mango pickles.\nMy summer days began with the lively chatter of street vendors and the melodious tunes of ice cream carts. Afternoons were spent in the neighborhood park, where the laughter of children echoed against the backdrop of towering coconut trees. Cricket matches with friends, the occasional ice cream treat, and impromptu storytelling sessions under the shade of the banyan tree became the essence of my carefree summer.\nBack home, my summer took a creative turn. Inspired by my Jaipur adventures, I embarked on a DIY project to recreate the forts using cardboard and paint. My room transformed into a mini Jaipur, complete with tiny elephants and miniature palaces.\nAs the summer days unfolded, I tried my hand at capturing the beauty around me through sketching, guided by the breathtaking landscapes of the Himalayas during our family trip to the serene hills of Shimla.\nWith a heart full of memories, I returned to school, eager to share my adventures and armed with a newfound appreciation for the rich tapestry of India's culture and landscapes. The summer may have ended, but the tales of my Indian summer lingered, imprinted in the pages of my childhood adventures." },
        { name: "Programming", content: "Join me, Max CodeMaster, on my enthralling coding odyssey through the expansive digital realm. As I delved deeper into the intricate landscape of programming, I unearthed the profound artistry and invigorating thrill that lay beyond mere lines of code.\nThe coding journey, a mesmerizing odyssey, revealed itself as more than just deciphering complex algorithms. It became an exploration of boundless creativity and relentless problem-solving. Late-night debugging sessions transformed into solitary battles against elusive bugs, each conquered bug bringing a profound sense of accomplishment.\nWhether you're a seasoned developer navigating the intricate web of frameworks or a curious beginner embarking on the first lines of code, come along on this immersive journey. Through insights, challenges, and triumphs, I share the intricate beauty and the fascinating complexities that make the coding odyssey an unparalleled adventure in the vast realm of technology." },
        { name: "Tour", content: "Embarking on an enchanting tour through the heart of the Indian subcontinent, I, Maya Explorer, found myself captivated by the rich tapestry of history, culture, and natural beauty.\nIn the bustling streets of Delhi, the amalgamation of ancient monuments and modern marvels painted a vivid picture of India's diverse timeline. As I strolled through vibrant markets, the aroma of spices and the kaleidoscope of traditional attire became a sensory feast.\nVenturing southward, the serene backwaters of Kerala offered a tranquil escape. The rhythmic flow of water, adorned with lush greenery, created a peaceful haven, a stark contrast to the lively energy of the city. The historic city of Jaipur unfolded its treasures, with the majestic Amer Fort standing as a testament to India's royal past. Bazaars bustled with activity, offering a glimpse into the vibrant culture that has endured through centuries.\nJoin me on this incredible exploration, where each city, each temple, and each landscape tells a captivating story. India's cultural heritage unfolds in every step, leaving an indelible mark on the soul without losing the sense of wonder and awe that each destination brings." },
    ]);
    const [newBlog, setNewBlog] = useState({ name: "", content: "" });
    const [showDialog, setShowDialog] = useState(false);
    const [selectedBlog, setSelectedBlog] = useState(null);

    // Handle input change for blog content: Update the content in the newBlog state.
    function handleInputChange(event) {
        setNewBlog({ ...newBlog, content: event.target.value });
    }

    // Show the dialog for adding a new blog.
    function addBlog() {
        setShowDialog(true);
    }

    // Cancel adding a new blog: Close the dialog and reset the newBlog state.
    function cancelAddBlog() {
        setShowDialog(false);
        setNewBlog({ name: "", content: "" });
    }

    // Add the new blog to the list if both name and content are not empty, then reset and close the dialog.
    function continueAddBlog() {
        if (newBlog.name.trim() !== "" && newBlog.content.trim() !== "") {
            setBlogs((prevBlogs) => [...prevBlogs, newBlog]);
            setNewBlog({ name: "", content: "" });
        }
        setShowDialog(false);
    }

    // Event handler to delete a blog by index
    function deleteBlog(index) {
        const updatedBlogs = blogs.filter((_, i) => i !== index);
        setBlogs(updatedBlogs);
    }

    // View a specific blog: Set the selected blog based on its name.
    function viewBlog(name) {
        const selected = blogs.find((blog) => blog.name === name);
        setSelectedBlog(selected);
    }

    // Close the currently viewed blog.
    function closeBlog() {
        setSelectedBlog(null);
    }

    // Function to get the index of the currently selected blog
    function getBlogIndex() {
        return blogs.findIndex((blog) => blog.name === selectedBlog.name);
    }

    // Function to show the previous blog in the list
    function showPreviousBlog() {
        const currentIndex = getBlogIndex();
        const previousIndex = currentIndex - 1;

        // Check if there is a previous blog
        if (previousIndex >= 0) {
            // Check if there is a previous blog
            setSelectedBlog(blogs[previousIndex]);
        }
    }

    // Function to show the next blog in the list
    function showNextBlog() {
        const currentIndex = getBlogIndex();
        const nextIndex = currentIndex + 1;

        // Check if there is a next blog
        if (nextIndex < blogs.length) {
            // Set the selected blog to the next blog
            setSelectedBlog(blogs[nextIndex]);
        }
    }

    return (
        <div className="blog-list">
            <h1>InsightfulJourney</h1>
            {/* Input for Adding a New Blog */}
            <div>
                <input
                    type="text"
                    value={newBlog.name}
                    placeholder="Enter your blog name..."
                    onChange={(event) => setNewBlog({ ...newBlog, name: event.target.value })}
                />
                <button className="add-button" onClick={addBlog}>Add</button>
            </div>
            {/* List of Blogs */}
            <ol>
                {blogs.map((blog, index) => (
                    <li key={index}>
                        <span className="text">{blog.name}</span>
                        <button className="view-button" onClick={() => viewBlog(blog.name)}>View</button>
                        <button className="delete-button" onClick={() => deleteBlog(index)}>Delete</button>
                    </li>
                ))}
            </ol>
            {/* Dialog for Adding a New Blog */}
            {showDialog && (
                <div className="dialog-overlay">
                    <div className="dialog-content">
                        <textarea
                            className="blog-textarea"
                            value={newBlog.content}
                            onChange={handleInputChange}
                            placeholder="Enter your blog content..."
                        />
                        <div className="dialog-buttons">
                            <button className="cancel-button" onClick={cancelAddBlog}>✖️</button>
                            <button className="continue-button" onClick={continueAddBlog}>➡️</button>
                        </div>
                    </div>
                </div>
            )}
            {/* Screen View for Selected Blog */}
            {selectedBlog && (
                <div className="blogscreen-overlay">
                    <div className="blogscreen-content">
                        <button className="cancel-button" onClick={closeBlog}>✖️</button>
                        <div className="button-container">
                            <button className="previous-button" onClick={showPreviousBlog}>⬅️</button>
                            <div className="blog-page-heading">Blogs</div>
                            <button className="next-button" onClick={showNextBlog}>➡️</button>
                        </div>
                        <h2 className="blog-heading">{selectedBlog.name}</h2>
                        <p className="blog-text">{selectedBlog.content}</p>
                    </div>
                </div>
            )}
        </div>
    )
}

export default BlogList;
