const puppeteer = require("puppeteer");
const Product = require("../models/Product");

const scrapeProducts = async () => {
  try {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();

    // to mimic real browser
    await page.setUserAgent(
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36"
    );

    await page.goto("https://www.flipkart.com/search?q=smartphone", {
      waitUntil: "domcontentloaded",
    });

    const products = await page.evaluate(() => {
      let items = [];
// selecting elements to gather data
      document.querySelectorAll("div.cPHDOP").forEach((item) => {
        const name = item.querySelector("div.KzDlHZ")?.innerText;
        const price = item.querySelector("div.Nx9bqj")?.innerText;
        const description = item.querySelector("ul.G4BRas")?.innerText;
        const rating = item.querySelector("div.XQDdHH")?.innerText;

        if (name && price) {
            items.push({
              name,
              price: price.replace(/[^0-9.]/g, ""),
              description: description || "N/A",
              ratings: rating || "N/A",
            });
          }
      });
      console.log("data", items)
      return items;
    });

    await browser.close();

    // saving data to db
    const operations = products.map((product) =>
      Product.findOneAndUpdate(
        { productName: product.name },
        { ...product, updatedAt: new Date() },
        { upsert: true }
      )
    );

    await Promise.all(operations);

    console.log("Data saved to MongoDB");
  } catch (error) {
    console.error("Error during scraping:", error);
  }
};

// Schedule the scraper to run every hour
setInterval(scrapeProducts, 3600000);

module.exports = scrapeProducts;
