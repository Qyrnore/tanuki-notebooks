# Tanuki/FFXIV Jupyter Notebooks and Gil-Making Modules

---

## `workshop_items.ipynb` & `workshop_items.py`

### Purpose:

* Facilitates parsing, cleaning, and consolidation of crafting material data for the Free Company Workshop system.
* Helps standardize outputs from parsed CSV files that contain part requirements, item quantities, and sourcing details.

---

### Requirements

* Python
* Jupyter Notebook
* `pip install -r requirements.txt`

---

### Usage:

1. Ensure requirements from below are set up to run the notebooks.
2. Copy the CSVs of each recipe you'd like to make in the workshop into the folder `utilities/workshop_parts` - this is remarkably easy on VS Code. 
3. Hit "Run All" for the `workshop_items.ipynb` file to run all the cells on the current Company Workshop recipes in the above folder, consolidating their quantities and presenting a text output list.
4. Take the Consolidated Crafted Items list (first cell) in the `workshop_items.ipynb` file and check over the contents, some of which you might already have, when you have a surplus of items at the start you can add those into an additional CSV with **negative values** like so:

```
Darksteel Plate,-27
Mythril Ingot,-690
Steel Ingot,-5940
Iron Ingot,-1080
```

4. (cont.) here you can type out these surplus items into any file in `utilities/workshop_parts` ending with `.csv`. Any file in the folder ending in that extension will consolidate those items together, including negative values to denote what we already have. **Ensure your surplus (negative) items do not exceed the actual amount of items needed for the project. (This could create incorrect gathered item quantities).** If you have something like ingots already (a pre-craft) that are required for something else such as joint plates, you are able to add those ingots as a negative when it exceeds the total amount of ingots alone needed for the project. This is the only exception, do not exceed the total amount of ingots needed overall.
5. Now that you have an accurate count on crafted items you'll need from this current point, you'll need to manually subtract your gathered items surplus from the gathered items you'll need.
6. After you have an accurate count on gathered items you'll need, now you must source them from employees, market boards, or grind for the items yourself. Eventually you should hold in your hands the entire consolidated crafting list and be able to craft the workshop items you placed into the `utilities/workshop_parts` folder in one single batch.

**Note: Recipe Tree**
These workshop projects can call for a lot of crafting at scale, you can use employees in-game to quick-synth craft the materials needed. Using the recipe tree, you can have an easier time transferring the items to other players in the mail or via trade.

---

*For any questions, improvements, or contributions, feel free to open an issue or submit a pull request.*
