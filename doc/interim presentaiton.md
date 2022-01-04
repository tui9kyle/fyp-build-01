---
marp: true
theme: default
size: 4:3
paginate: true
header: "**Differentially Private Time Series Data Release II** \n EIE4430 Honours Project &emsp; _Interim Presentation_"

style: "
:root {
    font-family: 'Source Serif Pro', 'serif' !important;
} f


h1 {
    color: #5E6A82;
    font-size: 80px !important;

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

math: katex
---

<!-- _paginate: false -->
<!-- _header: "" -->
<!-- _backgroundColor: "#eceff4"-->

EIE4430 Honours Project
Interim Report

# Differentially Private Time Series Data Release II

CHOW Lap Fung
20020215D

---

<!-- _footer: "Presentation Overview" -->

# Upcoming

-   Introduction
-   Methodology
-   Evaluation
-   Project Implementation


---

<!-- footer: "Introduction" -->

# Background & Problem Description

- Data are important during the intelligent transformation in the industrial and academic sectors
- Service providers collect user data
  - improve services, features based on statistics
- Concerns of data privacy
  - vulnerable to data breaches
- Time series data are closely related to personal data

---
### Examples of Time-series Data Consist of Personal Information 
-	IoT appliances for Smart home
-	Biometric sensor on wearables and health devices 
-	Location tracking



---
<!-- footer: "Background Knowledge" -->
# Differential Privacy
- protect the privacy of a centralized dataset with a **randomized algorithm**
- produces **perturbed** output data
- observer cannot identify a particular user's information
## Problem of Centralized Differential Privacy
- assumes the data collection party would
  - uphold the privacy preservation
  - not leak the collected data
---

# Local Differential Privacy (LDP)
- perturbs data the users' devices **locally**
- the third party only gets the perturbed data
- original data would not be transferred outside the device

---
# Time Series Data
- temporal data: a regular time interval
- indexed with a timestamp
---
# Local Differential Privacy in the Temporal Setting (TLDP)
- Perturbing data with a randomized algorithm may cause significant distortion of the values in time-series data.

---
<!-- footer: "Methodology" -->

![](./.assets/img01.png)



---
# Development Stack
| Tool             | Description             |
| ---------------- | ----------------------- |
| **Node.Js**      | runtime environment     |
| **Electron**     | application framework   |
| **React**        | building user interface |
| **Tailwind CSS** | styling                 |
| **Chart.js**     | creating charts         |

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
```js
for (var i = 0; i < data.length; i++) {
  let noise = VldpUtilities.LaplaceNoise(sensitivity, epsilon);
  dataPerturbed[i] = data[i] + noise;}
```


---
# Implementation of TLDP
- Backward Perturbation Mechanism
- Forward Perturbation Mechanism
- Threshold Mechanism
---

# Backward Perturbation Mechanism
- release a drawn value from the **previous** $k$ time timestamps

![Backward Perturbation Mechanism](./.assets/ye1-p10-ye-large.gif)

---
probabilities satisfying $\epsilon$-LDP
$$
\Pr (P_i = S_{i-j}) := p_j = 
\begin{cases}
\dfrac{e^{\epsilon/2}}{k-1+e^{\epsilon/2}}, && j=0 \\
\dfrac{1}{k-1+e^{\epsilon/2}}, && j \in \{ 1, 2, \cdots, k-1  \}
\end{cases}
$$


```js
PerturbationProbability(epsilon, k, j) {
  if (j === 0) {
  return (
    Math.pow(Math.E, epsilon / 2) / (k - 1 + Math.pow(Math.E,epsilon / 2)));}
  else return 1 / (k - 1 + Math.pow(Math.E, epsilon / 2));}
```

---

```js
BackwardPerturbationMechanism(data, k, epsilon) {
  let dataPerturbed = [];
  for (let i = 0; i < data.length; i++) {
    let tmpK = k;
    if (i < k - 1) tmpK = i + 1;
      let p = Math.random();
      let idx = 1;
      for (let j = 0; j <= tmpK; j++) {
        idx -= TldpUtilities.PerturbationProbability(epsilon, tmpK, j);
        if (idx <= p) {
          dataPerturbed[i] = data[i - j];
          break;}}}
  return { result: dataPerturbed };}
```
---
# Forward Perturbation Mechanism
- dispatch each data in the **following** $k$ timestamps
![Forward Perturbation Mechanism](./.assets/ye2-p10-ye-large.gif)
---

```js
ForwardPerturbationMechanism(data, k, epsilon) {
  let dataPerturbed = [];
  for (let i = 0; i < data.length; i++) {
    let p = Math.random();
    let idx = 0;
    for (let j = 0; j <= k; j++) {
      idx += TldpUtilities.PerturbationProbability(epsilon, k, j);
      if (idx >= p) {
        dataPerturbed[i + j] = data[i];
        break;}}}
  return { result: dataPerturbed };}
```
---
<!-- _footer : "" -->
# Threshold Mechanism
- reduce the costs of the perturbation mechanisms
- add the rule to the collision-free Forward Perturbation
```js
ThresholdMechanism(data, k, c0) {
  let dataPerturbed = [];
  for (let i = 0; i < data.length; i++) {
    // count the number of 0s in {x[i], x[i+1], ..., x[i+k-1]}
    let c = 0;
      for (let j = i; j < i + k; j++) {
        if (dataPerturbed[j] == null) c++;}
        if (c > c0) {
        // randomly select an index l from {i <= j < i+k}
        // and dataPerturbed[j] == 0
          let p = Math.random();
          let idx = Math.floor(p * k + i);
          for (let j = i; j <= idx; j++) {
            if (dataPerturbed[j] != null) idx++;}
            dataPerturbed[idx] = data[i];
            } else if (dataPerturbed[i] == null) {
              dataPerturbed[i] = data[i];
            } else {
              let p = Math.random();
              let idx = Math.floor(p * (k - 1) + (i + 1));
                for (let j = i; j <= idx; j++) {
                  if (dataPerturbed[j] != null) idx++;}
                dataPerturbed[idx] = data[i];}}
        return { result: dataPerturbed };}
```
---
# User Interface
![w:350](./.assets/2.png) ![w:350](./.assets/1.png) 

---
# Data and parameter inputs
- a text file with the format of each datum at a line
![w:500](./.assets/3.png)


---
# Data and parameter inputs
![w:500](./.assets/4.png)

---
# Chart Presentation
![](./.assets/5.png)

---
# Data List

![h:500](./.assets/6.png)


---
<!-- footer: "Evaluation" -->
# Data Sources
- Heart rate time series from MIT-BIH Database Distribution
- Datasets from UC Irvine Machine Learning Repository
---
# VLDP vs TLDP
![](./.assets/img02.png)
- Green: Backward Perturbation Mechanism
  - $\epsilon = 0.5, k = 10$
- Red: Laplace Mechanism
  -  $\epsilon = 0.5, \text{sensitivity} = 1$
---
# Privacy Budget $\epsilon$
- indicates the degree of privacy preserved 
after the perturbation is implemented
- lower value of introduces more randomization
- resulting dataset would be more different from original dataset
- better privacy preservation.
---
<!-- footer: "Project Implementation" -->
# Project Schedule
| Project Task / Milestone             |      Date       |  Status  |
| ------------------------------------ | :-------------: | :------: |
| Project Planning                     | 1 Sep - 15 Sep  | Finished |
| Research and Analysis                | 1 Sep – 28 Nov  | Finished |
| Project Proposal                     |     15 Sep      | Finished |
| Software Development                 | 29 Nov - 28 Feb |   WIP    |
| Implementation of TLDP algorithm     | 3 Jan - 28 Feb  |   WIP    |
| Interim Report                       |     28 Dec      | Finished |
| Interim Project Presentation         |      6 Jan      |
| System Evaluation                    | 1 Feb - 27 Mar  |
| Preparation of Final Project         | 28 Mar - 10 Apr |
| Final Project Report                 |     11 Apr      |
| Preparation of Final Presentation    | 12 Apr - 19 Apr |
| Final Presentation                   |     20 Apr      |
| Preparation of Project Demonstration | 21 Apr - 10 May |
| Project Demonstration                |     11 May      |
---

# Proposed Future Work
- Implementation of Threshold Mechanism
  - Threshold Mechanism with targeted $\epsilon$
  - Extended Threshold Mechanism

- Data analysis of the perturbed data
  - to observe the data utilization after implementing
TLDP

- Improvement on the User Interface
    - manipulating the LDP settings
    - enhance the graphical representation of data



---
<!-- footer: "References" -->
# References
[wip]

---
<!-- footer: "The end &emsp; Q&A" -->
# Thank you
## Questions are welcomed!
