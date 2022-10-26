# Figure 6: Distribution of interaction path lengths between legal entities.

This folder includes the artifacts to recompute the results and reproduce figure 6 in the paper.

# Files description
1. **Interaction_paths.ipynb:** A jupyter ipython notebook that recomputes the results depicted in Figure 6 of the paper.
2. **PathsList.zip:** A zip file that holds the *PathsList.json* file, a list with the raw interaction paths of the TPDs as observe within the users browser. The PathsList.json file need to be extracted and placed at the root of the current folder.  
3. **README.md:** This file.

# Result files
The output of the **Interaction_paths.ipynb.ipynb** ipython notebook is the following 1 file:

*  **Actual_Paths_Count_pdf_ALL.pdf:** The figure 6 - *Distribution of interaction path lengths between legal entities.*

# Additional notes
*Interaction_paths.ipynb* ipython notebook requires the following python packages:
> 1. pandas - https://pypi.org/project/pandas/
> 2. matplotlib - https://pypi.org/project/matplotlib/
> 3. networkx - https://pypi.org/project/networkx/
> 4. numpy - https://pypi.org/project/numpy/