import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import BookCard from "../books/BookCard";

export default function SearchResults() {
    const location = useLocation();
    const query = new URLSearchParams(location.search).get("q");
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!query) return;
        setLoading(true);

        fetch(`http://localhost:5000/api/books/search?query=${encodeURIComponent(query)}`)
            .then((res) => res.json())
            .then((data) => {
                setBooks(data);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, [query]);

    if (loading) return <p className="text-center mt-10">Loading...</p>;

    return (
        <div className="max-w-screen-xl mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Search Results for "{query}"</h1>
            {books.length === 0 ? (
                <p>No books found.</p>
            ) : (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    {books.map((book) => (
                        <BookCard key={book._id} book={book} />
                    ))}
                </div>
            )}
        </div>
    );
}
