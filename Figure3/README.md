# Figure 3: (a) Grouping probability as a function of the hyperbolic distance between TLD+1 nodes. (b) Future grouping probability as a function of the hyperbolic distance between TLD+1 nodes.

This folder includes the artifacts to recompute the results and reproduce figure 3 in the paper. The tool to build the "future-mergings_list.json" metadata is available under the folder "./Crunchbase_crawler/".

# Files description
1. **Grouping_probability.ipynb:** A jupyter ipython notebook that recomputes the results and recreates the Figure 3(a) in the paper.
2. **future-mergings_list.json:** A json file that holds the mapping of the TLD+1 nodes to their corresponding legal-entity *according to the crunchbase website*.
3. **legal-entities_list.json:** A json file that holds the mapping of the TLD+1 nodes to their corresponding legal-entity.
4. **Grouping_probability_future.ipynb:** A jupyter ipython notebook that recomputes the results and recreates the Figure 3(b) in the paper.
5. **README.md:** This file.

# Result files
The output of the **Grouping_probability.ipynb** ipython notebook is the following 2 files:

*  **Grouping_probability_step_3.pdf:** The figure 3(a) - *Grouping probability as a function of the hyperbolic distance between TLD+1 nodes.*
*  **../Figure4/Bins_Stats_EdgeList_TLD_step_3.json:** A json file to use as a source file to create figure 4(a). Note that the file is saved under the Figure4 folder.

The output of the **Grouping_probability_future.ipynb** ipython notebook is the following 2 files:

*  **Grouping_probability_Future_step_6.pdf:** The figure 3(b) - *Future grouping probability as a function of the hyperbolic distance between TLD+1 nodes.*
*  **../Figure4/Bins_Stats_EdgeList_TLD_FUTURE_step_6.json:** A json file to use as a source file to create figure 4(b). Note that the file is saved under the Figure4 folder.

# Additional notes
*Grouping_probability.ipynb* and *Grouping_probability_future.ipynb* requires the following python packages:
> 1. tqdm - https://pypi.org/project/tqdm/
> 2. matplotlib - https://pypi.org/project/matplotlib/
> 3. numpy - https://pypi.org/project/numpy/