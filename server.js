const express = require('express');
const cors = require('cors');
const axios = require('axios');
const cheerio = require('cheerio');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// Endpoint to scrape product details from Flipkart
app.post('/scrape', async (req, res) => {
    const { productLink } = req.body;

    try {
        const { data } = await axios.get(productLink);
        const $ = cheerio.load(data);

        // Scraping logic (adjust selectors based on Flipkart's HTML structure)
        const title = $('h1 span').first().text();
        const description = $('._1mXcCf').text();
        const currentPrice = $('._30jeq3').first().text().replace('₹', '').replace(',', '');
        const reviews = $('span._2_R_DZ').text();
        
        const productData = {
            title,
            description,
            currentPrice: parseFloat(currentPrice),
            reviews,
            priceHistory: [],
        };

        res.json(productData);
    } catch (error) {
        console.error("Error scraping product details:", error);
        res.status(500).send('Error fetching product details.');
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});