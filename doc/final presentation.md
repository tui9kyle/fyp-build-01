---
marp: true
theme: default
size: 4:3
paginate: true
math: katex
header: "EIE4430 Honours Project &emsp; _Final Presentation_ \n **Differentially Private Time Series Data Release**"

style: "
:root {
    font-family: 'Source Serif Pro', 'serif' !important;
} f


h1 {
    color: #5E6A82;
    font-size: 80px !important;

}

h2 {
    color: #5E6A82;
    font-size: 1.3rem !important;

}

p {
    color: #2e3440;
}

li {
    font-size: 0.9rem !important;
}

header {

    right : 0;
    margin-right: 0.5rem;
    text-align: right;
    color: #67758E;
}

footer {
    color: #eceff4;
    font-size: 1.5rem;
    font-weight: bold;
    z-index: 0;
}

td {
    font-size: 0.8rem !important;
    font-weight: normal;
    border : 0px !important;
    text-color: #5E6A82 !important;
    vertical-align: top !important;
    padding: 0px 6px 2px 8px;

}

tr {
    background-color:#00000000 !important;
    border : 0px !important
  
}
th {
    display: none
}
section::after {
    font-weight: normal;
    text-color: #CDD7D6 !important;
}

pre span {
    font-family: 'Fira Code', 'Source Code Pro', 'monospace' !important;
    font-size: 12pt;
    z-index: 10 !important;
}
"


---

<!-- _paginate: false -->
<!-- _header: "" -->
<!-- _backgroundColor: "#eceff4"-->

EIE4430 Honours Project
Final Presentation

## Differentially Private Time Series Data Release

CHOW Lap Fung
20020215D

---

<!-- _footer: "Presentation Overview" -->

# Upcoming

-   Introduction
-   Methodology
-   Evaluation
-   Conclusion


---

<!-- footer: "Introduction" -->

# Background & Problem Description

- Data are important during the intelligent transformation in the industrial and academic sectors [1]
- Service providers collect user data 
  - improve services, features based on statistics
- Concerns of data privacy [2]
  - vulnerable to data breaches
- Time series data are closely related to personal data

---
### Examples of Time-series Data Consist of Personal Information [3]
-	IoT appliances for Smart home
-	Biometric sensor on wearables and health devices 
-	Location tracking



---
<!-- footer: "Background Knowledge" -->



# Local Differential Privacy (LDP)
- perturbs data the users' devices **locally** [2]
- the third party only gets the perturbed data
- original data would not be transferred outside the device
---

# Local Differential Privacy (LDP)


