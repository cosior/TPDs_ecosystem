# The crunchbase crawler
This folder includes all necessary files to help you extract company information from the crunchbase website (https://www.crunchbase.com/). Note that you need to monitor the crawling phase in order to make sure that the crawling process is not blocked by the website. Use this tool **ONLY** for a small amount of companies that are absolutely necessary for your study to avoid overloading the crunchbase servers. For a large number of companies please consider the different pricing plans of the website available here: https://www.crunchbase.com/buy/select-product

# Files description
* **cb_crawler.js:** A JavaScript file with the source code of the crawler. 
* **parse_html.py:** A python file with the source code of the HTML parser that extract the different feature values for each crawled company profile (.html files).
* **crunchbase_names.json:** A python list that holds all company names that we need to extract information from the crunchbase website.
* **README.md:** This file.

# Instructions
* **Step 1 - Map domains to the corresponding company names as defined by crunchbase:** This step includes the manual mapping of a domain to the corresponding company name that the crunchbase website is using. You can save all company names that you are interested in  the following file "crunchbase_names_ALL.json". Note that currently the file includes the company names that we use in our work. 

* **Step 2 - Crunchbase crawler:** The second step includes the utilization of the "cb_crawler.js" file. 
    > In order to do so you need to install node.js following the instructions available here: https://nodejs.org/

    >Next you also need to install puppeteer package available here: https://www.npmjs.com/package/puppeteer

    >To avoid bot detection you also need to install the following package available here: https://github.com/berstend/puppeteer-extra/tree/master/packages/puppeteer-extra-plugin-stealth

    Finally, you can start the crawler by executing the following command: 
    ```bash
    node cb_crawler.js
    ``` 
    All collected data are stored under the folder "Raw_Websites" as a single .html file for each company. The .html file name is the name of the corresponded crawled company.

* **Step 3 - Extract company information from the raw .html files:** This step requires the "parse_html.py" file.
    
    > You will need to install python3 available here: https://www.python.org/

    You will also need the following python3 packages: 
    > * BeautifulSoup - https://pypi.org/project/beautifulsoup4/
    > * pandas - https://pypi.org/project/pandas/

    Finally, you can process the raw .html files located under the "Raw_Websites" folder by executing the following command: 
    ```bash
    python3 parse_html.py
    ``` 

    The final output is available in the .csv file named "CB_RES.csv".