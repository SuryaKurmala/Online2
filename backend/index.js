const express = require('express');
const app = express();
const { generateFile } = require('./generateFile');
const { executeCode } = require('./executeCode'); // Generic execution function
const cors = require('cors');

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (req, res) => {
    res.json({ online: 'compiler' });
});

app.post("/run", async (req, res) => {
    const { language, code } = req.body;

    if (!language || !code) {
        return res.status(400).json({ success: false, error: "Language and code are required!" });
    }
    console.log(language, code);
    try {
        const filePath = await generateFile(language, code);
        console.log(filePath);
        const output = await executeCode(language, filePath);
        res.json({ filePath, output });
    } catch (error) {
        res.status(500).json({ error: error });
    }
});


app.listen(5000, () => {
    console.log("Server is listening on port 5000!");
});
