# universalis_notebooks
Uses various data to query the FFXIV Universalis API to make gil easier.

* Just hit run all in the notebook file and scroll to the end for your results. You'll need something to edit and run jupyter notebook cells.

## timed_nodes.ipynb
This takes the unspoiled (timed) gathering nodes in Eorzea and prints them into a formatted list in CSV, then it calculates the current time in Eorzea. With the list of nodes now starting at the current time in Eorzea, we do a request to Universalis' market API in a world (such as Seraph in Dynamis) to get the marketboard data for our server.

* I have this set to Seraph for now in my use case, change this to your own in the notebook.

* There are two different cells, one with and one without rarefied items. The final CSV has no rarefied items in it.

* I currently have it set to only items up to Shadowbringers due to my current game progression, you need to set this for yourself by replacing the raw text file "unpsoiled nodes" with the appropriate tables deleted from:

https://ffxiv.consolegameswiki.com/mediawiki/index.php?title=Unspoiled_Nodes&action=edit


