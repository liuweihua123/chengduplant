# Chengdu Plant Database Frontend

Static frontend for the Chengdu plant database.

## Configure backend API

Edit `public/js/config.js` and replace the fallback value with the deployed backend URL:

```js
const BaseUrl = window.CHENGDU_API_BASE_URL || localStorage.getItem("CHENGDU_API_BASE_URL") || "https://your-backend-domain";
```

For a custom domain, a common setup is:

```txt
www.your-domain.com -> this frontend
api.your-domain.com -> Spring Boot backend
```
