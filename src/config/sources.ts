export const sources = {
    newsApi: {
        endpoints: {
            majorFeed: {
                url: `https://newsapi.org/v2/everything?q=volcan OR séisme OR éruption OR ouragan OR inondation OR guerre OR conflit OR attaque OR bombardement OR frappe OR procès OR condamnation OR explosion OR nouveau OR attentat OR effondrement OR accident OR évacuation OR catastrophe OR changement&sortBy=publishedAt&pageSize=100&apiKey=${process.env.NEWS_API_APIKEY}`
            }
        }
    }
}