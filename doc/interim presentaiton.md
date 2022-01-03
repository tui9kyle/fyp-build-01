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

header {

    right : 0 ;
    text-align: right;
    color: #67758E;
}

footer {
    color: #eceff4;
    font-size: 1.5rem;
    font-weight: bold;
}

td {
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
-   Current Process
-   Future Work

---

<!-- footer: "Introduction" -->

# Background

-   Data are important during the intelligent transformation in the industrial and academic sectors
-   Concerns of data privacy

---

# Problem Description

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

# Local Differential Privacy (LDP)


$$
\operatorname{Pr}[\mathcal{A}(v)=v^*] \le e^\epsilon \times \operatorname{Pr}[\mathcal{A}(v')=v^*]
$$



>  Math Stuffs | Description  
> --- | ---
> $\Pr$ | Perturbation
> $\mathcal{A}$ | Randomized Algorithm
> $v, v'$ | Any two input values
> $v*$ | Output value     
> $\epsilon$ | **Privacy Budget**
---

# Privacy Budget $\epsilon$

---

# Perturbation

---

# References

---
