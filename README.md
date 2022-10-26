# Topology and Geometry of the Third-Party Domains Ecosystem: Measurement and Applications - Artifacts Repository
This repository holds the artifacts of the paper with the title *Topology and Geometry of the Third-Party Domains Ecosystem: Measurement and Applications*. You can use this repository to recompute all the results depicted in the paper. The different tools described in the paper along side the raw data are also available. 

If you use any of our tools and datasets, please cite our paper. 

# General instructions
- For each figure (and tools) in the paper you can navigate to the appropriate folder in order to recompute the results and reproduce it. To do so, please follow the instructions provided in the README.md file available in each folder.

- We also provide a .csv file with the raw data (__raw_data.csv__) used in the paper. The raw dataset includes additional information (not used in the paper) in order to allow more complex analysis of the data beyond the level of analysis already done in our study. In more details the raw data include the following information:
    > 1. **Timestamp:** the UNIX timestamp that each TPD interaction was collected.
    > 2. **FirstPartyDomain:**  the URL of the visiting (first-party) domain from where each interaction between two TPDses has been triggered.
    > 3. **Country:** the country from where our browser extension tracked each  interaction between two TPDses.
    > 4. **ReferrerDomain:** the TPDs that initiated each observed HTTP request.
    > 5. **RequestedDomain:** the URL that each observed HTTP request is directed to. 
    > 6. **RequestType:** the resource type of each HTTP request. Possible values: [ csp_report | font | image | media | object | other | ping | script | stylesheet | sub_frame | xmlhttprequest ] 
    > 7. **ServerIP:** the IP address of the server that responded to the HTTP request.


# Files and folders description
1. **Crunchbase_crawler:** A folder that holds the crunchbase crawler that we developed and used to map the TLD+1 domains to their corresponding legal entity according to crunchbase website and identify their future merging.
2. **Datasets:** Folder that contains tha edge-lists and the hyperbolic embeddings of the two networks (Legal-entities and TLD+1).
3. **Figure3:** *(Hyperbolic map of the legal-entities network.)* The folder includes all necessary files and instructions on how to recompute the results and reproduce figure 2 of the paper.
4. **Figure4:** *( Grouping probabilities...)* The folder includes all necessary files and instructions on how to recompute the results and reproduce figures 3 in the paper.
5. **Figure5:** *(Complimentarities (Comp.) Vs. Similarities... )* The folder includes all necessary files and instructions on how to recompute the results and reproduce figure 4 in the paper.
6. **Figure6:** *(Co-hosting probability...)* The folder includes all necessary files and instructions on how to recompute the results and reproduce figure 5 in the paper.
7. **Figure7:** *(Distribution of interaction path...)* The folder includes all necessary files and instructions on how to recompute the results and reproduce figure 6 in the paper.
8. **Figure8_9:** *(Appendix figures)* The folder includes all necessary files and instructions on how to recompute the results and reproduce figure 8 and 9 in the appendix of the paper.
9. **FQDN_Map.json:** A json file that holds the mapping between the Fully Qualified Domain Names (FQDN) that we observe in our dataset and their corresponding TLD+1 domain that they belong.
10. **raw_data.zip:** The raw data that we use in the paper. The provided .zip file needs to be extracted to generate the "raw_data.csv" file. The extracted .csv file needs to be places in the root folder of the repository.
11. **raw_data_loader.ipynb:** A sample jupyter ipython notebook that loads and describes the raw data of the paper.
12. **README.md:** This file.

# Additional notes
1. To recompute the results and recreate the paper figures from scratch you can start from the folder of Figure 2 up to the folder of Folder 6 in increasing order. Note that we already include the results for each individual figure (including any necessary intermediate results) if you choose to partially reproduce any of them individually and out of order. 
2. For more details please check the inline comments provided within the source code of each figure and tool.
3. With respect to the raw_data.csv file, we also provide examples on how to load and use it. The examples are available in "raw_data_loader.ipynb" ipython notebook file.
4. To run the ipython notebooks provided in the repository you need to install python3 (https://www.python.org/), the Jupyter Notebook (https://jupyter.org/install) and python pandas (https://pypi.org/project/pandas/)
5. For additional libraries and packages requirements of the different ipython notebooks see the individual README.md files in each folder.
