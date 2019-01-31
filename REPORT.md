# Report

Ad Ruigrok van der Werve

11323760

Programmeerproject

Minor Programmeren

<img src="https://github.com/adrvdw/project/blob/master/doc%20/main1.png"
     style="float: left; margin-right: 10px;" />    

### Korte beschrijving

Deze website toont informatie over cryptocurrencies. Het idee achter deze website ontstond toen cryptocurrencies (bijvoorbeeld de Bitcoin) veel aandacht kregen in de media. Investeren in cryptocurrencies is erg riskant en je kunt gemakkelijk geld verliezen. Het visualisatiedeel van deze website toont trends van de Bitcoin en andere cryptocurrencies van de afgelopen jaren. Allereerst een bubblechart gekoppeld aan een slider, die laat zien hoe marktvolumes van cryptocurrencies verschillen met de tijd. Ten tweede laat een candlestickchart zien hoe een geselecteerde cryptocurrency met de tijd groeide. Last but not least, toont een dubbele y-as een vergelijking tussen twee geselecteerde cryptocurrencies. In README.md wordt een verdere uitleg gegeven.

### Visueel ontwerp

De hoofdpagina en bijbehorende andere pagina's worden mede overzichtelijk gemaakt door de navigatie bar.  Hierdoor kan er ook gemakkelijk tussen pagina's worden gemanoeuvreerd. Het gebruik van Bootstrap speelde hierbij een belangrijke rol. De hoofdpagina (homepage.html) laat persoonlijke informatie zien en een link naar de GitHub repository. Ook wordt met behulp van een API de huidige Bitcoinprijs laten zien in Euro, Pond en Dollar. De visualisatie (visualization.html) pagina laat drie verschillende grafieken en bijbehorende componenten zien. De bubblechart gebruikt een kleurenpalet die het best paste bij het ontwerp van de site. Echter, dit kleurenpalet kan als niet goed te zien worden ervaren bij mensen die kleurenblind zijn. De bubblechart geeft het marktvolume weer als een getal, maar ook als relatieve grootte van de cirkel. Dit marktvolume hangt af van de datum die in slider wordt geselecteerd. Door middel van een tooltip kan de open, close, high en low van het desbetreffende muntje op de desbtreffende datum worden bekeken. Voor de candlestickchart geldt een duidelijk overzicht van een cryptocurrency, die kan worden geselecteerd vanuit de bubblechart of de dropdown. De kleur groen staat voor een netto prijsstijging en de kleur rood staat voor een netto prijsdaling. Deze kleuren worden over het algemeen altijd gebruikt bij zo een soort chart, en kan wederom weer als lastig gezien worden ervaren door mensen die kleurenblind zijn. De dubble y-as lijngrafiek laat zien hoe een cryptocurrency zich over de tijd verhoudt ten opzichte van een andere cryptocurrency. Deze kunnen allebei worden geselecteerd in de twee dropdowns die erboven staan. Een belangrijke rol bij deze grafiek is de kleur. De assen zijn bijvoorbeeld gekleurd om duidelijk te zien welke as bij welke lijn hoort.

### Technisch ontwerp

Het technisch design van deze site is tijdens het proces veranderd ten opzichte van het DESIGN.md bestand. Maar eerst, hoe is de functionaliteit van het technisch design geïmplementeerd in de code? De functionaliteit van de site is wanneer de gebruiker makkelijk trends van de Bitcoin en andere cryptocurrencies kan bekijken en vergelijken. Hierbij ligt de nadruk op 'makkelijk', aangezien over het algemeen vergelijkbare sites dezelfde informatie op een juist moeilijkere manier laat zien. Het weglaten van overbodige getallen en text was hierbij een belangrijk onderdeel, en alleen de meest relevante getallen worden laten zien.

##### CSV, JSON

In deze repository staan twee data bestanden: data.csv en data.json. Data.csv was verkregen via: https://www.kaggle.com/jessevent/all-crypto-currencies#crypto-markets.csv. Data.csv is door middel van een converter (CSV2JSON.py) omgezet in data.json. Het datatype wat over alle javascript bestanden leidend is, is een dictionary. Deze dictionary heet: symbol_dict, en bevat alle informatie die nodig is voor de visualisaties.

