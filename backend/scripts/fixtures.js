const { Pool } = require('pg');
const fs = require('fs');
const csv = require('csv-parser');
const path = require('path');

console.log('Script is starting...');

// Database connection parameters
const pool = new Pool({
  user: 'db_user',
  host: 'localhost',
  database: 'postgres',
  password: 'db_password',
  port: 5555,
});

const csvFilePath = path.join(__dirname, '../full_data.csv');
const table_name = 'bedrift';

async function insertData(row) {
  const insertText = `
    INSERT INTO ${table_name} (
      organisasjonsnummer, 
      navn, 
      institusjonellsektorkode_beskrivelse, 
      antallansatte, 
      hjemmeside, 
      postadresse_adresse,
      postadresse_kommune, 
      postadresse_poststed, 
      stiftelsesdato, 
      naeringskode_beskrivelse,
      vedtektsfestetformaal
    ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
    ON CONFLICT (organisasjonsnummer) DO NOTHING
  `;

  // Convert empty strings to null
  const organisasjonsnummer = row.organisasjonsnummer === '' ? null : row.organisasjonsnummer;
  const navn = row.navn === '' ? null : row.navn.toLowerCase();
  const institusjonellsektorkode_beskrivelse = row.institusjonellsektorkode_beskrivelse === '';
  const antallansatte = row.antallAnsatte;
  const hjemmeside = row.hjemmeside;
  const postadresse_adresse = row.postadresse_adresse;
  const postadresse_kommune = row.postadresse_kommune;
  const postadresse_poststed = row.postadresse_poststed;
  const stiftelsesdato = row.stiftelsesdato === '' ? null : row.stiftelsesdato;
  const naeringskode_beskrivelse = row.naeringskode_beskrivelse;
  const vedtektsfestetformaal = row.vedtektsfestetFormaal;

  // Convert the row object to an array of values
  const values = [
    organisasjonsnummer,
    navn,
    institusjonellsektorkode_beskrivelse,
    antallansatte,
    hjemmeside,
    postadresse_adresse,
    postadresse_kommune,
    postadresse_poststed,
    stiftelsesdato,
    naeringskode_beskrivelse,
    vedtektsfestetformaal,
  ]

  const client = await pool.connect();
  try {
    await client.query(insertText, values);
  } finally {
    client.release();
  }
}

async function importCsv() {
  const promises = [];

  fs.createReadStream(csvFilePath)
    .pipe(csv())
    .on('data', (row) => {
      // Check if 'antallansatte' or 'postadresse_land' is empty and skip if so
      if (row.antallAnsatte === '' || row.postadresse_kommune === '' ||  row.postadresse_poststed === '' || row.vedtektsfestetFormaal === '' || row.postadresse_adresse === '' || row.hjemmeside === '') {
        // You can log skipped rows here if needed
      } else {
        // Only push the promise if the row is valid
        promises.push(insertData(row));
      }
    })
    .on('end', async () => {
      // Wait for all the valid insert operations to complete
      try {
        await Promise.all(promises);
        console.log('Data inserted successfully');
      } catch (error) {
        console.error('Error during inserts', error);
      } finally {
        // Close the pool after all inserts are done
        await pool.end();
      }
    });
}

importCsv().catch(console.error);