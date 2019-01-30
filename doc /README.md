# Bitcoin dependencies  

### Ad Ruigrok van der Werve
### 11323760
### https://github.com/adrvdw/project
### 2018/2019

## Paragraph summary
- Problem statement
- Solution
- Data source
- External components
- Similar visualization
- Hardest parts

### Problem statement
The Bitcoin is the most known and the world’s largest cryptocurrency. Cryptocurrency is a relatively new and revolutionary type of currency. The Bitcoin, and other cryptocurrencies too, were designed as a unit of exchange and as a unit to store assets without the reliability of a central bank. Every cryptocurrency must be redeemed for Bitcoins, which can then be redeemed for USD. The price of cryptocurrencies can thus be dependent on the price of the Bitcoin. This project will show for some cryptocurrencies, how the price of them were influenced by the price of the Bitcoin. The audience of this project will mainly be potential buyers of the Bitcoin.

### Solution

The solution will be a clear visualization of the price of the Bitcoin compared to other cryptocurrencies.

Homepage: Some wallpaper and with information about who made the website.

Dashboard: The site shows the current Bitcoin price, and maybe the user can also see the current price of other cryptocurrencies. Showing the price is optional, and will probably be implemented when the rest of the site is finished. The site shows at least some charts of the price of the cryptocurrencies over time, and how they are compared to the price of the Bitcoin. Which charts are useful are yet unknown, but the goal is to have at least 3 different kind of charts, showing the same data. The user can zoom in on a part of the chart, by selecting with the cursor or insert the from and to date in a separate box.

Update

The three charts that will be used are: candlestick chart, multiple axes and barcharts.


### Data source

https://www.kaggle.com/jessevent/all-crypto-currencies

### External components

- Bootstrap
- D3-tip
- D3
- API

### Similar visualization

The site that I will use to gain inspiration is https://international.bittrex.com. On this site you can select any cryptocurrency and also on which market. For example, USD to Bitcoin, or Ethereum to Bitcoin. On this site you can choose which period to inspect, which I also want to implement on my site. They have implemented that on a way by just zooming in in the chart, and then the date will automatically change. I think I will not be able to do it in the same way, because it requires too much knowledge, which I yet don’t have. However, it find it less clear than the way I would like to do it, so that part of their site is not really of my interest.

### Hardest parts

The hardest part will probably be how the data is visualized, and what the axes of the graphs are. The most difficult question is how are the prices of the Bitcoin compared to the price of any other cryptocurrency. The expression of the price of the Bitcoin in any other price of any cryptocurrency will also be a major obstacle. Also, it would be a great, but difficult achievement, if the site is able to update itself every day with every new Bitcoin price. Or maybe a least show some current cryptocurrenct news or the current prices.