##### HTML

Dit project kent 5 HTML bestanden, één voor elke pagina.  De visualisatie (visualization.html) laat alle visualisaties zien die het probleem van dit project kunnen oplossen. De project pagina (project.html) laat zien wat het probleem van dit project is en waartoe de visualisaties oplossing geven. De about pagina (about.html) laat persoonlijke informatie zien, gebruikte API, libraries en een link naar de GitHub repository. Alle .html pagina's zijn verbonden via de navigatie bar, en hebben hierbij ook dezelfde naam gekregen. De plaatsing en het gebruik van de navigatie bar is mogelijk gemaakt door Bootstrap.

<img src="https://github.com/adrvdw/project/blob/master/doc%20/about.png"
    style="float: left; margin-right: 10px;" />

<img src="https://github.com/adrvdw/project/blob/master/doc%20/project.png"
    style="float: left; margin-right: 10px;" />  

De visualisatie (visualization.html) bevat ook 3 verschillende dropdown menu's en een slider. Deze zijn allemaal interactief met de direct onderstaande grafiek.  

##### CSS

Dit project kent 6 CSS bestanden, gebruikt voor de opmaak van de webpagina's. Deze CSS bestanden zijn bijvoorbeeld gebruikt voor de jumbotron en de plaatsing, grootte en lettertype van de tekst op de webpagina's. Ook is CSS gebruikt voor de stijl van die navigatie bar. Het CSS bestand van de candlestickchart geeft de candlesticks de juiste kleur.

##### Javascript

Dit project kent 8 .js bestanden. Alle .js bestanden worden via functies over het algemeen aangeroepe in het hoofdbestand (main.js). Niet alle functies worden hierin aangeroepen, want binnen andere .js bestanden worden ook functies aangeroepen.

- main.js: Nadat converteerder (CSV2JSON1.py) een JSON bestand heeft gemaakt, zal dit JSON bestand worden omgezet in een dictionary (symbol_dict) met daarin lijsten (symbol, name, etc.). Deze dictionary wordt dus binnen main.js aangemaakt en uiteindelijk ook meegegeven aan drawBubbleChart, drawSlider, drawCandlestickChart, makeDropdownCandlestick en drawLinechartChart. Bovengenoemde functies worden aangeroepen indien de site in zijn geheel wordt bekeken.  

- bubblechart.js: Een initiele diameter (diameter) wordt gesteld die uiteindelijk zal worden gebruikt voor de cirkels in de grafiek. Deze cirkels krijgen als variabelen datum en marktvolume mee. Het marktvolume hangt op zijn beurt weer af van de datum die wordt geselecteerd in de slider. Deze bubblechart wordt niet geleidelijk geupdate, dit komt omdat de database al zo groot is, dat dit bijna geen visueel verschil zal maken. Een tooltip met benodigde informatie wordt laten zien indien er over de cirkels wordt bewogen. Als er op een cirkel wordt geklikt wordt de candlestick grafiek en de bijbehorende dropdown aangepast.

- candlestick.js: Leidend in deze grafiek was het gebruik van het juiste tijd format. Deze moest namelijk kloppend zijn met de schaling van de x-as, en zag eruit als: YYYY-MM-DDTXX00:00:000Y. De y-as van de candlestick grafiek laat de waarde van de geselecteerde cryptocurrency zien, en de x-as laat de datum zien. Deze worden automatisch geschaald indien er wordt ingezoomd of uitgezoomd. In- en uitzoomen gebeurd door middel van twee vingers naar je toe of van je af bewegen op een trackpad. Daarnaast geeft de kleur van de 'candle' en 'stem' aan of de prijs netto is gestegen (groen) of gedaald (rood). Tot slot is er een tooltip die meer gedetaileerde informatie laat zien, indien er met de muis over een 'stem' of 'candle' wordt bewogen. Ook voor de candlestickchart geldt dat een geleidelijke update niet veel zou veranderen ten opzichte van de manier hoe het nu wordt gedaan.

