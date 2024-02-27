
import app from "./app.js";

const PORT = process.env.PORT || 3000;

// console.log(process.env.CLIENT_URL)

app.listen( PORT || 3000, () => {
    console.log(`Server is Running on http://localhost:${PORT}`);
})