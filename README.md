# Kids with grids
####  Repository for "Searching for rewards like a child means less generalization and more directed exploration"
####  Schulz, Wu, Ruggeri and Meder (Psychological Science, 2019)
####  We highlight the most important parts of each folder below

## A: Walk-throughs

<a name="walkthroughs"></a>
- [1](#walkthroughs) **Behavioral Results**: Walks you through all of the reported behavioral results, i.e. every single test reported in our paper, including effect sizes and Bayes Factors.

<a name="walkthroughs"></a>
- [2](#walkthroughs) **Bonus round results**: Walks you through the reported bonus round results, i.e. all of the tests reported in our paper concerning the 10 round including effect sizes and Bayes Factors.

<a name="walkthroughs"></a>
- [3](#walkthroughs) **Modeling results**: Walks you through the reported modeling results, i.e. all of the tests reported in our paper concerning the modeling and parameter estimate results including effect sizes and Bayes Factors.

## B: Data

<a name="data"></a>
- [1](#data)  **Full data**: This is the raw data of all participants. We use the same data set but named "kwgdata.csv" in all of our analyses. Both data sets can be found in this folder.

<a name="data"></a>
- [2](#data)  **Model data**: This is the data, both the predictive accuracy and parameter estimates, for the GP-UCB model. We use the same data set but named "rbfucb.csv" in all of our analyses. Both data sets can be found in this folder.

<a name="data"></a>
- [3](#data)  **Learning curves data**: This is the data for the simulated learning curves. We use the same data set but named "learningcurves.csv" in all of our analyses. Both data sets can be found in this folder.

## C: Code

<a name="code"></a>
- [1](#code) **Behavioral tests**: This contains all of the behavioral tests performed in our manuscript, including effect sizes and Bayes factors.
   
<a name="code"></a>
- [2](#code) **Bonus round tests**:This contains all of the bonus round tests performed in our manuscript, including effect sizes and Bayes factors.

<a name="code"></a>
- [3](#code) **Model comparison**:This contains all of the model comparisons performed in our manuscript, including effect sizes and Bayes factors.

<a name="code"></a>
- [4](#code) **Cross validation**:This contains the full cross validation code to compare all of the models based on there leave-one-round-out cross validation error. `NOTE:` You will need a cluster to run this, because it will otherwise take too long.

<a name="code"></a>
- [5](#code) **Models**:This contains the code for all the learning models and sampling strategies applied in our manuscript and SI.

## Plots

<a name="plots"></a>
- [1](#plots) **Gaussian process learning theory**: Always model your enums as uppercase string constants, e.g. `"WAITING"`, `"IN_PROGRESS"` and `"COMPLETED"`
   
<a name="functionstats--func"></a>
- [4.2](#plots) **Deriving theoretical peridctions**: Don't use `null`, `undefined`, or any value except upper case string constants in your enums. This includes initial, undecided or unknown states

## Experiment

## Paper



