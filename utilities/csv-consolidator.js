#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Function to consolidate CSV contents
function consolidateCSV(csvFiles) {
  // Create an object to store item quantities
  const itemQuantities = {};

  // Function to add quantities to the itemQuantities object
  const processLine = (line) => {
    const [item, quantity] = line.trim().split(',').map(part => part.trim());
    const numQuantity = parseInt(quantity, 10);
    
    if (isNaN(numQuantity)) return; // Skip lines that don't have a valid number
    
    if (itemQuantities[item]) {
      itemQuantities[item] += numQuantity;
    } else {
      itemQuantities[item] = numQuantity;
    }
  };

  // Read and process each CSV file
  csvFiles.forEach(file => {
    try {
      const content = fs.readFileSync(file, 'utf8');
      content.split('\n').forEach(line => {
        if (line.trim() && line.includes(',')) {
          processLine(line);
        }
      });
    } catch (error) {
      console.error(`Error reading file ${file}: ${error.message}`);
      process.exit(1);
    }
  });

  // Sort the items alphabetically
  const sortedItems = Object.keys(itemQuantities).sort();

  // Create the final output
  const consolidatedList = [
    'Item,Quantity', // CSV header
    ...sortedItems.map(item => `${item},${itemQuantities[item]}`)
  ];
  
  return consolidatedList;
}

// Check if files are provided
if (process.argv.length < 3) {
  console.error('Usage: node csv-consolidator.js <csv1> <csv2> ... <csvN>');
  process.exit(1);
}

// Get input CSV files from command line arguments
const inputFiles = process.argv.slice(2);

// Validate that all files exist
inputFiles.forEach(file => {
  if (!fs.existsSync(file)) {
    console.error(`File not found: ${file}`);
    process.exit(1);
  }
});

// Consolidate CSVs
const consolidatedList = consolidateCSV(inputFiles);

// Write to output.csv
try {
  fs.writeFileSync('output.csv', consolidatedList.join('\n'));
  console.log('Consolidated CSV saved to output.csv');
} catch (error) {
  console.error(`Error writing output file: ${error.message}`);
  process.exit(1);
}