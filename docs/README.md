---
layout: home
permalink: index.html

# Please update this with your repository name and title
repository-name: e17-4yp-develop-a-programming-and-compiler-toolchain-for-multi-agent-systems
title: Programming and Compiler Toolchain for Swarm Robots
---

[comment]: # "This is the standard layout for the project, but you can clean this and use your own template"

# Programming and Compiler Toolchain for Swarm Robots

#### Team

- E/17/352, Tillekeratne L.J.I., [email](mailto:e17352@eng.pdn.ac.lk)
- E/17/398, Wijerathne I.D.H.S.D., [email](mailto:e17398@eng.pdn.ac.lk)
- E/17/159, Kavinaya Y., [email](mailto:e17159@eng.pdn.ac.lk)

#### Supervisors

- Dr. Isuru Nawinne, [email](mailto:isurunawinne@eng.pdn.ac.lk)
- Dr. Mahanama Wickramasinghe, [email](mailto:mahanamaw@eng.pdn.ac.lk)
- Prof. Roshan Ragel, [email](mailto:roshanr@eng.pdn.ac.lk)

#### Table of content

1. [Abstract](#abstract)
2. [Related works](#related-works)
3. [Methodology](#methodology)
4. [Experiment Setup and Implementation](#experiment-setup-and-implementation)
5. [Results and Analysis](#results-and-analysis)
6. [Conclusion](#conclusion)
7. [Publications](#publications)
8. [Links](#links)

---

## Abstract

This research aims to create an Integrated Development Environment (IDE) for swarm robots, compatible with virtual and physical platforms. 

## Related Works

We conducted the literature review based on two main categories: swarm programming tools-based studies and swarm behavioural algorithms-based studies. 

#### Swarm Programming Tools-based Studies

* **Swarm-Bench**

* **SwarmOps**

* **PySwarm**
  
* **SwarmLib**

* **Physicomimetics**
  
* **Buzz**

* **Actor-based programming framework**

* **iRobot**

#### Swarm Behavioural Algorithms-based Studies

Some of the swarm behaviours that we encountered during our literature review are listed below.

* **Flocking**

* **Pattern formation**

* **Object searching**
  
* **Repulsion-Attraction for foraging**

* **Dynamic task allocation**

#### Problems identified

* Complexity in programming swarm robots to achieve a collective behaviour
* No support for block-based visual programming in the existing tools
* Limited to software-level simulations rather than comprehensive development libraries
* Lack of support for both physical and virtual robots
* Limited to a few pre-programmed sets of behaviours & bias towards specific algorithms

## Methodology

The following sections detail the essential steps and strategies integral to the development process.

#### System Architecture

The IDE features a React frontend, a Node.js backend in a Docker container, and integrates with PlatformIO and Maven compilers. It supports both Virtual and Physical Swarm Robot platforms.

#### High-level Algorithm Composition

The system simplifies algorithm composition for swarm behavior research, featuring a block-based visual programming interface with Google Blockly. It categorizes behaviors into atomic, pair, cluster, and global levels, enabling intuitive design and ensuring consistency between physical and virtual platforms.

#### Dynamic Code Generation and Compilation

The IDE converts block-based algorithms into C++ and Java code using Google Blockly. It supports remote cross-compilation via PlatformIO and Maven, enabling efficient deployment of binaries and jar files with version control for swarm robots.

#### Over-the-Air (OTA) Code Upload and Execution

Using WiFi and MQTT, the IDE facilitates OTA executable downloads for swarm robots, ensuring seamless updates without manual intervention while monitoring the process for accuracy.

#### Enhancement of IDE Capabilities

The IDE supports behavior programming, virtual arena visualization, and executable generation for multiple robots. It includes pre-developed algorithms and robust MQTT connectivity, empowering users to efficiently create and test swarm behaviors.

## Experiment Setup and Implementation

#### Dynamic Task Allocation Behaviour

The dynamic task allocation behavior is programmed using a block-based interface, allowing users to code from scratch, use built-in behaviors, or utilize level-based blocks. In the experiment, the third approach was used, generating Java code for execution in the virtual platform. The successful results validate the IDE's programming, compilation, and execution capabilities.

#### Object Finding Behaviour

In the experiment, virtual robots used object detection with obstacle avoidance to locate a specific-colored object, incorporating color detection, dynamic responses, and visualization. Physical robots used color and distance sensors for forward-path detection, adapting their position and visualization based on object proximity and characteristics.

## Conclusion

The study presents a framework for swarm behavior development using a unified IDE with block-based visual programming for virtual and physical platforms. Features like code generation, compilation, and OTA updates enhance usability. Experiments on task allocation and object-finding behaviors demonstrate swarm adaptability and reliability, making the IDE a valuable tool for education and research in programming complex swarm behaviors.

## Publications
[//]: # "Note: Uncomment each once you uploaded the files to the repository"

1. [Semester 7 report](documentation/FYP_Proposal_Presentation_G07.pptx)
2. [Semester 7 slides](documentation/group07.pdf)
3. [Semester 8 report](documentation/G07_FYP_End_Evaluation_Presentation.pdf)
4. [Semester 8 slides](./documentation/CO425_E17_A4_07.pdf)
<!-- 5. Author 1, Author 2 and Author 3 "Research paper title" (2021). [PDF](./). -->

## Links

[//]: # ( NOTE: EDIT THIS LINKS WITH YOUR REPO DETAILS )

- [Project Repository](https://github.com/cepdnaclk/e17-4yp-develop-a-programming-and-compiler-toolchain-for-multi-agent-systems)
- [Project Page](https://cepdnaclk.github.io/e17-4yp-develop-a-programming-and-compiler-toolchain-for-multi-agent-systems)
- [Department of Computer Engineering](http://www.ce.pdn.ac.lk/)
- [University of Peradeniya](https://eng.pdn.ac.lk/)

[//]: # "Please refer this to learn more about Markdown syntax"
[//]: # "https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet"
