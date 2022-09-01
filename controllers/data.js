const { google } = require("googleapis");
const { spreadsheetId } = require('../secrets');

const getData = async (req, res) => {

    try {

        //Auth Object
        const auth = new google.auth.GoogleAuth({
            keyFile: "credentials.json",
            scopes: "https://www.googleapis.com/auth/spreadsheets",
        });

        // Create client instance for auth
        const client = await auth.getClient();

        // Instance of Google Sheets API
        const googleSheets = google.sheets({ version: "v4", auth: client });

        // Read rows from spreadsheet
        //const spreadsheetId = "125cgXEQCf2GvDhs2TkloZnwEZzQRgz3nfjF8hHDkoyA";
        
        const getRows = await googleSheets.spreadsheets.values.get({
            auth,
            spreadsheetId,
            range: "Pesos!A:X",
        });

        let data = getRows.data.values;

        //Clean Data, excluding Content of the table below
        const cleanData = [];

        for(let i = 0; i < data.length; i++){
            if(data[i][0] == "FECHA" && i > 0) break;
            cleanData.push(data[i]);
        }
        
        const starter = cleanData.length - 1;
        const stopper = cleanData.length - 2;
        for(let x = starter; x > stopper; x--){
            cleanData.pop();
        }

        //Send Response
        res.render('dashboard', {data: cleanData, isAdmin: req.user.isAdmin});   

    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}

module.exports = getData;