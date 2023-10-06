import express from 'express';
const app = express();
import { pipeline } from "@xenova/transformers"

const PORT = process.env.PORT || 6000;

app.use(express.json());




app.get('/', async (req, res) => {
    try {
        console.log("Pipeline\n", pipeline);
        const translator = await pipeline('translation', 'Xenova/nllb-200-distilled-600M');
        // const input_data = await req.body.data;
        const translated_text = await translator("Please translate this text.", {
            src_lang: 'eng_Latn',
            tgt_lang: 'hin_Deva'
        });
        const responseData = translated_text;

        res.status(200).json({
            msg: "Translation done successfully.",
            data: responseData
        })


    } catch (error) {
        res.status(500).json({
            fullError: error.stack,
            msg: error.message,
            extra: "Functional flaw."
        })
    }

})


app.post('/', async (req, res) => {
    const input_data = await req.body.data;
    try {
        // console.log("Pipeline\n", pipeline);
        const translator = await pipeline('translation', 'Xenova/nllb-200-distilled-600M');
        const translated_text = await translator(input_data, {
            src_lang: 'eng_Latn',
            tgt_lang: 'hin_Deva'
        });
        const responseData = translated_text;

        res.status(200).json({
            msg: "Translation done successfully.",
            data: responseData
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