$$
\operatorname{Pr}[\mathcal{A}(v)=v^*] \le e^\epsilon \times \operatorname{Pr}[\mathcal{A}(v')=v^*]
$$



| Math Stuffs   | Description          |
| ------------- | -------------------- |
| $\Pr$         | Perturbation         |
| $\mathcal{A}$ | Randomized algorithm |
| $v, v'$       | Any two input values |
| $v*$          | Output value         |
| $\epsilon$    | Privacy Budget       |

---

# Local Differential Privacy (LDP)

![](./.assets/pic1.png)

---

# Local Differential Privacy (LDP)
![](./.assets/pic2.png)

---
# Local Differential Privacy (LDP)
![](./.assets/pic3.png)

---
<!-- footer: "Perturbation Mechanism" -->
# Perturbation Mechanism
- a randomized algorithm satisfies differential privacy
$$
\frac{\Pr[\mathcal{A}(x) = S]}{\Pr[\mathcal{A}(x') = S]}
\le e^\epsilon
$$

| Math Stuffs   | Description           |
| ------------- | --------------------- |
| $\Pr$         | Perturbation          |
| $\mathcal{A}$ | Randomized algorithm  |
| $x, x'$       | Neighboring datasets  |
| $S$           | Possible output value |
| $\epsilon$    | Privacy Budget        |
---
# Laplace Mechanism
> local differential privacy in the value setting
- add random noise from Laplace distribution



$$
\mathcal{A}(x) = x + \operatorname{Lap}(\frac{s}{\epsilon})
$$


| Math Stuffs | Description    |
| ----------- | -------------- |
| $x$         | Input value    |
| $s$         | Sensitivity    |
| $\epsilon$  | Privacy budget |

---
# Laplace Mechanism

![](./.assets/pic4.png)

---
# Local Differential Privacy in the Value Setting (VLDP)
![](./.assets/pic5.png)

---
# Time Series Data
- temporal data: a regular time interval
- indexed with a timestamp [3]

---
# Local Differential Privacy in the Temporal Setting (TLDP)
- Perturbing data with a randomized algorithm may cause significant distortion of the values in time-series data

![h:350](./.assets/pic6.png)

---

# VLDP vs TLDP
![](./.assets/img02.png)

  - Red: Laplace Mechanism `VLDP`
    -  $\epsilon = 0.5, \text{sensitivity} = 1$
  - Blue: Backward Perturbation Mechanism `TLDP`
    - $\epsilon = 0.5, k = 5$


---
<!-- footer: "Methodology" -->
# Implementation of TLDP
- **Backward Perturbation Mechanism**
- **Forward Perturbation Mechanism**
- Threshold Mechanism
---

# Backward Perturbation Mechanism
- release a drawn value from the **previous** $k$ time timestamps
- **output-driven**

![Backward Perturbation Mechanism](./.assets/ye1-p10-ye-large.gif)

---
# Probabilities satisfying $\epsilon$-LDP
$$
\Pr (P_i = S_{i-j}) := p_j = 
\begin{cases}
\dfrac{e^{\epsilon/2}}{k-1+e^{\epsilon/2}}, && j=0 \\
\dfrac{1}{k-1+e^{\epsilon/2}}, && j \in \{ 1, 2, \cdots, k-1  \}
\end{cases}
$$




---
# Forward Perturbation Mechanism
- dispatch each data in the **following** $k$ timestamps
- **input-driven**
![Forward Perturbation Mechanism](./.assets/ye2-p10-ye-large.gif)

---

### Missing costs in Backward / Forward Perturbation Mechanism
- due to repeatedly selecting from / dispatching the value to the same timestamp

---

# Threshold Mechanism
- reduced the missing cost of Backward / Forward Perturbation Mechanism
- add the rule to the collision-free Forward Perturbation Mechanism
---
# Threshold Mechanism
- windows size k and threshold
- value of threshold should be in the range from 2 to k – 1
- if the number of empty slots in the current window is greater than the threshold, the data would be dispatched randomly to an empty slot of the window
- Otherwise, if the number of empty slots is less than or equal to the threshold, and the current slot of the perturbed data sequence is empty, the data would be dispatch to this slot

---
# Extended Threshold Mechanism
- to configure the mechanism with the privacy budget ϵ instead of the threshold
-  calculate the derived privacy budget ϵ ̂ for the possible thresholds
-  optimal threshold is found
   -  Threshold Mechanism with optimal threshold
-  optimal threshold is NOT found
   -  Extended Perturbation would be applied



---
<!-- footer: "Methodology" -->

![](./.assets/img01.png)




---
# Development Stack
| Tool                  | Description                 |      |
| --------------------- | --------------------------- | ---- |
| **Node.Js**           | runtime environment         | [5]  |
| **Electron**          | application framework       | [6]  |
| **React**             | building user interface     | [7]  |
| **Tailwind CSS**      | styling                     | [8]  |
| **Chart.js**          | creating charts             | [9]  |
| **Simple Statistics** | statistics implementations | [10] |

---
# User Interface
 

![image-20220419151926899](.assets/image-20220419151926899.png)

---
# Data and parameter inputs
![](./.assets/img05.png) 
- a text file with the format of each datum at a line
![w:500](./.assets/3.png)


---
# Data and parameter inputs
![w:340](./.assets/img06.png) ![w:340](./.assets/img07.png)
![w:350](./.assets/img08.png)

---
# Chart Presentation
![](./.assets/img09.png)

---
# Data List

![](./.assets/img10.png)


---
<!-- footer: "Evaluation" -->
# Data Sources
- Heart rate time series from MIT-BIH Database Distribution
- Datasets from UC Irvine Machine Learning Repository



---
# Privacy Budget $\epsilon$
- indicates the degree of privacy preserved 
after the perturbation is implemented
- lower value of introduces more randomization
- resulting dataset would be more different from original dataset
- &darr;$\epsilon$ $=$  &uarr; privacy preservation


---
<!-- _footer: "" -->
<!-- _header: "EIE4430 Honours Project &emsp; _Interim Presentation_ \n **Differentially Private Time Series Data Release** \n These results are obtained with the heart rate dataset \n with Backward Perturbation Mechanism and **window size of 20**." -->

$\epsilon = 1$
![](./.assets/img-e-1.png)
$\epsilon = 5$
![](./.assets/img-e-5.png)
$\epsilon = 10$
![](./.assets/img-e-10.png)




---

# Window size $k$
- greater than 1 
- the output are drawn from k values
- &uarr;$k$ $=$  &uarr; privacy preservation

<br/>

$k = 1$
![](./.assets/img-k-1.png)

---
<!-- _footer: "" -->
<!-- _header: "EIE4430 Honours Project &emsp; _Interim Presentation_ \n **Differentially Private Time Series Data Release** \n These results are obtained with the heart rate dataset \n with Backward Perturbation Mechanism and **ϵ of 5**." -->



$k = 5$
![](./.assets/img-k-5.png)
$k = 15$
![](./.assets/img-k-15.png)
$k = 25$
![](./.assets/img-k-25.png)

---
# Perturbation Mechanism
- LDP in value settings are not a suitable choice
  - significant distortion of the values in time-series data
- Backward / Forward Perturbation Mechanism
  - simple implementation
- Threshold Mechanism
  - better performance as the perturbed results are more usable

---
# Choosing the Perturbation Mechanism
- Backward Perturbation Mechanism
- Forward Perturbation Mechanism
- Threshold Mechanism


<style scoped>
h1 {
    margin: 0px !important; 
}

td {
    font-size: 0.7rem !important;
    font-weight: normal;
    border : 0px !important;
    text-color: #5E6A82 !important;
    vertical-align: top !important;
    padding: 0px 2rem 2px 0.5rem;

}
footer {margin-top :0 !important}
</style>

<!-- footer: "Conclusion" -->
---


# Recommendations for further development
- implement binary search in Extended Threshold Mechanism
  - reduce time complexity of finding optimal threshold
- accept more file formats for data inputs

- analysis perturbed data with groups and data prediction
  - to evaluate the results for more use cases


----

# Conclusion
- This project has achieved its objectives
  - implementation of local differential privacy in temporal setting mechanisms
  - presentation of perturbed data of time-series datasets
  - analyzing of data perturbation
- an application that implements the local differential privacy in temporal setting mechanisms is developed
  - investigate the perturbation mechanisms
  - evaluate the perturbed data with statistical implementations

---
<!-- footer: "References" -->


<style scoped>
h1 {
    margin: 0px !important; 
}

td {
    font-size: 0.63rem !important;
    font-weight: normal;
    border : 0px !important;
    text-color: #5E6A82 !important;
    vertical-align: top !important;
    padding: 0px 0px 0px 5px;


}
footer {margin-top :0 !important}
</style>
# References
|      |                                                                                                                                                                           |
| ---- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [1]  | Y. Huo, C. Meng, R. Li and T. Jing, "An overview of privacy preserving schemes for industrial Internet of Things," China communications, vol. 17, no. 10, pp. 1-18, 2020. |
| [2]  | Q. Ye, H. Hu, N. Li, X. Meng, H. Zheng and H. Yan, Beyond Value Perturbation: Local Differential Privacy in the Temporal Setting, 2021.                                   |
| [3]  | Q. Ye and H. Hu, "Local Differential Privacy: Tools, Challenges, and Opportunities".                                                                                      |
| [4]  | "What is time series data?," InfluxData Inc, [Online]. Available: https://www.influxdata.com/what-is-time-series-data/.                                                   |
| [5]  | "Node.js," OpenJS Foundation, [Online]. Available: https://nodejs.org/en/about/. [Accessed 25 12 2021].                                                                   |
| [6]  | "Electron," OpenJS Foundation, [Online]. Available: https://www.electronjs.org/. [Accessed 31 12 2021]                                                                    |
| [7]  | "React," Meta Platforms, Inc., [Online]. Available: https://reactjs.org/. [Accessed 25 12 2021].                                                                          |
| [8]  | "Tailwind CSS," [Online]. Available: https://tailwindcss.com/. [Accessed 24 12 2021].                                                                                     |
| [9]  | "Chart.js," [Online]. Available: https://www.chartjs.org/. [Accessed 25 12 2021].                                                                                         |
| [10] | G. B. Moody, "Heart rate time series," [Online]. Available: https://ecg.mit.edu/time-series/index.html. [Accessed 25 12 2021].                                            |
| [11] | "UCI Machine Learning Repository," University of California, Irvine, [Online]. Available: https://archive.ics.uci.edu/ml/index.php. [Accessed 25 12 2021].                |

---
<!-- footer: "The end &emsp; Q&A" -->
# Thank you
## Questions are welcomed!
