const emissionTotals = {}

fetch('./data.json')
  .then(response => response.json())
  .then(jsonData => {
    // Calculate total carbon emission for each company
    for (let i = 0; i < jsonData.length; i++) {
      const company = jsonData[i].Company;
      const emission = parseFloat(jsonData[i]['Total carbon emmission '].replace(',', '.'))
      if (emissionTotals[company]) {
        emissionTotals[company] += emission;
      } else {
        emissionTotals[company] = emission;
      }
    }

    // Separate emissionTotals into companyNames and emissionTotals arrays
    const companyNames = Object.keys(emissionTotals);
    const emissionArray = Object.values(emissionTotals);

    // Print the company names and their total carbon emission
    console.log('Company Names:', companyNames);
    console.log('Emission Array:', emissionArray);

    const ctx = document.getElementById('barChart').getContext('2d');
    const barChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: companyNames,
            datasets: [{
                label: 'Data',
                data: emissionArray,
                backgroundColor: 'rgba(75, 192, 192, 0.8)', // Customize the bar color
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });

  })
  .catch(error => {
    console.error('Error reading the JSON file:', error);
  });


