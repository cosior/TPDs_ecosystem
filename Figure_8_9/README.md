# (1) Figure 8. Properties of the TLD+1 network (same as Figure2) and the different TLD+1 networks of each individual continent.
# (2) Figure 9: The percentages of overlapping nodes and links among the continents' TLD+1 networks. 
This folder includes the artifacts to recompute the results and reproduce figures 8 and 9 (partially figure 2) in the paper.

# Folders and files descriptions
1. **Countries-Continents.csv:** A CSV file that contains the mapping between different countries and the continent that they belong.
2. **P_k_binned.f:** A fortran tool for logarithmic binning.
3. **Top5Continents.ipynb:** The ipython notebook to recompute the results and recreate the above figures.
4. **README.md:** This file.
    
# Recreation of Figure 8 and 9
Please see inline comments in **Top5Continents.ipynb** iPython notebook.

# Result files
The output of the **Top5Continents.ipynb** iPython notebook cun be found in the following 2 folders:

*  **TMP_FOLDER:** Hold all intermediary results of figure 8.
*  **PLOTS:** Holds all the sub-figures of Figure 8 and the Figure 9.
   *  **ContinentDegreeDistribution.pdf:** The Figure 8(a)
   *  **ContinentAverageClustering.pdf:** The Figure 8(b)
   *  **ContinentAverageNeighborDegree.pdf:** The Figure 8(c)
   *  **ContinentDistanceDistribution.pdf:** The Figure 8(d)
   *  **ContinentBetweenness.pdf:** The Figure 8(e)
   *  **ContinentALLIntersectionPercentage.pdf:** The figure 9

# Additional notes
*Top5Continents.ipynb:* ipython notebook requires the following python packages:
> 1. pandas - https://pypi.org/project/pandas/
> 2. networkx - https://pypi.org/project/networkx/
> 3. tqdm - https://pypi.org/project/tqdm/
> 4. matplotlib - https://pypi.org/project/matplotlib/
> 5. tldextract - https://pypi.org/project/tldextract/
> 6. seaborn - https://pypi.org/project/seaborn/

In addition, for the logarithmic binning fortran code you will also need the fortran compiler. For windows users see: http://www.equation.com/servlet/equation.cmd?fa=fortran