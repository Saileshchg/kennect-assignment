import bodyParser from 'body-parser';
import express from 'express';
const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send('Server is healthy');
});

app.post('/calendar-ops', (req: { body: { days: number, weeks: number, date: string } }, res) => {
    const { body } = req;
    if (!body.days && !body.weeks) {
        return res.status(400).json({ message: "Please mention atleast any one from days and weeks" });
    }
    if (body.days && isNaN(body.days) || body.weeks && isNaN(body.weeks)) {
        return res.status(400).json({ message: "Days or weeks must be in number formats" });
    }
    if (body.date) {
        let isValidDate = true
        const splittedDate = req.body.date.split("-");
        if (splittedDate.length !== 3) {
            isValidDate = false;
        }
        const year = Number(splittedDate[0]);
        const month = Number(splittedDate[1]);
        const day = Number(splittedDate[2]);
        if (year < 1000 || year > 3000 || month == 0 || month > 12) {
            isValidDate = false;
        }
        const monthLength = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
        // Adjust for leap years
        if (year % 400 == 0 || (year % 100 != 0 && year % 4 == 0))
            monthLength[1] = 29;
        if (!(day > 0 && day <= monthLength[month - 1])) {
            isValidDate = false;
        }
        if (!isValidDate) {
            return res.status(400).json({ message: "Dates must be in yyyy-mm-dd format" })
        }
    }
    const date = new Date(body.date ? body.date : undefined);
    if (body.days) {
        date.setDate(date.getDate() + body.days);
    }
    if (body.weeks) {
        date.setDate(date.getDate() + (body.days * 7));
    }
    res.status(200).json({
        date: date.toLocaleString("en-US", {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        })
    });
});

app.listen(port, () => {
    return console.log(`Express is listening at http://localhost:${port}`);
});
