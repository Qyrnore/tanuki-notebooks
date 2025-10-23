# FFXIV Data Processing Notebooks and Modules

This repository contains Jupyter notebooks and supporting JS/Python modules for processing, cleaning, and managing various datasets related to Final Fantasy XIV (FFXIV) gil-making schemes. The workflows primarily assist with company workshop gathering/crafting/management, and timed node tracking.

---

## Contents and Descriptions

### `timed_nodes.ipynb` & `timed_nodes.py`

**Purpose:**

* Provides tools to clean and process datasets of "timed nodes," which are gathering spots in FFXIV that only appear at specific times.
* Assigns unique IDs to cleaned nodes.
* Offers sorting functions to arrange nodes based on their availability relative to the current Eorzean time.

**Usage:**

* The notebook allows for execution of the data cleaning, ID assignment, and sorting processes.
* The `timed_nodes.py` module provides reusable functions that handle the core logic, enabling both notebook use and automation through scripts.

---

### `workshop_items.ipynb` & `workshop_items.py`

**Purpose:**

* Facilitates parsing, cleaning, and consolidation of crafting material data for the Free Company Workshop system (currently just Airships/Submersibles).
* Helps standardize outputs from parsed CSV files that contain part requirements, item quantities, and sourcing details.

**Usage:**

* The notebook walks through consolidating fragmented workshop item datasets.
* The `workshop_items.py` module contains helper functions for CSV processing.

---

### `workshop_projects.ipynb` & `workshop_projects.ts`

**Purpose:**

* Assists in organizing and calculating project artifacts for entire Workshop projects, such as airship or submarine construction.
* Takes the dataset from `workshop_items.ipynb` and runs various helper functions related to miscellaneous project management rather than just calculating items.

---

## Notes

* The notebooks are intended for interactive use during planning, data preparation, and troubleshooting.
* The `.py` / `.ts` modules abstract key logic to promote reusability in other scripts, automation pipelines, or production tools.
* Designed to assist project managers, Free Company leaders, crafters, and gatherers in efficiently managing FFXIV Workshop and tradecraft operations.

---

## Requirements

* Python
* Node.js
* Jupyter Notebook
* `pip install -r requirements.txt`
* `npm install`

---

## Recommended Workflow

Currently, you'll find the most use out of `workshop_items.ipynb`. Just copy the different parts from `airship_parts` & `submarine_parts` into `/utilities/workshop_parts` and hit **run all** on the respective Jupyter Notebook cells. :3

---

*For any questions, improvements, or contributions, feel free to open an issue or submit a pull request.*
