# Introduction
We are building a Label system for product labels and shipping labels that will be used by employees to know content of food and where it is to be sent 

# To Use Custom Visual
1) Open Power BI Desktop, create new report.
2) Download Packaged Folder - Contains 2 Dataset's and a packaged visual file in dist folder as Product-Label-Visual-for-PowerBi.PBIX

2) Add Data Set: 
Either one of the following dataset provided:
* Excel - .csv
* SQL database -.pbix

3) Import Packaged Visual 

* In the Visualizations pane, click the ellipsis, and then select Import from File.
*Insert Image

* In the import window, click Import. 

* In the Open window, navigate to the dist folder in the Downloaded Project Directory.

* Select the Product-Label-Visual-for-PowerBi.pbiviz file, and then select Open.

* When the visual has successfully imported, click OK.

* Verify that the visual has been added to the Visualizations pane.

4) Configure Data: 
- For .csv Data Source, Map the Column Names onto the box titles and Product Labels should Render
*insert Image

- For .pbix Data Source, use the chart bellow to map the respective Database tables and get the files onto box title. 

| Tables        | SQL table/Field                                 |
| ------------- |:----------------------------------------------: |  
| Name          | Product/ new_labelname                          |
| Quantity      | Regular Labels/ new_quantity                    |  
| Timing        | Regular Labels/ createdon                       |   
| Route         | Route / new_route                               |
| Colour        | Route Colour/LABEL                              |  
| Destination   | Regular Labels/ new_locationDestination         |   
| Size          | Container Code / Label                          |

# Build Instruction
TODO:
1.	Installation process: Fork repo and build solution!
2.	Software dependencies: express, path, react, reactdom, ts-loader, typescript, webpack, wepack-cli
3.	Latest releases: N/A
4.	API references

# Build and Test
TODO: Fork repo and build solution.



