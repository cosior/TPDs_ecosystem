# Figure 4: Complimentarity (Comp.) Vs. Similarity of grouped TLD+1 nodes

This folder includes the artifacts to recompute the results and reproduce figure 4 in the paper. 

# Files description
1. **Bins_Stats_EdgeList_TLD_FUTURE_step_6.json:** A json file that holds the *FUTURE* TLD+1 grouped node pairs. Note that this file is created from the ../Figure3/Grouping_probability_future.ipynb ipython notebook.
2. **Bins_Stats_EdgeList_TLD_step_3.json:** A json file that holds the TLD+1 grouped node pairs. Note that this file is created from the ../Figure3/Grouping_probability.ipynb ipython notebook.
3. **Comp_Vs_Similar.ipynb:** A jupyter ipython notebook file that recreates the results depicted in Figure 4 (a) and (b) of the paper.
4. **Service_Type.py:** A json file that holds the service type of each TLD+1 domain.
5. **README.md:** This file.

# Result files
The output of the **Comp_Vs_Similar.ipynb** ipython notebook is the following 2 files that correspond to figure 4 in the paper:

*  **Comp_Vs_Similar_All.pdf:** The figure 4(a) - *Complimentarity (Comp.) Vs. Similarity of grouped TLD+1 nodes, (a) considering the pairs of nodes that currently belong to the same group.*
*  **Comp_Vs_Similar_Future.pdf:** The figure 4(b) - *Complimentarity (Comp.) Vs. Similarity of grouped TLD+1 nodes, considering pairs of nodes that will be grouped (merged) in the future.*


# Additional notes
*Comp_Vs_Similar.ipynb* ipython notebook requires the following python packages:
> 1. matplotlib - https://pypi.org/project/matplotlib/
> 2. numpy - https://pypi.org/project/numpy/