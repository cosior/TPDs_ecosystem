# Figure 2: Hyperbolic map of the legal-entities network.
This folder includes the artifacts to recompute the results and reproduce figure 2 in the paper. The folder also includes the visualization tool available under the folder "./D3_plot/".

# Folders and files descriptions
1. **D3_plot:** The folder that contains the visualization tool to create Figure 2 (Hyperbolic map of the legal-entities network).
2. **metadata:** The folder that contains the required metadata to recompute the results and recreate the Figure 2.
3. **HyperMap.ipynb:** The ipython notebook to recompute the results and recreate Figure 2.
4. **README.md:** This file.
    
# Recreation of Figure 2 - Hyperbolic map
Use the following instructions to recompute the results and recreate figure 2 - **Hyperbolic map of the legal-entities network**. For each step we provide different alternative options. Feel free to skip any step since we already provide the results (inputs) required at each step.

**Step 1:** You can use the network edge-list to create the Hyperbolic embeddings of the network yourself or you can use the already create hyperbolic embeddings of the network. More details related to the two available options are provided below:

> **Option 1.1:** You can use the Edge-list available at '../Datasets/EdgeList_Legal_Entities.txt' and the Mercator (https://github.com/networkgeometry/mercator) tool to create the hyperbolic embeddings yourself (using the default options of the Mercator tool). 

> **Option 1.2:** You can use the already created hyperbolic embedding available at '../Datasets/EdgeList_Legal_Entities.inf_coord'

**Step 2:** Using the output file of the Mercator (the resulting hyperbolic embedding file available here: '../Datasets/EdgeList_Legal_Entities.inf_coord') you can then use the iPython notebook './HyperMap.ipynb' to preprocess and annotate each node of the network with the different metadata that we provide prior to the visualization step. Again, we provide two different options for this step: 

> **Option 2.1:** Follow the instructions provided as inline comments in each cell of the iPython notebook available at './HyperMap.ipynb'. The final output of the HyperMap.ipynb is available at '../Datasets/EdgeList_Legal_Entities.inf_coord.json'.  

> **Option 2.2:** You can use the already annotated output file of the iPython notebook './HyperMap.ipynb' available at '../Datasets/EdgeList_Legal_Entities.inf_coord.json'

**Step 3:** To visualize the Hyperbolic Map of the Legal-entities network you can use the code available at './D3_plot' folder. For more details please check the provided manual of the tool available at "./D3_plot/Manual.pdf".

# Additional notes
*HyperMap.ipynb:* ipython notebook requires the following python packages:
> 1. pandas - https://pypi.org/project/pandas/
> 2. networkx - https://pypi.org/project/networkx/