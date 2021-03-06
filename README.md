# Data Journalism and D3

Finished on 05/04/2021 by Tony Zhao


## Background

Analyzing the current trends shaping people's lives, as well as creating charts, graphs, and interactive elements to help readers understand the findings.

To find out the first story idea by sifting through information from the U.S. Census Bureau and the Behavioral Risk Factor Surveillance System.

The data set included is based on 2014 ACS 1-year estimates: [https://factfinder.census.gov/faces/nav/jsf/pages/searchresults.xhtml](https://factfinder.census.gov/faces/nav/jsf/pages/searchresults.xhtml).

## Task done:

### The website show link:

[D3 Times](https://tonyzhao668.github.io/D3_challenge/)

### The finished HTML webpage visualization:

![D3 Times](Images/d3.gif)

### step 1:

To create a scatter plot between two of the data variables such as `Healthcare vs. Poverty` or `Smokers vs. Age`.

Code this graphic in the `app.js` pull in the data from `data.csv` by using the `d3.csv` function. 

* Include state abbreviations in the circles.

* Create and situate axes and labels to the left and bottom of the chart.

- - -

### step 2 More Data, More Dynamics

To include more demographics and more risk factors. Place additional labels in the scatter plot and give them click events so that users can decide which data to display. Animate the transitions for the circles' locations as well as the range of the axes. 

I have included more demographics and more risk factors. 3 factors have been deployed for each axis.
So users can check my charts by any x, y combination as their like.

_ _ _

### step 3 Incorporate d3-tip

 Tooltips have been implemented in the D3 graphics to reveal a specific element's data when the user hovers their cursor over the element. Add tooltips to the circles and display each tooltip with the data that the user has selected. Use the `d3-tip.js` plugin developed by [Justin Palmer](https://github.com/Caged).

- - -




