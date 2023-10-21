import results from "./test.js";
// HTML: <svg id="barChart"></svg>

const data = [
    { month: 'January', sales: 120 },
    { month: 'February', sales: 150 },
    { month: 'March', sales: 180 },
    { month: 'April', sales: 200 },
    { month: 'May', sales: 220 },
    { month: 'June', sales: 250 }
  ];
  
  const svg = d3.select('#barChart');
  const width = +svg.attr('width');
  const height = +svg.attr('height');
  
  const x = d3.scaleBand()
    .domain(data.map(d => d.month))
    .range([0, width])
    .padding(0.2);
  
  const y = d3.scaleLinear()
    .domain([0, d3.max(data, d => d.sales)])
    .range([height, 0]);
  
  const g = svg.append('g')
    .attr('transform', 'translate(40, 10)');
  
  g.selectAll('rect')
    .data(data)
    .enter().append('rect')
    .attr('x', d => x(d.month))
    .attr('y', d => y(d.sales))
    .attr('width', x.bandwidth())
    .attr('height', d => height - y(d.sales))
    .attr('fill', 'steelblue');
  