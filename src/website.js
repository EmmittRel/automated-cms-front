import React, { useState, useEffect } from "react";
import axios from "axios";

const Website = () => {
    const [content, setContent] = useState("");
    const domain = window.location.hostname; // Get the current domain

    // Fetch website content from the backend
    useEffect(() => {
        const fetchContent = async () => {
            try {
                const res = await axios.get(`http://localhost:5000/api/website/${domain}?t=${new Date().getTime()}`);
                setContent(res.data?.content || "No content available.");
            } catch (err) {
                console.error("Error fetching website content:", err);
                setContent("Error loading content.");
            }
        };

        fetchContent();
    }, [domain]); // Only re-fetch when the domain changes

    return (
        <div>
            <h1>{domain}</h1>
            <div dangerouslySetInnerHTML={{ __html: content }} />
        </div>
    );
};

export default Website;