- linechart.js: Voor deze chart worden 2 verschillende lijsten aangemaakt die uiteindelijk door de rode of blauwe lijn worden weergegeven. Door middel van een of twee verschillende selecties in de bovenstaande dropdowns wordt de lijngrafiek automatisch aangepast. Voor de duidelijk zijn allebei de y-assen dezelfde kleur als de bijbehorende lijn. De tooltip over de twee verschillende lijnen wordt weergegeven met een cirkel en een getal ernaast, indien de twee verschillende lijnen over dezelde data staan. Er wordt dus maar 1 cirkel laten zien indien er met de muis overheen wordt bewogen en de datum van een cryptocurrency eerder begon dan die van de andere cryptocurrency. De x-as van de lijngrafiek wordt aanpast aan de cryptocurrency die het eerst begon. Indien een cryptocurrency later dan de andere cryptocurrency begon wordt er geen lijn weergegeven. Tot slot staat er aan de rechterkant van de lijngrafiek de huidige Bitcoinprijs ter informatie.

<img src="https://github.com/adrvdw/project/blob/master/doc%20/visualisation1.png"
     style="float: left; margin-right: 10px;" />  
<img src="https://github.com/adrvdw/project/blob/master/doc%20/visualisation2.png"
    style="float: left; margin-right: 10px;" />

- De overige javascript bestanden (slider.js, currentPrice.js, d3-tip.js, makeDropdownCandlestick.js) zijn ter ondersteunig van bovenstaande .js bestanden.

##### Libraries

- D3
- D3 Tip Library
- jQuery
- Bootstrap
- API

### Uitdagingen

De grootste uitdaging voor mij tijdens dit project was het linken van de grafieken. Het was mij nog onduidelijk hoe dit werd gedaan, tot de eerste keer dat het was gelukt. Het aanroepen en de juist data meegeven aan functies speelde een sleutelrol in het snappen van het linken van grafieken. Daarnaast begon ik ook letterlijk met alles als een kip zonder kop, van welk dataformat ik moest gebruiken tot design van code en de site. Tot slot was het gebruik en de combinatie van CSS, HTML en JavaScript tot onlangs vaag en onsamenhanged.

### Changes

Het grote verschil met DESIGN.md is dat er een bubblechart, met componenten, is gekomen in plaats van een barchart. Een barchart liet toch te weinig informatie zien, en de informatie die werd laten zien was niet van enige waarde voor de oplossing van het probleem van het project. Het hoofdbestand (main.js) werd later toegevoegd, aangezien ik erachter kwam dat er dan maar 1 window.onload functie nodig was. Hiervoor had ik in elk JavaScript bestand een window.onload functie, die niet samenging met de functionaliteit van main.js. Een betere zoom functie dan de huidige was wel beschreven in DESIGN.md, en is nu niet geïmplementeerd in de candlestickchart.

### Keuzes

De huidige pagina is duidelijker dan de pagina die zou zijn ontstaan uit DESIGN.md. De uiteindelijke oplossing tot het in dit project gestelde probleem is de weergave van bepaalde trends. De weergave van trends is op de huidige site geslaagd, vanwege de duidelijke en samenhangende grafieken. Tot slot, mijn hele site crashte toen ik alle bestanden wilde ordenen in mappen, dus daar zou ik ook eerder mee zijn begonnen. Ordenen in mappen heb ik dus bij mijn ingeleverde versie niet gedaan. 

### Reflectie

Uiteindelijk zijn mijn ideeën in DESIGN.md niet helemaal overeengekomen met het uiteindelijke resultaat, en maar beter ook. Het resultaat, zoals de site nu is, sluit veel beter aan aan mijn gedachten om het probleem zo goed mogelijk weer te geven. Ik heb geleerd hoe belangrijk het is om een goede proposal te schrijven, om uiteindelijk niet meer tegen onnodige problemen te lopen.
