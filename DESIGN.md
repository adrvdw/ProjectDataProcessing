# Design

Ad Ruigrok van der Werve

11323760

Programmeerproject

Minor Programmeren

## Data

The external data source that will be used during this project is from: https://www.kaggle.com/jessevent/all-crypto-currencies

This .csv file will be transformed to a .json file with a common converter, named CSV2JSON.py. This file will pick: 'symbol', 'name', 'date', 'open', 'high', 'low', 'close' and 'volume'. This data is then presented in a dictionary, but without a key. This was done because not one value in data.csv is unique.

## Components

Visualisations will be implemented in different files:

- The candlestick chart
- The bar chart
- The line chart

All charts will be seperate .js files, and called in main.js

Besides, every chart and the homepage will have its own .css file, and will be called in the main HTML function.

In the candlestick chart there will be a dropdown menu, where one currency can be selected. The chart will then automatically be adjusted to the selected currency. Some sort of zoom function will also be implemented, but how is yet unknown. A mouseover will show the information (price, high, low, close, open) of that day.

The bar chart and line chart will be two linked views. In the bar chart, two currencies and the date can be selected. When that is selected, the line chart will automatically be updated. The line chart containes two y-axes, one on the left and one on the right, showing different prices for the two different currencies. The x-axis shows the date.

## API, D3 plugins

- D3
- D3 Tip
- jQuery
- Bootstrap
