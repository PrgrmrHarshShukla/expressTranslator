import express from 'express';
const app = express();
import { pipeline } from "@xenova/transformers"

const PORT = process.env.PORT || 6000;

app.use(express.json());


app.post('/', async (req, res) => {
    const input_data = await req.body.data;
    try {
        // console.log("Pipeline\n", pipeline);
        const translator = await pipeline('translation', 'Xenova/nllb-200-distilled-600M');
        const translated_text = await translator(input_data, {
            src_lang: 'eng_Latn',
            tgt_lang: 'hin_Deva'
        });

        res.status(200).json({
            msg: "Translation done successfully.",
            data: translated_text[0].translation_text
        })


    } catch (error) {
        res.status(500).json({
            fullError: error.stack,
            msg: error.message,
            extra: "Functional flaw."
        })
    }

})




app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}... `);
})




