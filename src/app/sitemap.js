export default function sitemap() {
    const routes = ["", "/work", "/about", "/service", "/contact", "/feedback"];
    return routes.map((route) => ({
        url: `https://sktech.tech${route}`,
        lastModified: new Date(),
    }));
}